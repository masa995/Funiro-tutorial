window.onload = function () {
  //весь контент загрузися и срабатывает ф-ция
  //слушаем клики по всей странице
  document.addEventListener('click', documentActions);

  function documentActions(e) {
    const targetElement = e.target; //объект на который мы нажали на всем документов

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

    //Клик на кнопку more
    if (targetElement.classList.contains('products__more')) {
      e.preventDefault();
      getProducts(targetElement);
    }

    if (targetElement.classList.contains('actions-product__button')) {
      const productId = targetElement.closest('.item-product').dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    }

    if (targetElement.classList.contains('cart-list__delete')) {
      e.preventDefault();
      const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
      updateCart(targetElement, productId, false);
    }

    if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
      e.preventDefault();
      if (document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header').classList.toggle('_active');
      }
    } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
      document.querySelector('.cart-header').classList.remove('_active');
    }
  }

  if ((window.innerWidth < 768) || (window.innerWidth > 768 && isTouchDevice())) {
    const actionElems = document.querySelectorAll('.item-product__actions');
    actionElems.forEach(el => {
      el.classList.add('_non-hover');
    });

    const actionLinkElems = document.querySelectorAll('.actions-product__link');
    actionLinkElems.forEach(el => {
      el.classList.remove('_hover');
      el.classList.add('_non-hover');
    });

    const furnitureBodyElem = document.querySelector('.furniture__body');
    furnitureBodyElem.classList.add('_non-hover');

    const rowFurnitureElems = document.querySelectorAll('.row-furniture__item')
    rowFurnitureElems.forEach(el => {
      el.classList.add('_non-hover');
    })

    const itemFurnitureElems = document.querySelectorAll('.furniture__items');
    itemFurnitureElems.forEach(el => {
      el.classList.remove('_hover');
      el.classList.add('_non-hover');
    });

  }

  if ((window.innerWidth > 768) && !isTouchDevice()) {
    const actionLinkElems = document.querySelectorAll('.actions-product__link');
    actionLinkElems.forEach(el => {
      el.classList.add('_hover');
      el.classList.remove('_non-hover');
    });

    const itemFurnitureElems = document.querySelectorAll('.furniture__items');
    itemFurnitureElems.forEach(el => {
      el.classList.add('_hover');
      el.classList.remove('_non-hover');
    });
  }

  //Header
  const headerElem = document.querySelector('.header');

  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      headerElem.classList.remove('_scroll');
    } else {
      headerElem.classList.add('_scroll');
    }
  }

  // Intersection Observer API позволяет указать функцию, которая будет вызвана всякий раз для элемента (target) при пересечении его с областью видимости документа (по умолчанию) или заданным элементом (root).

  const headerObserver = new IntersectionObserver(callback);

  headerObserver.observe(headerElem);
}

function isTouchDevice(e) {

  //   /* сначала выполняется typeof
  //     если св-во ontouchstart объекта window нет то, оно возвращает undefined
  //     если есть, то object
  //     затем идет проверка на undefined
  //   */
  return typeof window.ontouchstart !== 'undefined';

  // if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
  //   return true;
  // }
}

//Load More Products
function getProducts(button) {
  if (!button.classList.contains('_hold')) { //не допустить  повторных кликов
    button.classList.add('_hold');
    const file = 'json/products.json';
    let response = fetch(file, {
      method: 'GET'
    })
      .then(
        (response) => {
          if (response.ok) {
            let result = response.json();
            return result;
          }
        }
      )
      .then((result) => {
        loadProducts(result);
        button.classList.remove('_hold');
        button.remove();
      })
      .catch((e) => {
        console.error(e);
        alert('Ошибка');
      })
  }
}

function loadProducts(data) {
  const productsItem = document.querySelector('.products__items');

  data.products.forEach(item => {
    const productId = item.id;
    const productUrl = item.url;
    const productImage = item.image;
    const productTitle = item.title;
    const productText = item.text;
    const productPrice = item.price;
    const productOldPrice = item.priceOld;
    const productShareUrl = item.shareUrl;
    const productLikeUrl = item.likeUrl;
    const productLabels = item.labels; //массив

    let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
    let productTemplateEnd = `</article>`;

    let productTemplateLabels = '';
    if (productLabels) {
      let productTemplateLabelsStart = `<div class="item-product__labels">`;
      let productTemplateLabelsEnd = `</div>`;
      let productTemplateLabelsContent = '';

      productLabels.forEach(labelItem => {
        productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
      });

      productTemplateLabels += productTemplateLabelsStart;
      productTemplateLabels += productTemplateLabelsContent;
      productTemplateLabels += productTemplateLabelsEnd;
    }

    let productTemplateImage = `
  	<a href="${productUrl}" class="item-product__image ibg">
  		<img src="img/products/${productImage}" alt="${productTitle}">
  	</a>
  `;

    let productTemplateBodyStart = `<div class="item-product__body">`;
    let productTemplateBodyEnd = `</div>`;

    let productTemplateContent = `
  	<div class="item-product__content">
  		<h3 class="item-product__title">${productTitle}</h3>
  		<div class="item-product__text">${productText}</div>
  	</div>
  `;

    let productTemplatePrices = '';
    let productTemplatePricesStart = `<div class="item-product__prices">`;
    let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
    let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
    let productTemplatePricesEnd = `</div>`;

    productTemplatePrices = productTemplatePricesStart;
    productTemplatePrices += productTemplatePricesCurrent;
    if (productOldPrice) {
      productTemplatePrices += productTemplatePricesOld;
    }
    productTemplatePrices += productTemplatePricesEnd;

    let productTemplateActions = `
  	<div class="item-product__actions actions-product">
  		<div class="actions-product__body">
  			<a href="" class="actions-product__button btn btn_white">Add to cart</a>
  			<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
  			<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
  		</div>
  	</div>
  `;

    let productTemplateBody = '';
    productTemplateBody += productTemplateBodyStart;
    productTemplateBody += productTemplateContent;
    productTemplateBody += productTemplatePrices;
    productTemplateBody += productTemplateActions;
    productTemplateBody += productTemplateBodyEnd;

    let productTemplate = '';
    productTemplate += productTemplateStart;
    productTemplate += productTemplateLabels;
    productTemplate += productTemplateImage;
    productTemplate += productTemplateBody;
    productTemplate += productTemplateEnd;

    productsItem.insertAdjacentHTML('beforeend', productTemplate);
    ibg();
  })
}

//addToCart
function addToCart(productButton, productId) {
  if (!productButton.classList.contains('_hold')) { //не допустить  повторных кликов
    productButton.classList.add('_hold');
    productButton.classList.add('_fly'); //анимация полета

    const cart = document.querySelector('.cart-header__icon'); //иконка корзины
    const product = document.querySelector(`[data-pid="${productId}"]`); //карточка
    const productImge = product.querySelector('.item-product__image'); //картинка

    //позволяет клонировать элемент и получить его точную копию.
    //true, если дети узла должны быть клонированы или false для того, чтобы был клонирован только указанный узел.
    const productImageFly = productImge.cloneNode(true);

    const productImageFlyWidth = productImge.offsetWidth; //ширина элемента с учётом горизантальных padding и border (округляет значения)
    const productImageFlyHeight = productImge.offsetHeight; //высота элемента с учётом вертикальных padding и border (округляет значения)
    const productImageFlyTop = productImge.getBoundingClientRect().top; //координаты сверху
    const productImageFlyLeft = productImge.getBoundingClientRect().left;//координаты слева

    productImageFly.setAttribute('class', '_flyImage');
    productImageFly.style.cssText = `
    left: ${productImageFlyLeft}px;
    top: ${productImageFlyTop}px;
    width: ${productImageFlyWidth}px;
    height: ${productImageFlyHeight}px;
    opacity: 1;
    transform: scale(1);
    `;

    document.body.append(productImageFly);

    //анимация
    const cartFlyLeft = cart.getBoundingClientRect().left;
    const cartFlyTop = cart.getBoundingClientRect().top;

    productImageFly.style.cssText = `
     left: ${cartFlyLeft}px;
     top: ${cartFlyTop}px;
     opacity: 0;
     width: 0px;
    height: 0px;
    transform: scale(0);
    `;

    productImageFly.addEventListener('transitionend', function () {
      if (productButton.classList.contains('_fly')) {
        productImageFly.remove();
        updateCart(productButton, productId);
        productButton.classList.remove('_fly');
      }
    });
  }
}

function updateCart(productButton, productId, productAdd = true) {
  const cart = document.querySelector('.cart-header');
  const cartIcon = cart.querySelector('.cart-header__icon');
  const cartQuantity = cartIcon.querySelector('span');
  const cartProduct = document.querySelector(`[data-cart-pid = "${productId}"]`); //карточка товара в списке
  const cartList = document.querySelector('.cart-list');

  //Число товаров
  if (productAdd) {
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.textContent;
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
    }

    if (!cartProduct) {
      const product = document.querySelector(`[data-pid="${productId}"]`); //товар на странице
      const cartProductImage = product.querySelector('.item-product__image').innerHTML;
      const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
      const cartProductContent = `
      <a href="#" class="cart-list__image ibg">${cartProductImage}</a>
      <div class="cart-list__body">
        <a href="" class="cart-list__title">${cartProductTitle}</a>
        <div class="cart-list__quantity">Quantity <span>1</span></div>
        <a href="" class="cart-list__delete">Delete</a>
      </div>
      `

      cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid=${productId} class="cart-list__item">${cartProductContent}</li>`);
    } else {
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
      const cartProductQuantityNum = parseInt(cartProductQuantity.textContent);
      cartProductQuantity.textContent = cartProductQuantityNum + 1;
    }

    //После всех действий
    ibg();
    productButton.classList.remove('_hold');
  } else {
    const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
    cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;

    if (!parseInt(cartProductQuantity.innerHTML)) {
      cartProduct.remove();
    }

    const cartQuantityValue = --cartQuantity.innerHTML;

    if (cartQuantityValue) {
      cartQuantity.innerHTML = cartQuantityValue;
    } else {
      cartQuantity.remove();
    }
  }
}

//Furniture Gallery
const furniture = document.querySelector('.furniture__body');
if (furniture && !isTouchDevice()) {
  const furnitureItems = document.querySelector('.furniture__items');
  const furnitureColumn = document.querySelectorAll('.furniture__column');

  //Скорость анимации
  const speed = furniture.dataset.speed;

  //Объявляем переменные
  let positionX = 0;
  let coordXprocent = 0;

  function setMouseGalleryStyle() {
    let furnitureItemsWidth = 0; //ширина всего контента в том числе и скрытого
    furnitureColumn.forEach(elem => {
      furnitureItemsWidth += elem.offsetWidth //offsetWidth = content + padding +  border + scroll
    });

    const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
    const distX = Math.floor(coordXprocent - positionX); //cмещение

    positionX = positionX + (distX * speed);
    let position = furnitureDifferent / 200 * positionX;

    furnitureItems.style.cssText = `transform: translate3d(${-position}px, 0, 0)`;

    if (Math.abs(distX) > 0) {
      requestAnimationFrame(setMouseGalleryStyle);
    }
    else {
      furniture.classList.remove('_init');
    }
  }

  furniture.addEventListener("mousemove", (e) => {

    const furnitureWidth = furniture.offsetWidth; //ширина
    const coordX = e.pageX - furnitureWidth / 2;// ноль посередине

    coordXprocent = coordX / furnitureWidth * 200;//процент

    if (!furniture.classList.contains('_init')) {
      requestAnimationFrame(setMouseGalleryStyle);
      furniture.classList.add('_init');
    }

  })
}
