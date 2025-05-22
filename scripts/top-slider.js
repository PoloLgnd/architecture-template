const SLIDES = document.querySelectorAll('.slide');
const DOTS = document.querySelectorAll('.swiching-pag');
const SLIDER = document.querySelector('.main-top-news');
let active_slide = 0;

let timer = setSliderInterval();
let sliderTimeout;

SLIDER.addEventListener('mouseover', () => {
	clearInterval(timer);
	clearTimeout(sliderTimeout);
});

SLIDER.addEventListener('mouseleave', () => {
	setSliderTimeout();
});

[...DOTS].forEach((pag, index) => {
	pag.addEventListener('click', function() {
		if (!pag.classList.contains('active')) {
			clearInterval(timer);
			clearTimeout(sliderTimeout);

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

function setSliderInterval() {
	return setInterval(() => {
		if (active_slide === SLIDES.length - 1) {
			active_slide = 0;
			changeSlide();
			changeDots();
		} else {
			active_slide+=1;
			changeSlide();
			changeDots();
		}

	}, 2000);
}

function setSliderTimeout() {
	sliderTimeout = setTimeout(() => {
		timer = setSliderInterval();
	}, 500);
}