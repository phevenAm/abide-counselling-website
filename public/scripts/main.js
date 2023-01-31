$(function () {
	var nav = $('nav')[0];
	//const nav = document.querySelector('nav.nav');
	const navItems = Array.from(document.querySelectorAll('#navBar ul.nav li a'));
	const header = document.getElementById('header');
	const burgermenu = document.getElementById('burgerMenu');
	const allSections = Array.from(document.querySelectorAll('section'));
	const navLinks = document.querySelectorAll('#navbar ul li a');

	const isMobileDisplay = function () {
		return window.innerWidth < '992' ? true : false; //$screen-md css variale = 992
	};

	//!********************************//!Get Mobile OS START*************************************//


	const getMobileOS = () => {
		const ua = navigator.userAgent
		if (/android/i.test(ua)) {
			return "Android"
		}
		else if ((/iPad|iPhone|iPod/.test(ua))
			|| (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
			return "iOS"
		}
		return "Other"
	}

	const os = getMobileOS();
	//!********************************//!Get Mobile OS End*************************************//

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
		if (window.scrollY >= (window.innerHeight / 3)) { //500
			header.classList.add('shrink');
		} else {
			header.classList.remove('shrink');
		}
	})


	//! pull header up on down scroll

	//window.addEventListener('scroll', (e) => {
	//	console.log(e)
	//	console.log(scrollY)
	//})

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



	//!********************************//!MANUAL NAV SCROLLSPY Take 2 Start*************************************//

	/* SCROLL SECTIONS ACTIVE LINK */
	const sections = Array.from(document.querySelectorAll("section[data-contentId]"));

	function scrollActive() {
		const scrollY = window.pageYOffset;

		sections.forEach((current) => {
			const sectionHeight = current.offsetHeight,
				sectionTop = current.offsetTop - 58,
				sectionId = current.getAttribute("data-contentId");
				//console.log(current);

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				if(document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]")){ //!making sure its not null
					document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]").classList.add("active");
				}	
				//$(`nav#navBar ul#nav a[href*=" + ${sectionId} + "]`).addClass('active')
			} else {
				if(document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]")){
					document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]").classList.remove("active");
				}	
				//$(`nav#navBar ul#nav a[href*=" + ${sectionId} + "]`).removeClass('active')

			}
		});
	}
	window.addEventListener("scroll", scrollActive);


	//!********************************//!MANUAL NAV SCROLLSPY Take 2 END*************************************//



	//!********************************//!Isolate nav contact Start*************************************//
	//const contactLink = document.querySelectorAll(" a.nav-link");
	//console.log(contactLink)


	//!********************************//!Isolate nav contact END*************************************//


	//!********************************//!Hide Nav on scroll Start*************************************//
	let oldScroll = 0;
	let mouseInteraction = false;

	$('header').mouseenter(function () { //detect if mouse is on the header
		mouseInteraction = true;
	})
	$('header').mouseleave(function () {
		mouseInteraction = false;
	})

	window.addEventListener("scroll", (e) => {
		newScroll = window.pageYOffset;
		//console.log('new:  ' + newScroll, "old:  " + oldScroll)

		if (oldScroll >= window.innerHeight && oldScroll - newScroll < 0) {
			if (mouseInteraction === false) {
				setTimeout(function () {
					header.classList.contains('shrink') ? header.classList.add('pullUp') : '';
				}, 1000);
			};
		} else if (oldScroll - newScroll > 0) {
			//console.log('scrolling up', count);
			setTimeout(function () {
				header.classList.remove('pullUp');
			}, 1000);
		}
		oldScroll = newScroll;
	});

	window.addEventListener('mousemove', function (e) {
		if (e.clientY <= window.innerHeight / 12) { //activates header when mouse moves to top 12th of path
			setTimeout(function () {
				header.classList.contains('shrink') ? header.classList.remove('pullUp') : '';
			}, 0);
		}
	})

	//!********************************//!Hide Nav on scroll END*************************************//


	//!********************************//!Isolate contact button START*************************************//
	const isolatedContactBtn = document.querySelector('.nav-link[href="#contact"]#isolate');
	//console.log(isolatedContactBtn)

	function repositionCTA() {
		if (isMobileDisplay()) {
			document.querySelector('ul.nav#nav li:last-child').appendChild(isolatedContactBtn);
		} else if (isMobileDisplay() === false) {
			document.querySelector('.header_inner').appendChild(isolatedContactBtn);
		}
	}
	window.addEventListener('load', repositionCTA);
	window.addEventListener('resize', repositionCTA);
	//!********************************//!Isolate contact button END*************************************//


	//!********************************//!ServiceWorker PWA START*************************************//
	//if ("serviceWorker" in navigator) {
	//	navigator.serviceWorker.register('../service-worker.js').then(registration => { //always put service worker.js in put along with index.html in the root
	//		//console.log('SW registered successfully')
	//		//console.log(registration)
	//	}).catch(err => {
	//		console.error('sorry, your device does not support this application');
	//		console.error(err);
	//	})
	//}
	//!********************************//!ServiceWorker PWA END*************************************//


	//!********************************//!Turn off parralax on mobile START*************************************//
	if (os === 'iOS' && isMobileDisplay) {
		document.querySelector('#parralax').style.backgroundAttachment = 'initial';
		console.log('small, Ios device detected')
	}
	//!********************************//!Turn off parralax on mobile END*************************************//





});