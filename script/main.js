const nav = document.getElementById('nav');

const burgermenu = document.getElementById('burgerMenu');

function closeNav() {
	nav.classList.add('closed');
	burgermenu.classList.add('closed');
}

burgermenu.addEventListener('click', () => {
	nav.classList.toggle('closed');
	burgermenu.classList.toggle('closed');
});

