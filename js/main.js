"use strict";window.onload=function(){document.addEventListener("click",(function(e){var s=e.target;if(window.innerWidth>768&&void 0!==window.ontouchstart){s.classList.contains("menu__arrow")&&s.closest(".menu__item").classList.toggle("_hover");var t=document.querySelectorAll(".menu__item._hover");!s.closest(".menu__item")&&t.length>0&&t.forEach((function(e){e.classList.remove("_hover")})),s.classList.contains("search-form__icon")?document.querySelector(".search-form").classList.toggle("_active"):!s.closest(".search-form")&&document.querySelector(".search-form._active")&&document.querySelector(".search-form").classList.remove("_active")}if(window.innerWidth<768){if(s.closest(".js-accordion__item-menu")&&s.classList.contains("js-accordion__header-menu"))s.closest(".js-accordion__item-menu").classList.toggle("_active");else if(s.closest(".js-accordion__item-menu")&&s.classList.contains("js-accordion__btn-menu")){s.closest(".js-accordion__item-menu").classList.toggle("_active")}}}))};