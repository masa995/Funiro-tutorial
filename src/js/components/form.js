const formSubscribe = document.querySelector('.subscribe__form');
const btnCloseSubscribe = document.querySelector('.popup__close');
const popupSubscribe = document.querySelector('.popup');

btnCloseSubscribe.addEventListener('click', (e) => {
  unlockScroll();
  popupSubscribe.classList.remove('_active');
});

popupSubscribe.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__body')) {
    unlockScroll();
    popupSubscribe.classList.remove('_active');
  }
})

new window.JustValidate('.subscribe__form', {
  rules: {
    email: {
      required: true,
      email: true
    }
  },

  submitHandler: function (formSubscribe) {
    console.log('Валидация успешна!');
    formSubscribe.reset();
    openPopup('.popup');
  },
});

function openPopup(elem) {
  const popup = document.querySelector(elem);
  popup.classList.add('_active');
  lockScroll();
}

