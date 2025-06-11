const MENU_BTN = document.querySelector('.btn-menu_mobile');
const MENU_MOBILE = document.querySelector('.menu-mobile');

MENU_BTN.addEventListener('click', () => {
    MENU_MOBILE.classList.toggle('hidden');
})