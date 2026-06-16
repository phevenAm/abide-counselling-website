document.addEventListener('DOMContentLoaded', () => {
	const nav = document.querySelector('nav#navBar');
	const navItems = Array.from(document.querySelectorAll('#navBar ul.nav li a'));
	const header = document.getElementById('header');
	const burgermenu = document.getElementById('burgerMenu');

	const isMobileDisplay = function () {
		return window.innerWidth <= 991;
	};

	const getMobileOS = () => {
		const ua = navigator.userAgent;
		if (/android/i.test(ua)) {
			return "Android";
		} else if ((/iPad|iPhone|iPod/.test(ua)) ||
			(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
			return "iOS";
		}
		return "Other";
	};

	const os = getMobileOS();

	os !== 'iOS' && document.querySelector('section#landing').classList.add('fixed');

	function closeNav() {
		nav.classList.remove('open');
		burgermenu.classList.remove('open');
	}

	burgermenu.addEventListener('click', () => {
		nav.classList.toggle('open');
		burgermenu.classList.toggle('open');

		if (nav.classList.contains('open')) {
			header.classList.remove('pullUp');
		}
	});

	navItems.forEach((item) => {
		item.addEventListener('click', () => {
			closeNav();
		});
	});

	window.addEventListener('resize', (() => {
		if (!isMobileDisplay()) {
			closeNav();
		}
	}));

	window.addEventListener('scroll', () => {
		if (window.scrollY >= (window.innerHeight / 3)) {
			header.classList.add('shrink');
		} else {
			header.classList.remove('shrink');
		}
	});

	const year = document.getElementById('dynamicYear');
	year.innerHTML = new Date().getFullYear();

	document.querySelectorAll('button.accordion-button').forEach(link => link.setAttribute('cursor-class', 'link'));
	document.querySelectorAll('#burgerMenu, a:not(.landing-btn)').forEach(link => link.setAttribute('cursor-class', 'link'));

	const cursor = document.querySelector('#cursor');
	const cursorCircle = cursor.querySelector('.cursor__circle');

	const mouse = { x: -100, y: -100 };
	const pos = { x: 0, y: 0 };
	const speed = 0.1;

	const updateCoordinates = e => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};

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

	cursorModifiers.forEach(cursorModifier => {
		cursorModifier.addEventListener('mouseenter', function () {
			const className = this.getAttribute('cursor-class');
			cursor.classList.add(className);
		});

		cursorModifier.addEventListener('mouseleave', function () {
			const className = this.getAttribute('cursor-class');
			cursor.classList.remove(className);
		});
	});

	/* SCROLL SECTIONS ACTIVE LINK */
	const sections = Array.from(document.querySelectorAll("section[data-contentId]"));

	function scrollActive() {
		const scrollY = window.pageYOffset;

		sections.forEach((current) => {
			const sectionHeight = current.offsetHeight,
				sectionTop = current.offsetTop - 58,
				sectionId = current.getAttribute("data-contentId");

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				if (document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]")) {
					document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]").classList.add("active");
				}
			} else {
				if (document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]")) {
					document.querySelector("nav#navBar ul#nav a[href*=" + sectionId + "]").classList.remove("active");
				}
			}
		});
	}
	window.addEventListener("scroll", scrollActive);

	let oldScroll = 0;
	let mouseInteraction = false;

	header.addEventListener('mouseenter', function () {
		mouseInteraction = true;
	});
	header.addEventListener('mouseleave', function () {
		mouseInteraction = false;
	});

	window.addEventListener("scroll", () => {
		const newScroll = window.pageYOffset;

		if (oldScroll >= window.innerHeight && oldScroll - newScroll < 0) {
			if (mouseInteraction === false) {
				setTimeout(function () {
					header.classList.contains('shrink') ? header.classList.add('pullUp') : '';
				}, 1000);
			}
		} else if (oldScroll - newScroll > 0) {
			setTimeout(function () {
				header.classList.remove('pullUp');
			}, 1000);
		}
		oldScroll = newScroll;
	});

	window.addEventListener('mousemove', function (e) {
		if (e.clientY <= window.innerHeight / 12) {
			setTimeout(function () {
				header.classList.contains('shrink') ? header.classList.remove('pullUp') : '';
			}, 0);
		}
	});

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
			errorNode.setAttribute('role', 'alert');
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

	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register('./service-worker.js').then(() => {
		}).catch(err => {
			console.error('Sorry, your device does not support this application.');
			console.error(err);
		});
	}
});
