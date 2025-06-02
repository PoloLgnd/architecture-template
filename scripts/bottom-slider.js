(function() {
    const SLIDES = document.querySelectorAll('.buttom-slide');
	const DOTS = document.querySelectorAll('.swiching-pag1');
	const SLIDER = document.querySelectorAll('.main-buttom-news');
	const ARROW_LEFT = document.querySelector('.prev-arrow');
	const ARROW_RIGHT = document.querySelector('.next-arrow')
	let active_slide = 0;

	ARROW_LEFT.addEventListener('click', () =>{
		if (active_slide !== 0) active_slide -= 1;
		changeDots();
		changeSlide();
	})
	
	ARROW_RIGHT.addEventListener('click', () =>{
		if (active_slide !== (SLIDES.length - 1)) active_slide += 1;
		changeDots();
		changeSlide();
	})

	DOTS.forEach((pag, index) => {
		pag.addEventListener('click', function() {
			if (!pag.classList.contains('active')) {
				// clearInterval(timer);
				// clearTimeout(sliderTimeout);

				active_slide = index;
				changeSlide();
				changeDots();
				// setSliderTimeout();
			}
		});
	})

	function changeDots() {
		[...DOTS].forEach((pag, idx) => {
			idx === active_slide ? pag.classList.add('active') : pag.classList.remove('active');
		});
	}

	function changeSlide() {
		[...SLIDES].forEach((slide, idx) => {
			if (idx === active_slide) {
				if (slide.classList.contains('next')) slide.classList.remove('next');
				if (slide.classList.contains('prev')) slide.classList.remove('prev');
			} else {
				if (active_slide > idx) {
					if (slide.classList.contains('next')) slide.classList.remove('next');
					slide.classList.add('prev')
				} else {
					if (slide.classList.contains('prev')) slide.classList.remove('prev');
					slide.classList.add('next');
				}
			}

			disableArrow();

		})
	}

	function disableArrow() {
		if (active_slide === 0) {
			ARROW_LEFT.classList.add('disabled');
		} else {
			if (ARROW_LEFT.classList.contains('disabled')) ARROW_LEFT.classList.remove('disabled');
		}

		if (active_slide === (SLIDES.length - 1)) {
			ARROW_RIGHT.classList.add('disabled');	
		} else {
			if (ARROW_RIGHT.classList.contains('disabled')) ARROW_RIGHT.classList.remove('disabled');
		}
	}
})();
