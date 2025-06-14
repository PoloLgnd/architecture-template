const MENU_BTN = document.querySelector('.btn-menu_mobile');
const MENU_MOBILE = document.querySelector('.menu-mobile');
const BODY = document.body;
let scrollPosition = 0;

MENU_BTN.addEventListener('click', () => {
    MENU_MOBILE.classList.toggle('hidden');
    MAIN_CONTENT.classList.toggle('stop-scrolling');
});