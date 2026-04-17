$(function () {
	var nav = $('nav')[0];
	//const nav = document.querySelector('nav.nav');
	const navItems = Array.from(document.querySelectorAll('#navBar ul.nav li a'));
	const header = document.getElementById('header');
	const burgermenu = document.getElementById('burgerMenu');
	const allSections = Array.from(document.querySelectorAll('section'));
	const navLinks = document.querySelectorAll('#navbar ul li a');

	const isMobileDisplay = function () {
		return window.innerWidth <= '991' ? true : false; //$screen-md css variale = 992
	};

	//!********************************//!Get Mobile OS START*************************************//


	const getMobileOS = () => {
		const ua = navigator.userAgent
		if (/android/i.test(ua)) {
			return "Android"
		} else if ((/iPad|iPhone|iPod/.test(ua)) ||
			(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
			return "iOS"
		}
		return "Other"
	}

	const os = getMobileOS();

	os !== 'iOS' && document.querySelector('section#landing').classList.add('fixed')
	//!********************************//!Get Mobile OS End*************************************//

	//!animting logo

	//! Navbar toggle


	function closeNav() {
		nav.classList.remove('open');
		burgermenu.classList.remove('open');
	}

	burgermenu.addEventListener('click', () => {
		nav.classList.toggle('open');
		burgermenu.classList.toggle('open');

		if($(nav).hasClass('open')) {
			//stops mobile nav creating gap at bottom when open
			$('header').removeClass('pullup')
			//$('body').addClass('noScroll');
		} else {
			//$('body').removeClass('noScroll');
		}
	});

	navItems.forEach((item) => {
		item.addEventListener('click', () => {
			closeNav();
		})
	})

	window.addEventListener('resize', (() => {
		if(!isMobileDisplay()){
			closeNav();
		}
	}))

	//! Header shrink
	window.addEventListener('scroll', () => {
		if (window.scrollY >= (window.innerHeight / 3)) { //500
			header.classList.add('shrink');
		} else {
			header.classList.remove('shrink');
		}
	})


	//!inject year
	const year = document.getElementById('dynamicYear');
	year.innerHTML = new Date().getFullYear();

	//!mouse shape animation
	//!? CREATING A SCRIPT TO ADD aria-hidden="true" role="img" ETC TO IMAGES, ICONS AND TEXT AND BUTTONS



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
			xhttp.open('GET', `../pages/${path}/${filename}.html`, true);
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
				if (document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]")) { //!making sure its not null
					document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]").classList.add("active");
				}
				//$(`nav#navBar ul#nav a[href*=" + ${sectionId} + "]`).addClass('active')
			} else {
				if (document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]")) {
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

		if(navBar)

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

	//!********************************//!Contact form blacklist START*************************************//
	const bannedPhrases = [
		'buy a site',
		'work done',
		'design',
		'build',
		'website',
		'freelance',
		'website work',
		'web design',
		'build a website',
		'quote',
		'developer',
		'app',
		'software',
		'program',
	];

	function escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function containsBannedPhrase(value) {
		const lowerValue = value.toLowerCase();
		return bannedPhrases.some(phrase => {
			const escaped = escapeRegExp(phrase.trim().toLowerCase());
			const regex = new RegExp(`\\b${escaped}\\b`, 'u');
			return regex.test(lowerValue);
		});
	}

	const allowedEmailDomains = [
		'gmail.com',
		'outlook.com',
		'hotmail.com',
		'hotmail.co.uk',
		'yahoo.com',
		'live.com',
		'msn.com',
		'icloud.com',
		'aol.com',
		'proton.me',
		'protonmail.com',
		'mail.com'
	];

	function getEmailDomain(email) {
		const match = String(email || '').trim().toLowerCase().match(/^[^@]+@([^@]+\.[^@]+)$/);
		return match ? match[1] : '';
	}

	function isAllowedEmail(email) {
		const domain = getEmailDomain(email);
		return allowedEmailDomains.includes(domain);
	}

	function getContactFormErrorNode(form) {
		let errorNode = form.querySelector('.contact-form-error');
		if (!errorNode) {
			errorNode = document.createElement('div');
			errorNode.className = 'contact-form-error';
			form.appendChild(errorNode);
		}
		return errorNode;
	}

	function setContactFormError(form, message) {
		const errorNode = getContactFormErrorNode(form);
		errorNode.textContent = message;
		errorNode.style.display = message ? 'block' : 'none';
	}

	const contactForm = document.querySelector('form.contact-form');

	if (contactForm) {
		const emailField = contactForm.querySelector('input[name="email"]');
		const messageField = contactForm.querySelector('textarea[name="message"]');

		if (emailField) {
			emailField.addEventListener('input', () => setContactFormError(contactForm, ''));
		}

		if (messageField) {
			messageField.addEventListener('input', () => setContactFormError(contactForm, ''));
		}

		contactForm.addEventListener('submit', function (event) {
			let error = '';
			const message = messageField ? (messageField.value || '') : '';
			const email = emailField ? (emailField.value || '') : '';

			if (containsBannedPhrase(message)) {
				error = 'Your message looks like a freelance request and cannot be sent here, sorry.';
			} else if (!isAllowedEmail(email)) {
				error = 'Not open to business enquiries from custom domains, thanks.';
			}

			if (error) {
				event.preventDefault();
				event.stopPropagation();
				setContactFormError(contactForm, error);
				if (error.includes('email') && emailField) {
					emailField.focus();
				} else if (messageField) {
					messageField.focus();
				}
			}
		});
	}
	//!********************************//!Contact form blacklist END*************************************//

	//!********************************//!Isolate contact button START*************************************//
	//const isolatedContactBtn = document.querySelector('.nav-link[href="#contact"]#isolate');
	////console.log(isolatedContactBtn)

	//function repositionCTA() {
	//	if (isMobileDisplay()) {
	//		document.querySelector('ul.nav#nav li:last-child').appendChild(isolatedContactBtn);
	//	} else if (isMobileDisplay() === false) {
	//		document.querySelector('.header_inner').appendChild(isolatedContactBtn);
	//	}
	//}
	//window.addEventListener('load', repositionCTA);
	//window.addEventListener('resize', repositionCTA);
	//!********************************//!Isolate contact button END*************************************//


	//!********************************//!ServiceWorker PWA START*************************************//
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register('../../service-worker.js').then(registration => { //always put service worker.js in put along with index.html in the root
			//console.log('SW registered successfully')
			//console.log(registration)
		}).catch(err => {
			console.error('sorry, your device does not support this application');
			console.error(err);
		})
	}
	//!********************************//!ServiceWorker PWA END*************************************//


	//!********************************//!Turn off parralax on mobile START*************************************//
	if (os === 'iOS' && isMobileDisplay) {
		document.querySelector('#parralax').style.backgroundAttachment = 'initial';
		console.log('small, Ios device detected')
	}
	//!********************************//!Turn off parralax on mobile END*************************************//

});