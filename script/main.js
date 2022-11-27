

$(document).ready(function () {



	const nav = document.getElementById('nav');
	const navItems = Array.from(document.querySelectorAll('.nav ul li'));
	const header = document.getElementById('header');
	const burgermenu = document.getElementById('burgerMenu');
	const allSections = Array.from(document.querySelectorAll('section'));



	//! Navbar toggle
	function closeNav() {
		nav.classList.add('closed');
		burgermenu.classList.add('closed');
	}

	burgermenu.addEventListener('click', () => {
		nav.classList.toggle('closed');
		burgermenu.classList.toggle('closed');
	});

	navItems.forEach((link) =>{
		link.addEventListener('click', () => {
			nav.classList.add('closed');
		}
	)})


	//! Header shrink
	$(window).on('scroll', () => {
		if (window.scrollY >= '100' || window.innerWidth < '1000') {
			header.classList.add('shrink');
		} else {
			header.classList.remove('shrink');
		}
	})

	if (window.innerWidth < '900') {
		header.classList.add('shrink');
	}


	//!intersection Observer

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
					console.log(navItem.className)
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

            $('.navbar-nav li a').each(function() {
                var hash = $(this).prop('hash'),
                    url = $(this).attr('href');
				console.log('nav hash')
                if (url.indexOf('#') > -1) {
                    $(this).attr('href', hash);
                }

            });
        });
    }());

});

