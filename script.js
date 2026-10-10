const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
if (menuToggle && mainNav) {
	const productsMenu = mainNav.querySelector('.nav-products');
	const productsToggle = productsMenu?.querySelector('.nav-products-toggle');
	const closeProductsMenu = () => {
		productsMenu?.classList.remove('is-open');
		productsToggle?.setAttribute('aria-expanded', 'false');
	};
	const closeMenu = () => {
		mainNav.classList.remove('menu-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open menu');
		closeProductsMenu();
	};
	productsToggle?.addEventListener('click', () => {
		const open = productsToggle.getAttribute('aria-expanded') !== 'true';
		productsMenu.classList.toggle('is-open', open);
		productsToggle.setAttribute('aria-expanded', String(open));
		productsToggle.setAttribute('aria-label', open ? 'Hide innovation products' : 'Show innovation products');
	});
	menuToggle.addEventListener('click', () => {
		const open = mainNav.classList.toggle('menu-open');
		menuToggle.setAttribute('aria-expanded', String(open));
		menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
	});
	document.addEventListener('click', (event) => {
		if (!mainNav.contains(event.target)) closeMenu();
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && mainNav.classList.contains('menu-open')) {
			closeMenu();
			menuToggle.focus();
		} else if (event.key === 'Escape' && productsMenu?.classList.contains('is-open')) {
			closeProductsMenu();
			productsToggle.focus();
		}
	});
	mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
	window.matchMedia('(max-width: 768px)').addEventListener('change', closeMenu);
}

document.querySelectorAll('[data-slider]').forEach((slider) => {
	const slides = Array.from(slider.querySelectorAll('.slider-slide'));
	const thumbs = Array.from(slider.querySelectorAll('.slider-thumb'));
	let activeIndex = 0;

	const showSlide = (index) => {
		activeIndex = (index + slides.length) % slides.length;

		slides.forEach((slide, slideIndex) => {
			slide.classList.toggle('is-active', slideIndex === activeIndex);
		});

		thumbs.forEach((thumb, thumbIndex) => {
			const isActive = thumbIndex === activeIndex;
			thumb.classList.toggle('is-active', isActive);
			thumb.setAttribute('aria-selected', String(isActive));
		});
	};

	thumbs.forEach((thumb, thumbIndex) => {
		thumb.addEventListener('click', () => showSlide(thumbIndex));
	});
});

// Handle size picker buttons to toggle blocks
document.querySelectorAll('.size-option').forEach((button) => {
	button.addEventListener('click', (e) => {
		const selectedSize = button.getAttribute('data-size');
		
		// Update active button state
		document.querySelectorAll('.size-option').forEach((btn) => {
			btn.classList.remove('is-active');
		});
		button.classList.add('is-active');
		
		// Toggle product blocks
		document.querySelectorAll('.product-block').forEach((block) => {
			const blockSize = block.getAttribute('data-size');
			if (blockSize === selectedSize) {
				block.classList.add('active');
			} else {
				block.classList.remove('active');
			}
		});
	});
});
