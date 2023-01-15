$(function () {
	var nav = $('nav')[0];
	//const nav = document.querySelector('nav.nav');
	const navItems = Array.from(document.querySelectorAll('#navBar ul.nav li'));
	const header = document.getElementById('header');
	const burgermenu = document.getElementById('burgerMenu');
	const allSections = Array.from(document.querySelectorAll('section'));
	//const nav = document.getElementById('testingres')
	//!animting logo

	//! Navbar toggle

	function closeNav() {
		nav.classList.add('closed');
		burgermenu.classList.add('closed');
	}

	burgermenu.addEventListener('click', () => {
		nav.classList.toggle('closed');
		burgermenu.classList.toggle('closed');
	});

	navItems.forEach((item) => {
		item.addEventListener('click', () => {
			closeNav();
		})
	})

	//! Header shrink
	window.addEventListener('scroll', () => {
		if (window.scrollY >= '100' || window.innerWidth < '1000') {
			header.classList.add('shrink');
		} else {
			header.classList.remove('shrink');
		}
	})

	if (window.innerWidth < '900') {
		header.classList.add('shrink');
	}

	//!services cards

	//!inject year
	const year = document.getElementById('dynamicYear');
	year.innerHTML = new Date().getFullYear();

	//!mouse shape animation
	//!? CREATING A SCRIPT TO ADD aria-hidden="true" role="img" ETC TO IMAGES, ICONS AND TEXT AND BUTTONS

	//function hotfixScrollSpy() {
	//    var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
	//    let curScroll = getCurrentScroll();
	//    dataSpyList.forEach(function (dataSpyEl) {
	//        let offsets = bootstrap.ScrollSpy.getInstance(dataSpyEl)['_offsets'];
	//        for(let i = 0; i < offsets.length; i++){
	//            offsets[i] += curScroll;
	//        }
	//    })
	//}

	//function getCurrentScroll() {
	//    return window.pageYOffset || document.documentElement.scrollTop;
	//}

	//window.onload = function () {
	//	new bootstrap.ScrollSpy(document.body, {
	//	  target: nav
	//	});  hotfixScrollSpy();
	//	window.scrollBy(0,1);
	//  }

	//!add scroll spy to sectons
	// $('body').scrollspy({ target: $('nav#navBar') });



	//! mouse anitation
	//cursor-class="link", cursor-class="subtle", cursor-class="arrow"
	document.querySelectorAll('button.accordion-button').forEach(link => link.setAttribute('cursor-class', 'link'));
	document.querySelectorAll('#burgerMenu, a:not(.landing-btn)').forEach(link => link.setAttribute('cursor-class', 'link'));

	const cursor = document.querySelector('#cursor');
	const cursorCircle = cursor.querySelector('.cursor__circle');

	const mouse = {
		x: -100,
		y: -100
	}; // mouse pointer's coordinates
	const pos = {
		x: 0,
		y: 0
	}; // cursor's coordinates
	const speed = 0.1; // between 0 and 1

	const updateCoordinates = e => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	window.addEventListener('mousemove', updateCoordinates);


	function getAngle(diffX, diffY) {
		return Math.atan2(diffY, diffX) * 180 / Math.PI;
	}

	function getSqueeze(diffX, diffY) {
		const distance = Math.sqrt(
			Math.pow(diffX, 2) + Math.pow(diffY, 2)
		);
		const maxSqueeze = 0.15;
		const accelerator = 1500;
		return Math.min(distance / accelerator, maxSqueeze);
	}


	const updateCursor = () => {
		const diffX = Math.round(mouse.x - pos.x);
		const diffY = Math.round(mouse.y - pos.y);

		pos.x += diffX * speed;
		pos.y += diffY * speed;

		const angle = getAngle(diffX, diffY);
		const squeeze = getSqueeze(diffX, diffY);

		const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
		const rotate = 'rotate(' + angle + 'deg)';
		const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

		cursor.style.transform = translate;
		cursorCircle.style.transform = rotate + scale;
	};

	function loop() {
		updateCursor();
		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);

	const cursorModifiers = document.querySelectorAll('[cursor-class]');

	cursorModifiers.forEach(curosrModifier => {
		curosrModifier.addEventListener('mouseenter', function () {
			const className = this.getAttribute('cursor-class');
			cursor.classList.add(className);
		});

		curosrModifier.addEventListener('mouseleave', function () {
			const className = this.getAttribute('cursor-class');
			cursor.classList.remove(className);
		});
	});



		//!********************************//!INJECTING MODAL CONTENT START*************************************//


	function loadHtml(id, filePath, filename) {
		//console.log(`div id ${id}, file name ${filename}, path is: ${filePath}`);
		let xhttp;
		let outputLocation = document.getElementById(id);
		let file = filename;
		let path = filePath;

		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) { // 4 = ready state is done
					if (this.status == 200) {
						outputLocation.innerHTML = this.responseText;
					} // 200 status code means ok
					//if (this.status == 404) { outputLocation.innerHTML = '<h1>Oops, something went wrong!</h1>'; } //need to decide how best to style this. hide until then
				}
			}
			xhttp.open('GET', `pages/${path}/${filename}.html`, true);
			xhttp.send();
			return;
		}
	}
		//? Injecting services modal content
		const cardsArr = document.querySelectorAll('.card');
		cardsArr.forEach(card => {
			card.addEventListener('click', () => {
				loadHtml('servicesModal', card.dataset.folder, card.dataset.file);
			});
		});

		//? Injecting clients modal content
		const clientsArr = document.querySelectorAll('#clientLogo');
		clientsArr.forEach(client => {
			client.addEventListener('click', () => {
				loadHtml('clientsModal', client.dataset.folder, client.dataset.file);
			});
		});
	
//!********************************//!INJECTING MODAL CONTENT END*************************************//




	//!********************************//!EXPANDING MODAL CARDS START*************************************//

	// $('div.modal').each(function () {
	// 	$(this).on('click', () => {
	// 		$(function () {
	// 			$('.modal .gallery img').each(function () {
	// 				$('.modal .gallery img').each(() => {
	// 					$(this).removeClass('active');
	// 				});
	// 				// console.log('helloo', this);
	// 				$(this).on('click', () => {
	// 					$(this).toggleClass('active');
	// 				})
	// 			})
	// 		});
	// 	})
	// })

	// //? to close image on blur but not working ATM
	// $($("div.modal").click(function () {
	// 	$(".modal .gallery img").blur();
	// }));
	//!********************************//!EXPANDING MODAL CARDS END*************************************//




	//!********************************//!SVG Landing ANIMATION START*************************************//
	const svgsArr = Array.from(document.querySelectorAll('path[class^="cls-"]'));

	svgsArr.forEach((el, i, zIndex) => {
		let to = {
			x: Math.random() * (i % 2 === 0 ? -11 : 11),
			y: Math.random() * 12
		};

		let anim = el.animate(
			[{
					transform: "translate(0, 0)"
				},
				{
					transform: `translate(${to.x}rem, ${to.y}rem)`
				},
			], {
				duration: (Math.random() + 1) * 8000, // random duration (originally 2000)
				direction: "alternate",
				fill: "both",
				iterations: Infinity,
				easing: "ease-in-out"
			}
		);
	});
	//!********************************//!SVG ANIMATION END*************************************//


	//!********************************//!PURPLE BUTTON CONTENT START*************************************//

	const aboutMeBtn = document.querySelector('.aboutContainer div.dot');
	const additionalInfo = document.querySelector('.aboutContainer div.info');

	aboutMeBtn.addEventListener('click', () => {


		if (aboutMeBtn.classList.contains('active')) {
			aboutMeBtn.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
		} else {
			aboutMeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`
		}

		additionalInfo.classList.toggle('active');
		aboutMeBtn.classList.toggle('active');
	})


	//  if modal is open set body overflow Y to hidden



	//video close btn
	const showcaseVidBtn = document.querySelector('.pausePlay')
	const showcaseVideo = document.querySelector('video#showcaseVideo');

	showcaseVidBtn.addEventListener('click', () => {
		console.log('clicked')
		if (showcaseVidBtn.classList.contains('playing')) {
			showcaseVideo.pause();
			showcaseVidBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
			//console.log('paused')
			showcaseVidBtn.classList.remove('playing');
		} else {
			showcaseVidBtn.classList.add('playing');
			showcaseVideo.play();
			showcaseVidBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
			//console.log('playing')
		}
	});
	//!********************************//!PURPLE BUTTON CONTENT END*************************************//


	//!********************************//!MANUAL NAV SCROLLSPY END*************************************//


	let options = {
		root: null, //which element as viewport (wholepage as default)
		rootMargin: `0px 0px -99% 0px`, // adjusts the above root top,right, bottom, left
		threshold: .01 //percentage overlap (0 - 1)
	}

	//!callback function that's called when my target touches a space (enters / leaves),
	let observer = new IntersectionObserver(isTouching, options)
	document.querySelectorAll('section').forEach((singleSection) => {
		observer.observe(singleSection)
		//!list of all the things it plans to watch
		//console.log('watching:' + singleSection.innerHTML) 
	})

	function isTouching(entries, observer) { //array of the things its watching, the obverser
		entries.forEach((entry) => {
			//console.log(navItems)
			if (entry.isIntersecting) {
				//console.log(entry.target.id)
				entry.target.classList.add('active');

				navItems.find((navItem) => {
					//console.log(navItem.className)
					//console.log(navItem.id, entry.target.id)
					//return navItem.id === entry.target.id
					if (navItem.className === entry.target.id) {
						navItem.classList.add('active');
					} else {
						navItem.classList.remove('active');
					}
					return
				})

				//observer.unobserve(entry.target);
			} else {
				entry.target.classList.remove('active');
			}
		})
	}


	var hashFix = (function() {
        $(function() {
            $('.navbar-nav ul.nav li a').each(function() {
                var hash = $(this).prop('hash'),
                    url = $(this).attr('href');
				//console.log('nav hash')
                if (url.indexOf('#') > -1) {
                    $(this).attr('href', hash);
                }
            });
        });
    }());
	//!********************************//!MANUAL NAV SCROLLSPY END*************************************//

});