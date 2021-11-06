
const burger = document.querySelector('.js-icon-menu');
const menu = document.querySelector('.js-menu-body');

burger.addEventListener('click', function () {
  if (burger.classList.contains('_active')) {
    burger.classList.remove('_active');
    menu.classList.remove('_active');
    unlockScroll();
  } else {
    burger.classList.add('_active');
    menu.classList.add('_active');
    lockScroll();
  }
});