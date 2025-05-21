const UP_BTN = document.querySelector('.up_button');
// const BLOCK_TOP = document.querySelector('.mailing-section2').offsetTop;

// console.log(BLOCK_TOP)

window.addEventListener('scroll', function() {
    if (window.scrollY >= 400) {
        UP_BTN.classList.remove('hidden');
    } else {
        UP_BTN.classList.add('hidden');
    }
    // if (window.scrollY >= 2903 && window.scrollY <= 3521) {
    //     UP_BTN.classList.add('swiching-color-1');
    //     UP_BTN.classList.remove('swiching-color-2');
    // } else {
    //     UP_BTN.classList.add('swiching-color-2');
    //     UP_BTN.classList.remove('swiching-color-1');
    // }

    // window.scrollY >= 400 ? UP_BTN.classList.remove('hidden') : UP_BTN.classList.add('hidden');
})

UP_BTN.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});