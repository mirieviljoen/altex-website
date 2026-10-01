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
