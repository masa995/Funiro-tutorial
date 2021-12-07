// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle
"use strict";

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  var _this2 = this;

  var _this = this; // массив объектов


  this.оbjects = [];
  this.daClassname = "_dynamic_adapt_"; // массив DOM-элементов

  this.nodes = document.querySelectorAll("[data-da]"); // наполнение оbjects объктами

  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    var data = node.dataset.da.trim();
    var dataArray = data.split(",");
    var оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }

  this.arraySort(this.оbjects); // массив уникальных медиа-запросов

  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  }); // навешивание слушателя на медиа-запрос
  // и вызов обработчика при первом запуске

  var _loop = function _loop(_i) {
    var media = _this2.mediaQueries[_i];
    var mediaSplit = String.prototype.split.call(media, ',');
    var matchMedia = window.matchMedia(mediaSplit[0]);
    var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

    var оbjectsFilter = Array.prototype.filter.call(_this2.оbjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });

    _this2.mediaHandler(matchMedia, оbjectsFilter);
  };

  for (var _i = 0; _i < this.mediaQueries.length; _i++) {
    _loop(_i);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (var i = 0; i < оbjects.length; i++) {
      var оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    for (var _i2 = 0; _i2 < оbjects.length; _i2++) {
      var _оbject = оbjects[_i2];

      if (_оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(_оbject.parent, _оbject.element, _оbject.index);
      }
    }
  }
}; // Функция перемещения


DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);

  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }

  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }

  destination.children[place].insertAdjacentElement('beforebegin', element);
}; // Функция возврата


DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);

  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
}; // Функция получения индекса внутри родителя


DynamicAdapt.prototype.indexInParent = function (parent, element) {
  var array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}; // Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max


DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return -1;
        }

        if (a.place === "last" || b.place === "first") {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return 1;
        }

        if (a.place === "last" || b.place === "first") {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

var da = new DynamicAdapt("max");
da.init();
"use strict";

function ibg() {
  var ibg = document.querySelectorAll('.ibg');
  ibg.forEach(function (el) {
    if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
    }
  });
}

ibg();
"use strict";

function lockScroll() {
  var pagePosition = window.scrollY; //сохраняем координаты на котором мы находились

  document.body.classList.add('disable-scroll'); //выключаем скролл

  document.body.dataset.position = pagePosition; //передаем в боди новый атребут

  document.body.style.top = -pagePosition; //убираем прыжок при применение стилей
}

function unlockScroll() {
  var pagePosition = parseInt(document.body.dataset.position, 10); //перевод в число позиции из атребота

  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({
    top: pagePosition,
    left: 0
  });
  document.body.removeAttribute('data-position');
}
"use strict";

var burger = document.querySelector('.js-icon-menu');
var menu = document.querySelector('.js-menu-body');
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
"use strict";

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
    observer: true,
    //Установите значение true для включения наблюдателя изменений Swiper и его элементов.
    observeParents: true,
    //Установите true если вам также нужно следить за изменений родительских элементов Swiper
    slidesPerView: 1,
    //Кол-во слайдовб которые видны одновременно в контейнере слайдера
    spaceBetween: 32,
    //Растояние между слайдом
    watchOverflow: true,
    //Будут скрыты кнопки навигации, если слайдов недостаточно для анимации слайдов.
    speed: 800,
    //Скорость слайдов
    loop: true,
    //Бесконечное движение слайдов
    loopAdditionalSlides: 5,
    //Добавление количества слайдов, которые будут клонированы после создания цикла
    preloadImage: false,
    //При включении Swiper заставит загружать все изображения
    parallax: true,
    //Паралакс эффект
    //Dotts
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true //можно кликаить по точкам

    },
    // Navigation arrows
    navigation: {
      nextEl: '.slider-main .slider-arrow__next',
      prevEl: '.slider-main .slider-arrow__prev'
    }
  });
}
"use strict";

window.onload = function () {
  //весь контент загрузися и срабатывает ф-ция
  document.addEventListener('click', documentActions); //слушаем клики по всей странице

  function documentActions(e) {
    var targetElement = e.target; //объект на который мы нажали на всем документов

    if (window.innerWidth > 768 && isTouchDevice()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
      }

      var hoverItemElem = document.querySelectorAll('.menu__item._hover');

      if (!targetElement.closest('.menu__item') && hoverItemElem.length > 0) {
        hoverItemElem.forEach(function (el) {
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
      if (targetElement.closest('.js-accordion__item-menu') && targetElement.classList.contains('js-accordion__header-menu')) {
        var elem = targetElement.closest('.js-accordion__item-menu');
        elem.classList.toggle('_active');
      } else if (targetElement.closest('.js-accordion__item-menu') && targetElement.classList.contains('js-accordion__btn-menu')) {
        var _elem = targetElement.closest('.js-accordion__item-menu');

        _elem.classList.toggle('_active');
      }

      if (targetElement.classList.contains('search-form__icon')) {
        document.querySelector('.search-form').classList.toggle('_active');
      } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
        document.querySelector('.search-form').classList.remove('_active');
      }
    } //Клик на кнопку more


    if (targetElement.classList.contains('products__more')) {
      e.preventDefault();
      getProducts(targetElement);
    }

    if (targetElement.classList.contains('actions-product__button')) {
      var productId = targetElement.closest('.item-product').dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    }

    if (targetElement.classList.contains('cart-list__delete')) {
      e.preventDefault();
      var _productId = targetElement.closest('.cart-list__item').dataset.cartPid;
      updateCart(targetElement, _productId, false);
    }

    if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
      e.preventDefault();

      if (document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header').classList.toggle('_active');
      }
    } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
      console.log("Qqqq");
      document.querySelector('.cart-header').classList.remove('_active');
    }
  }

  function isTouchDevice() {
    /* сначала выполняется typeof
      если св-во ontouchstart объекта window нет то, оно возвращает undefined
      если есть, то object
      затем идет проверка на undefined
    */
    return typeof window.ontouchstart !== 'undefined';
  } //Header


  var headerElem = document.querySelector('.header');

  var callback = function callback(entries, observer) {
    if (entries[0].isIntersecting) {
      headerElem.classList.remove('_scroll');
    } else {
      headerElem.classList.add('_scroll');
    }
  }; // Intersection Observer API позволяет указать функцию, которая будет вызвана всякий раз для элемента (target) при пересечении его с областью видимости документа (по умолчанию) или заданным элементом (root).


  var headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElem);
}; //Load More Products


function getProducts(button) {
  if (!button.classList.contains('_hold')) {
    //не допустить  повторных кликов
    button.classList.add('_hold');
    var file = 'json/products.json';
    var response = fetch(file, {
      method: 'GET'
    }).then(function (response) {
      if (response.ok) {
        var result = response.json();
        return result;
      }
    }).then(function (result) {
      loadProducts(result);
      button.classList.remove('_hold');
      button.remove();
    })["catch"](function (e) {
      console.error(e);
      alert('Ошибка');
    });
  }
}

function loadProducts(data) {
  var productsItem = document.querySelector('.products__items');
  data.products.forEach(function (item) {
    var productId = item.id;
    var productUrl = item.url;
    var productImage = item.image;
    var productTitle = item.title;
    var productText = item.text;
    var productPrice = item.price;
    var productOldPrice = item.priceOld;
    var productShareUrl = item.shareUrl;
    var productLikeUrl = item.likeUrl;
    var productLabels = item.labels; //массив

    var productTemplateStart = "<article data-pid=\"".concat(productId, "\" class=\"products__item item-product\">");
    var productTemplateEnd = "</article>";
    var productTemplateLabels = '';

    if (productLabels) {
      var productTemplateLabelsStart = "<div class=\"item-product__labels\">";
      var productTemplateLabelsEnd = "</div>";
      var productTemplateLabelsContent = '';
      productLabels.forEach(function (labelItem) {
        productTemplateLabelsContent += "<div class=\"item-product__label item-product__label_".concat(labelItem.type, "\">").concat(labelItem.value, "</div>");
      });
      productTemplateLabels += productTemplateLabelsStart;
      productTemplateLabels += productTemplateLabelsContent;
      productTemplateLabels += productTemplateLabelsEnd;
    }

    var productTemplateImage = "\n  \t<a href=\"".concat(productUrl, "\" class=\"item-product__image ibg\">\n  \t\t<img src=\"../img/products/").concat(productImage, "\" alt=\"").concat(productTitle, "\">\n  \t</a>\n  ");
    var productTemplateBodyStart = "<div class=\"item-product__body\">";
    var productTemplateBodyEnd = "</div>";
    var productTemplateContent = "\n  \t<div class=\"item-product__content\">\n  \t\t<h3 class=\"item-product__title\">".concat(productTitle, "</h3>\n  \t\t<div class=\"item-product__text\">").concat(productText, "</div>\n  \t</div>\n  ");
    var productTemplatePrices = '';
    var productTemplatePricesStart = "<div class=\"item-product__prices\">";
    var productTemplatePricesCurrent = "<div class=\"item-product__price\">Rp ".concat(productPrice, "</div>");
    var productTemplatePricesOld = "<div class=\"item-product__price item-product__price_old\">Rp ".concat(productOldPrice, "</div>");
    var productTemplatePricesEnd = "</div>";
    productTemplatePrices = productTemplatePricesStart;
    productTemplatePrices += productTemplatePricesCurrent;

    if (productOldPrice) {
      productTemplatePrices += productTemplatePricesOld;
    }

    productTemplatePrices += productTemplatePricesEnd;
    var productTemplateActions = "\n  \t<div class=\"item-product__actions actions-product\">\n  \t\t<div class=\"actions-product__body\">\n  \t\t\t<a href=\"\" class=\"actions-product__button btn btn_white\">Add to cart</a>\n  \t\t\t<a href=\"".concat(productShareUrl, "\" class=\"actions-product__link _icon-share\">Share</a>\n  \t\t\t<a href=\"").concat(productLikeUrl, "\" class=\"actions-product__link _icon-favorite\">Like</a>\n  \t\t</div>\n  \t</div>\n  ");
    var productTemplateBody = '';
    productTemplateBody += productTemplateBodyStart;
    productTemplateBody += productTemplateContent;
    productTemplateBody += productTemplatePrices;
    productTemplateBody += productTemplateActions;
    productTemplateBody += productTemplateBodyEnd;
    var productTemplate = '';
    productTemplate += productTemplateStart;
    productTemplate += productTemplateLabels;
    productTemplate += productTemplateImage;
    productTemplate += productTemplateBody;
    productTemplate += productTemplateEnd;
    productsItem.insertAdjacentHTML('beforeend', productTemplate);
    ibg();
  });
} //addToCart


function addToCart(productButton, productId) {
  if (!productButton.classList.contains('_hold')) {
    //не допустить  повторных кликов
    productButton.classList.add('_hold');
    productButton.classList.add('_fly'); //анимация полета

    var cart = document.querySelector('.cart-header__icon'); //иконка корзины

    var product = document.querySelector("[data-pid=\"".concat(productId, "\"]")); //карточка

    var productImge = product.querySelector('.item-product__image'); //картинка
    //позволяет клонировать элемент и получить его точную копию.
    //true, если дети узла должны быть клонированы или false для того, чтобы был клонирован только указанный узел.

    var productImageFly = productImge.cloneNode(true);
    var productImageFlyWidth = productImge.offsetWidth; //ширина элемента с учётом горизантальных padding и border (округляет значения)

    var productImageFlyHeight = productImge.offsetHeight; //высота элемента с учётом вертикальных padding и border (округляет значения)

    var productImageFlyTop = productImge.getBoundingClientRect().top; //координаты сверху

    var productImageFlyLeft = productImge.getBoundingClientRect().left; //координаты слева

    productImageFly.setAttribute('class', '_flyImage');
    productImageFly.style.cssText = "\n    left: ".concat(productImageFlyLeft, "px;\n    top: ").concat(productImageFlyTop, "px;\n    width: ").concat(productImageFlyWidth, "px;\n    height: ").concat(productImageFlyHeight, "px;\n    opacity: 1;\n    transform: scale(1);\n    ");
    document.body.append(productImageFly); //анимация

    var cartFlyLeft = cart.getBoundingClientRect().left;
    var cartFlyTop = cart.getBoundingClientRect().top;
    productImageFly.style.cssText = "\n     left: ".concat(cartFlyLeft, "px;\n     top: ").concat(cartFlyTop, "px;\n     opacity: 0;\n     width: 0px;\n    height: 0px;\n    transform: scale(0);\n    ");
    productImageFly.addEventListener('transitionend', function () {
      if (productButton.classList.contains('_fly')) {
        productImageFly.remove();
        updateCart(productButton, productId);
        productButton.classList.remove('_fly');
      }
    });
  }
}

function updateCart(productButton, productId) {
  var productAdd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var cart = document.querySelector('.cart-header');
  var cartIcon = cart.querySelector('.cart-header__icon');
  var cartQuantity = cartIcon.querySelector('span');
  var cartProduct = document.querySelector("[data-cart-pid = \"".concat(productId, "\"]")); //карточка товара в списке

  var cartList = document.querySelector('.cart-list'); //Число товаров

  if (productAdd) {
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.textContent;
    } else {
      cartIcon.insertAdjacentHTML('beforeend', "<span>1</span>");
    }

    if (!cartProduct) {
      var product = document.querySelector("[data-pid=\"".concat(productId, "\"]")); //товар на странице

      var cartProductImage = product.querySelector('.item-product__image').innerHTML;
      var cartProductTitle = product.querySelector('.item-product__title').innerHTML;
      var cartProductContent = "\n      <a href=\"#\" class=\"cart-list__image ibg\">".concat(cartProductImage, "</a>\n      <div class=\"cart-list__body\">\n        <a href=\"\" class=\"cart-list__title\">").concat(cartProductTitle, "</a>\n        <div class=\"cart-list__quantity\">Quantity <span>1</span></div>\n        <a href=\"\" class=\"cart-list__delete\">Delete</a>\n      </div>\n      ");
      cartList.insertAdjacentHTML('beforeend', "<li data-cart-pid=".concat(productId, " class=\"cart-list__item\">").concat(cartProductContent, "</li>"));
    } else {
      var cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
      var cartProductQuantityNum = parseInt(cartProductQuantity.textContent);
      cartProductQuantity.textContent = cartProductQuantityNum + 1;
    } //После всех действий


    ibg();
    productButton.classList.remove('_hold');
  } else {
    var _cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');

    _cartProductQuantity.innerHTML = --_cartProductQuantity.innerHTML;

    if (!parseInt(_cartProductQuantity.innerHTML)) {
      cartProduct.remove();
    }

    var cartQuantityValue = --cartQuantity.innerHTML;

    if (cartQuantityValue) {
      cartQuantity.innerHTML = cartQuantityValue;
    } else {
      cartQuantity.remove();
    }
  }
}
//# sourceMappingURL=main.js.map
