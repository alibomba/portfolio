// newsletter
const newsletter_input = document.querySelector('.newsletter__input');
window.addEventListener('resize', changeNewsletterPlaceholder);
window.addEventListener('load', changeNewsletterPlaceholder);

function changeNewsletterPlaceholder() {
    if (window.innerWidth > 430) {
        newsletter_input.setAttribute('placeholder', 'Podaj adres e-mail');
    }
    else {
        newsletter_input.setAttribute('placeholder', '@');
    }
}

// specjalizacje grid
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}
const kafelkiGrida = document.querySelectorAll('.specjalizacje__grid__img');
kafelkiGrida.forEach((kafelek) => {
    kafelek.addEventListener('focusin', wlaczOpisSpecjalizacji);
    kafelek.addEventListener('focusout', wylaczOpisSpecjalizacji);
    if (!isTouchDevice()) {
        kafelek.addEventListener('mouseover', wlaczOpisSpecjalizacji);
        kafelek.addEventListener('mouseout', wylaczOpisSpecjalizacji);
    }
});

function wlaczOpisSpecjalizacji(e) {
    const text = e.target.querySelector('.specjalizacje__grid__img__text');
    text.classList.add('specjalizacje__grid__img__text--active');
}

function wylaczOpisSpecjalizacji(e) {
    const text = e.target.querySelector('.specjalizacje__grid__img__text');
    text.classList.remove('specjalizacje__grid__img__text--active');
}

// animowane napisy w hero
const hero_objs = {
    top: ['Twoi klienci', 'Twoi inwestorzy', 'Twoje rynki docelowe', 'Twoi użytkownicy', 'Lorem'],
    bottom: ['Twoja strona', 'Twoja firma', 'Twój produkt', 'Twoja treść', 'Ipsum']
};
let poprzedni_index;
let isExecuting = false;

  async function heroText() {
    if (isExecuting) {
      // Funkcja jest już w trakcie wykonywania, poczekaj i spróbuj ponownie
      setTimeout(heroText, 1000);
      return;
    }
  
    let random = Math.floor(Math.random() * hero_objs.top.length);
    const top = document.querySelector(".hero__text__top__variable");
    const bottom = document.querySelector(".hero__text__bottom__variable");
  
    isExecuting = true;
  
    if (poprzedni_index !== random) {
      const topWord = Array.from(hero_objs.top[random]);
      const botWord = Array.from(hero_objs.bottom[random]);
  
      await Promise.all([
        new Promise((resolve) =>
          topWord.forEach((element, index) => {
            setTimeout(() => {
              top.innerHTML = top.innerHTML + element;
              if (index == topWord.length - 1) {
                setTimeout(() => {
                  for (let i = index; i >= 0; i--) {
                    setTimeout(() => {
                      top.innerHTML = top.innerHTML.substring(
                        0,
                        top.innerHTML.length - 1
                      );
                      if (i == 0) {
                        resolve();
                      }
                    }, (index - i) * 150);
                  }
                }, (index + 1) * 150);
              }
            }, (index + 1) * 150);
          })
        ),
  
        new Promise((resolve) =>
          botWord.forEach((element, index) => {
            setTimeout(() => {
              bottom.innerHTML = bottom.innerHTML + element;
              if (index == botWord.length - 1) {
                setTimeout(() => {
                  for (let i = index; i >= 0; i--) {
                    setTimeout(() => {
                      bottom.innerHTML = bottom.innerHTML.substring(
                        0,
                        bottom.innerHTML.length - 1
                      );
                      if (i == 0) {
                        resolve();
                      }
                    }, (index - i) * 150);
                  }
                }, (index + 1) * 150);
              }
            }, (index + 1) * 150);
          })
        ),
      ]);
  
      poprzedni_index = random;
    }
    else{
      heroText();
    }
  
    isExecuting = false;
  
    // Wykonaj funkcję ponownie za 2 sekundy
    setTimeout(heroText, 1000);
  }
heroText();


// newsletter form
const newsletterForm = document.querySelector('.newsletter__form');
newsletterForm.addEventListener('submit', zapiszSieDoNewslettera);

function zapiszSieDoNewslettera(e){
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('.newsletter__input').value;
  const info = document.querySelector('.newsletter__info');
  let xhr = new XMLHttpRequest();
  let params = new FormData();
  params.append('email', email);
  xhr.open('POST', 'ajax/newsletter_submit.php', true);
  xhr.onload = function(){
    if(this.status === 200 && JSON.parse(this.responseText) && this.responseText !== ''){
      const response = JSON.parse(this.responseText);
      switch(response.type){
        case 'good':
          info.classList.remove('newsletter__info--bad');
          info.classList.add('newsletter__info--good');
          form.reset();
          break;
        case 'bad':
          info.classList.remove('newsletter__info--good');
          info.classList.add('newsletter__info--bad');
          break;
      }
      info.innerHTML = response.message;
    }
    else{
      info.innerHTML = 'Błąd połączenia z serwerem. Spróbuj ponownie później.';
      info.classList.remove('newsletter__info--good');
      info.classList.add('newsletter__info--bad');
    }
  }
  xhr.send(params);
}