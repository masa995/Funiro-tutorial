"use strict";function DynamicAdapt(e){this.type=e}DynamicAdapt.prototype.init=function(){var e=this,t=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(var r=0;r<this.nodes.length;r++){var i=this.nodes[r],n=i.dataset.da.trim().split(","),a={};a.element=i,a.parent=i.parentNode,a.destination=document.querySelector(n[0].trim()),a.breakpoint=n[1]?n[1].trim():"767",a.place=n[2]?n[2].trim():"last",a.index=this.indexInParent(a.parent,a.element),this.оbjects.push(a)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,(function(e){return"("+this.type+"-width: "+e.breakpoint+"px),"+e.breakpoint}),this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,(function(e,t,r){return Array.prototype.indexOf.call(r,e)===t}));for(var o=function(r){var i=e.mediaQueries[r],n=String.prototype.split.call(i,","),a=window.matchMedia(n[0]),o=n[1],c=Array.prototype.filter.call(e.оbjects,(function(e){return e.breakpoint===o}));a.addListener((function(){t.mediaHandler(a,c)})),e.mediaHandler(a,c)},c=0;c<this.mediaQueries.length;c++)o(c)},DynamicAdapt.prototype.mediaHandler=function(e,t){if(e.matches)for(var r=0;r<t.length;r++){var i=t[r];i.index=this.indexInParent(i.parent,i.element),this.moveTo(i.place,i.element,i.destination)}else for(var n=0;n<t.length;n++){var a=t[n];a.element.classList.contains(this.daClassname)&&this.moveBack(a.parent,a.element,a.index)}},DynamicAdapt.prototype.moveTo=function(e,t,r){t.classList.add(this.daClassname),"last"===e||e>=r.children.length?r.insertAdjacentElement("beforeend",t):"first"!==e?r.children[e].insertAdjacentElement("beforebegin",t):r.insertAdjacentElement("afterbegin",t)},DynamicAdapt.prototype.moveBack=function(e,t,r){t.classList.remove(this.daClassname),void 0!==e.children[r]?e.children[r].insertAdjacentElement("beforebegin",t):e.insertAdjacentElement("beforeend",t)},DynamicAdapt.prototype.indexInParent=function(e,t){var r=Array.prototype.slice.call(e.children);return Array.prototype.indexOf.call(r,t)},DynamicAdapt.prototype.arraySort=function(e){"min"===this.type?Array.prototype.sort.call(e,(function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?-1:"last"===e.place||"first"===t.place?1:e.place-t.place:e.breakpoint-t.breakpoint})):Array.prototype.sort.call(e,(function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?1:"last"===e.place||"first"===t.place?-1:t.place-e.place:t.breakpoint-e.breakpoint}))};var da=new DynamicAdapt("max");function ibg(){document.querySelectorAll(".ibg").forEach((function(e){e.querySelector("img")&&(e.style.backgroundImage="url("+e.querySelector("img").getAttribute("src")+")")}))}function lockScroll(){var e=window.scrollY;document.body.classList.add("disable-scroll"),document.body.dataset.position=e,document.body.style.top=-e}function unlockScroll(){var e=parseInt(document.body.dataset.position,10);document.body.style.top="auto",document.body.classList.remove("disable-scroll"),window.scroll({top:e,left:0}),document.body.removeAttribute("data-position")}da.init(),ibg();var burger=document.querySelector(".js-icon-menu"),menu=document.querySelector(".js-menu-body");function isTouchDevice(){return void 0!==window.ontouchstart}function getProducts(e){if(!e.classList.contains("_hold")){e.classList.add("_hold");fetch("json/products.json",{method:"GET"}).then((function(e){if(e.ok)return e.json()})).then((function(t){loadProducts(t),e.classList.remove("_hold"),e.remove()})).catch((function(e){console.error(e),alert("Ошибка")}))}}function loadProducts(e){var t=document.querySelector(".products__items");e.products.forEach((function(e){var r=e.id,i=e.url,n=e.image,a=e.title,o=e.text,c=e.price,s=e.priceOld,l=e.shareUrl,d=e.likeUrl,u=e.labels,p='<article data-pid="'.concat(r,'" class="products__item item-product">'),m="";if(u){var _="";u.forEach((function(e){_+='<div class="item-product__label item-product__label_'.concat(e.type,'">').concat(e.value,"</div>")})),m+='<div class="item-product__labels">',m+=_,m+="</div>"}var f='\n  \t<a href="'.concat(i,'" class="item-product__image ibg">\n  \t\t<img src="img/products/').concat(n,'" alt="').concat(a,'">\n  \t</a>\n  '),v='\n  \t<div class="item-product__content">\n  \t\t<h3 class="item-product__title">'.concat(a,'</h3>\n  \t\t<div class="item-product__text">').concat(o,"</div>\n  \t</div>\n  "),h="",y='<div class="item-product__price">Rp '.concat(c,"</div>"),b='<div class="item-product__price item-product__price_old">Rp '.concat(s,"</div>");h='<div class="item-product__prices">',h+=y,s&&(h+=b);var g="";g+='<div class="item-product__body">',g+=v,g+=h+="</div>",g+='\n  \t<div class="item-product__actions actions-product">\n  \t\t<div class="actions-product__body">\n  \t\t\t<a href="" class="actions-product__button btn btn_white">Add to cart</a>\n  \t\t\t<a href="'.concat(l,'" class="actions-product__link _icon-share">Share</a>\n  \t\t\t<a href="').concat(d,'" class="actions-product__link _icon-favorite">Like</a>\n  \t\t</div>\n  \t</div>\n  ');var L="";L+=p,L+=m,L+=f,L+=g+="</div>",L+="</article>",t.insertAdjacentHTML("beforeend",L),ibg()}))}function addToCart(e,t){if(!e.classList.contains("_hold")){e.classList.add("_hold"),e.classList.add("_fly");var r=document.querySelector(".cart-header__icon"),i=document.querySelector('[data-pid="'.concat(t,'"]')).querySelector(".item-product__image"),n=i.cloneNode(!0),a=i.offsetWidth,o=i.offsetHeight,c=i.getBoundingClientRect().top,s=i.getBoundingClientRect().left;n.setAttribute("class","_flyImage"),n.style.cssText="\n    left: ".concat(s,"px;\n    top: ").concat(c,"px;\n    width: ").concat(a,"px;\n    height: ").concat(o,"px;\n    opacity: 1;\n    transform: scale(1);\n    "),document.body.append(n);var l=r.getBoundingClientRect().left,d=r.getBoundingClientRect().top;n.style.cssText="\n     left: ".concat(l,"px;\n     top: ").concat(d,"px;\n     opacity: 0;\n     width: 0px;\n    height: 0px;\n    transform: scale(0);\n    "),n.addEventListener("transitionend",(function(){e.classList.contains("_fly")&&(n.remove(),updateCart(e,t),e.classList.remove("_fly"))}))}}function updateCart(e,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=document.querySelector(".cart-header"),n=i.querySelector(".cart-header__icon"),a=n.querySelector("span"),o=document.querySelector('[data-cart-pid = "'.concat(t,'"]')),c=document.querySelector(".cart-list");if(r){if(a?a.innerHTML=++a.textContent:n.insertAdjacentHTML("beforeend","<span>1</span>"),o){var s=o.querySelector(".cart-list__quantity span"),l=parseInt(s.textContent);s.textContent=l+1}else{var d=document.querySelector('[data-pid="'.concat(t,'"]')),u=d.querySelector(".item-product__image").innerHTML,p=d.querySelector(".item-product__title").innerHTML,m='\n      <a href="#" class="cart-list__image ibg">'.concat(u,'</a>\n      <div class="cart-list__body">\n        <a href="" class="cart-list__title">').concat(p,'</a>\n        <div class="cart-list__quantity">Quantity <span>1</span></div>\n        <a href="" class="cart-list__delete">Delete</a>\n      </div>\n      ');c.insertAdjacentHTML("beforeend","<li data-cart-pid=".concat(t,' class="cart-list__item">').concat(m,"</li>"))}ibg(),e.classList.remove("_hold")}else{var _=o.querySelector(".cart-list__quantity span");_.innerHTML=--_.innerHTML,parseInt(_.innerHTML)||o.remove();var f=--a.innerHTML;f?a.innerHTML=f:a.remove()}}burger.addEventListener("click",(function(){burger.classList.contains("_active")?(burger.classList.remove("_active"),menu.classList.remove("_active"),unlockScroll()):(burger.classList.add("_active"),menu.classList.add("_active"),lockScroll())})),lightGallery(document.getElementById("lightgallery"),{selector:".row-furniture__item",licenseKey:"0000-0000-000-0000",plugins:[lgAutoplay],speed:500}),document.querySelector(".slider-main__body")&&new Swiper(".slider-main__body",{observer:!0,observeParents:!0,slidesPerView:1,spaceBetween:32,watchOverflow:!0,speed:800,loop:!0,loopAdditionalSlides:5,preloadImage:!1,parallax:!0,pagination:{el:".controls-slider-main__dotts",clickable:!0},navigation:{nextEl:".slider-main .slider-arrow__next",prevEl:".slider-main .slider-arrow__prev"}}),document.querySelector(".slider-rooms__body")&&new Swiper(".slider-rooms__body",{observer:!0,observeParents:!0,slidesPerView:"auto",spaceBetween:24,watchOverflow:!0,speed:800,loop:!0,loopAdditionalSlides:5,loopedSlides:5,preloadImage:!1,parallax:!0,pagination:{el:".slider-rooms__dotts",clickable:!0},navigation:{nextEl:".slider-rooms .slider-arrow__next",prevEl:".slider-rooms .slider-arrow__prev"}}),document.querySelector(".slider-tips__body")&&new Swiper(".slider-tips__body",{observer:!0,observeParents:!0,slidesPerView:3,spaceBetween:32,watchOverflow:!0,speed:800,loop:!0,breakpoints:{320:{slidesPerView:1.1,spaceBetween:15},768:{slidesPerView:2,spaceBetween:20},992:{slidesPerView:3,spaceBetween:32}},pagination:{el:".slider-tips__dotts",clickable:!0},navigation:{nextEl:".slider-tips .slider-arrow__next",prevEl:".slider-tips .slider-arrow__prev"}}),window.onload=function(){document.addEventListener("click",(function(e){var t=e.target;if(window.innerWidth>768&&isTouchDevice()){t.classList.contains("menu__arrow")&&t.closest(".menu__item").classList.toggle("_hover");var r=document.querySelectorAll(".menu__item._hover");!t.closest(".menu__item")&&r.length>0&&r.forEach((function(e){e.classList.remove("_hover")})),t.classList.contains("search-form__icon")?document.querySelector(".search-form").classList.toggle("_active"):!t.closest(".search-form")&&document.querySelector(".search-form._active")&&document.querySelector(".search-form").classList.remove("_active")}if(window.innerWidth<768){if(t.closest(".js-accordion__item-menu")&&t.classList.contains("js-accordion__header-menu"))t.closest(".js-accordion__item-menu").classList.toggle("_active");else if(t.closest(".js-accordion__item-menu")&&t.classList.contains("js-accordion__btn-menu")){t.closest(".js-accordion__item-menu").classList.toggle("_active")}t.classList.contains("search-form__icon")?document.querySelector(".search-form").classList.toggle("_active"):!t.closest(".search-form")&&document.querySelector(".search-form._active")&&document.querySelector(".search-form").classList.remove("_active")}t.classList.contains("products__more")&&(e.preventDefault(),getProducts(t));if(t.classList.contains("actions-product__button")){var i=t.closest(".item-product").dataset.pid;addToCart(t,i),e.preventDefault()}if(t.classList.contains("cart-list__delete")){e.preventDefault();var n=t.closest(".cart-list__item").dataset.cartPid;updateCart(t,n,!1)}t.classList.contains("cart-header__icon")||t.closest(".cart-header__icon")?(e.preventDefault(),document.querySelector(".cart-list").children.length>0&&document.querySelector(".cart-header").classList.toggle("_active")):t.closest(".cart-header")||t.classList.contains("actions-product__button")||document.querySelector(".cart-header").classList.remove("_active")}));var e=document.querySelector(".header");new IntersectionObserver((function(t,r){t[0].isIntersecting?e.classList.remove("_scroll"):e.classList.add("_scroll")})).observe(e)};var furniture=document.querySelector(".furniture__body");if(furniture&&!isTouchDevice()){var setMouseGalleryStyle=function e(){var t=0;furnitureColumn.forEach((function(e){t+=e.offsetWidth}));var r=t-furniture.offsetWidth,i=Math.floor(coordXprocent-positionX),n=r/200*(positionX+=i*speed);furnitureItems.style.cssText="transform: translate3d(".concat(-n,"px, 0, 0)"),Math.abs(i)>0?requestAnimationFrame(e):furniture.classList.remove("_init")},furnitureItems=document.querySelector(".furniture__items"),furnitureColumn=document.querySelectorAll(".furniture__column"),speed=furniture.dataset.speed,positionX=0,coordXprocent=0;furniture.addEventListener("mousemove",(function(e){var t=furniture.offsetWidth,r=e.pageX-t/2;coordXprocent=r/t*200,furniture.classList.contains("_init")||(requestAnimationFrame(setMouseGalleryStyle),furniture.classList.add("_init"))}))}