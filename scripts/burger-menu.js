const MENU_BTN = document.querySelector('.btn-menu_mobile');
const MENU_MOBILE = document.querySelector('.menu-mobile');
const MAIN_CONTENT = document.querySelector('main');

MENU_BTN.addEventListener('click', () => {
    MENU_MOBILE.classList.toggle('hidden');
    MAIN_CONTENT.classList.toggle('hiddeni');
})