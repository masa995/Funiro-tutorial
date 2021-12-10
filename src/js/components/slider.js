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

if (document.querySelector('.slider-rooms__body')) {
  new Swiper('.slider-rooms__body', {
    observer: true, //Установите значение true для включения наблюдателя изменений Swiper и его элементов.
    observeParents: true, //Установите true если вам также нужно следить за изменений родительских элементов Swiper
    slidesPerView: 'auto',//Кол-во слайдовб которые видны одновременно в контейнере слайдера
    spaceBetween: 24, //Растояние между слайдом
    watchOverflow: true, //Будут скрыты кнопки навигации, если слайдов недостаточно для анимации слайдов.
    speed: 800, //Скорость слайдов
    loop: true, //Бесконечное движение слайдов
    loopAdditionalSlides: 5, //Добавление количества слайдов, которые будут клонированы после создания цикла
    loopedSlides: 5, //Если вы используете slidesPerView:'auto' режим loop : true, вы должны сказать Swiper, сколько слайдов он должен зацикливать (дублировать)
    preloadImage: false, //При включении Swiper заставит загружать все изображения
    parallax: true, //Паралакс эффект

    pagination: {
      el: '.slider-rooms__dotts',
      clickable: true, //можно кликаить по точкам
    },

    // Navigation arrows
    navigation: {
      nextEl: '.slider-rooms .slider-arrow__next',
      prevEl: '.slider-rooms .slider-arrow__prev',
    }
  })
}

if (document.querySelector('.slider-tips__body')) {
  new Swiper('.slider-tips__body', {
    observer: true, //Установите значение true для включения наблюдателя изменений Swiper и его элементов.
    observeParents: true, //Установите true если вам также нужно следить за изменений родительских элементов Swiper
    slidesPerView: 3,//Кол-во слайдовб которые видны одновременно в контейнере слайдера
    spaceBetween: 32, //Растояние между слайдом
    watchOverflow: true, //Будут скрыты кнопки навигации, если слайдов недостаточно для анимации слайдов.
    speed: 800, //Скорость слайдов
    loop: true, //Бесконечное движение слайдов

    breakpoints: {
      // >= 320 px
      320: {
        slidesPerView: 1.1,
        spaceBetween: 15
      },

      // >=768 px
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },

      // >= 992 px
      992: {
        slidesPerView: 3,
        spaceBetween: 32
      }
    },

    pagination: {
      el: '.slider-tips__dotts',
      clickable: true, //можно кликаить по точкам
    },

    // Navigation arrows
    navigation: {
      nextEl: '.slider-tips .slider-arrow__next',
      prevEl: '.slider-tips .slider-arrow__prev',
    }
  })
}