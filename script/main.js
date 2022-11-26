

$(document).ready(function () {

	const nav = document.getElementById('nav');
	const header = document.getElementById('header');
	const burgermenu = document.getElementById('burgerMenu');


	//! Navbar toggle
	function closeNav() {
		nav.classList.add('closed');
		burgermenu.classList.add('closed');
	}

	burgermenu.addEventListener('click', () => {
		nav.classList.toggle('closed');
		burgermenu.classList.toggle('closed');
	});

	const allSections = Array.from(document.querySelectorAll('section'));


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

	function interLoad(){
		allSections.forEach((section) => {

			observer = new IntersectionObserver((entries) => {
				console.log(entries);

				entries.forEach((entry) =>{
					if(entry.intersectionRatio > 0.1 && entries.intersectionRatio <= 1) {
						entry.target.classList.add('active');
					} else {
						entry.target.classList.remove('active');
					}
				})
			});

			allSections.forEach(section => observer.observe(section))
		});
	}

	interLoad();


});

