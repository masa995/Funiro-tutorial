window.onload = function () {//весь контент загрузися и срабатывает ф-ция
  document.addEventListener('click', documentActions);
  //слушаем клики по всей странице

  const btnMenuArrow = document.querySelectorAll('.js-menu__icon');

  footerMenuArrow();


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

  function footerMenuArrow() {
    if (btnMenuArrow) {
      btnMenuArrow.forEach((el) => {
        el.classList.remove('_icon-arrow-down');
      });

      if (window.innerWidth < 768) {
        btnMenuArrow.forEach((el) => {
          el.classList.add('_icon-arrow-down');
        });
      }
    }
  }
}
