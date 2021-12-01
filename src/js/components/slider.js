// const swiper = new Swiper('.swiper-container', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,



//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
// });

if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main__body', {
    observer: true, //Установите значение true для включения наблюдателя изменений Swiper и его элементов.
    observeParents: true, //Установите true если вам также нужно следить за изменений родительских элементов Swiper
    slidesPerView: 1,//Кол-во слайдовб которые видны одновременно в контейнере слайдера
    spaceBetween: 32, //Растояние между слайдом
    watchOverflow: true, //Будут скрыты кнопки навигации, если слайдов недостаточно для анимации слайдов.
    speed: 800, //Скорость слайдов
    loop: true, //Бесконечное движение слайдов
    loopAdditionalSlides: 5, //Добавление количества слайдов, которые будут клонированы после создания цикла
    preloadImage: false, //При включении Swiper заставит загружать все изображения
    parallax: true, //Паралакс эффект
    //Dotts
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true, //можно кликаить по точкам
    },

    // Navigation arrows
    navigation: {
      nextEl: '.slider-main .slider-arrow__next',
      prevEl: '.slider-main .slider-arrow__prev',
    }
  });
}