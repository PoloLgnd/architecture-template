const SLIDES = document.querySelectorAll('.buttom-slide');
const DOTS = document.querySelectorAll('.swiching-pags1');
const SLIDER = document.querySelectorAll('.main-buttom-news');



[...DOTS].forEach((pag, index) => {
	pag.addEventListener('click', function() {
		if (!pag.classList.contains('active')) {
			// clearInterval(timer);
			// clearTimeout(sliderTimeout);

			active_slide = index;
			changeSlide();
			changeDots();
			setSliderTimeout();
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
	})
}