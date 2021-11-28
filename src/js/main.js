window.onload = function () {//весь контент загрузися и срабатывает ф-ция
  // window.addEventListener('load resize', function () {
  document.addEventListener('click', documentActions);
  //слушаем клики по всей странице

  function documentActions(e) {
    const targetElement = e.target; //обеект на который мы нажали на всем документов

    if (window.innerWidth > 768 && isTouchDevice()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
      }

      let hoverItemElem = document.querySelectorAll('.menu__item._hover');

      if (!targetElement.closest('.menu__item') && hoverItemElem.length > 0) {
        hoverItemElem.forEach((el) => {
          el.classList.remove('_hover');
        });
      }

      if (targetElement.classList.contains('search-form__icon')) {
        document.querySelector('.search-form').classList.toggle('_active');
      } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
        document.querySelector('.search-form').classList.remove('_active');
      }
    }

    if (window.innerWidth < 768) {
      if (targetElement.closest('.js-accordion__item-menu') && (targetElement.classList.contains('js-accordion__header-menu'))) {
        let elem = targetElement.closest('.js-accordion__item-menu');
        elem.classList.toggle('_active');
      } else if (targetElement.closest('.js-accordion__item-menu') && targetElement.classList.contains('js-accordion__btn-menu')) {
        let elem = targetElement.closest('.js-accordion__item-menu');
        elem.classList.toggle('_active');
      }

      if (targetElement.classList.contains('search-form__icon')) {
        document.querySelector('.search-form').classList.toggle('_active');
      } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
        document.querySelector('.search-form').classList.remove('_active');
      }
    }
  }

  function isTouchDevice() {
    /* сначала выполняется typeof
      если св-во ontouchstart объекта window нет то, оно возвращает undefined
      если есть, то object
      затем идет проверка на undefined
    */

    return typeof window.ontouchstart !== 'undefined';
  }
}
