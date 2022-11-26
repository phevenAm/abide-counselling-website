const nav = document.getElementById('nav');
const header = document.getElementById('header');

const burgermenu = document.getElementById('burgerMenu');

function closeNav() {
	nav.classList.add('closed');
	burgermenu.classList.add('closed');
}

burgermenu.addEventListener('click', () => {
	nav.classList.toggle('closed');
	burgermenu.classList.toggle('closed');
});

const allSections = Array.from(document.querySelectorAll('section'));


window.addEventListener('scroll', (e) => {
	e.preventDefault();
	console.log(`Scroll position is currently: ${scrollY}. Documents fix height is ${document.body.offsetHeight}`);
	let scroll = scrollY;

	//console.log(scroll + 'is the scroll')

	//console.log(allSections);

	allSections.forEach((section) => {
		//if(scrollY >=  - section.offsetTop && scrollY <= (document.body.offsetHeight - (section.offsetTop + window.innerHeight))) {
		//	console.log(scrollY, section.offsetTop, document.body.offsetHeight);
		//	allSections.forEach(section =>  section.classList.remove('active'));
		//	section.classList.add('active');
		//}

		let sectionHeight = section.clientHeight;

		//!test 2
		if(scrollY >= section.offsetTop && section.offsetTop <= (document.body.offsetHeight - scrollY)) {
			//console.log(scrollY, section.offsetTop, document.body.offsetHeight);
			allSections.forEach(section =>  section.classList.remove('active'));
			section.classList.add('active');
		}

		//! test 3
		 
			//console.log(scrollY, section.offsetTop, document.body.offsetHeight);
			//allSections.forEach(section =>  {
			//	section.classList.remove('active')
			//	if(scrollY >= (section.offsetTop + section.offsetHeight) && scrollY <= (scrollY + (section.offsetHeight))) {
			//		section.classList.add('active');
			//	}
			//});
		
	});
});



window.addEventListener('scroll', () => {
	console.log('resize')
	if(window.scrollY >= '100' || window.innerWidth < '1000') {
		header.classList.add('shrink');
	} else {
		header.classList.remove('shrink');
	}
})

if(window.innerWidth < '900') {
	header.classList.add('shrink');
}