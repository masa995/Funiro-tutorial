function ibg() {
  let ibg = document.querySelectorAll('.ibg');
  ibg.forEach((el) => {
    if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
    }
  });
}

ibg();