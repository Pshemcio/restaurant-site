window.addEventListener('DOMContentLoaded', () => {
    mainNav.addEventListener('click', handleBurgerMenu)
});

const mainNav = document.getElementById('main-nav');
const burgerBtn = mainNav.querySelector('.burger-btn');

const handleBurgerMenu = e => {
    if (!mainNav.classList.contains('menu-active') && !e.target.classList.contains('burger-btn')) {
        return;
    };

    mainNav.classList.toggle('menu-active');
};