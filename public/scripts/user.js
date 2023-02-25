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


	//! pull header up on down scroll

	//window.addEventListener('scroll', (e) => {
	//	console.log(e)
	//	console.log(scrollY)
	//})

	//!services cards

	//!inject year
	const year = document.getElementById('dynamicYear');
	year.innerHTML = new Date().getFullYear();
	


	const calendar = $('#calendar iframe');
	const target = calendar
	////const link = `<link rel="stylesheet" type="text/css" href="/../css/user.min.css"/>`
	//const link = `<style> div#root{background: red !important;}</style>`
	//console.log(target);
	
	//$(link).appendTo(target);
	console.log(target);




});