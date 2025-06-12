window.addEventListener('DOMContentLoaded', () => {
    const SCREEN_WIDTH = window.innerWidth;
    const TARGET_WIDTH = 768;

    if (SCREEN_WIDTH <= TARGET_WIDTH) {
        const MENU_DESCTOP = document.querySelector('.main-nav')

        MENU_DESCTOP.classList.add('hidden');
    }
});
