// header dropdowns
const dropdown_buttons = document.querySelectorAll('.header__dropdown-button');
dropdown_buttons.forEach((button)=>{
    button.addEventListener('click', headerDropdownToggle);
});

function headerDropdownToggle(e){
    const dropdown = e.target.closest('.header__dropdown-button').querySelector('.header__dropdown-content');
    const arrow = e.target.closest('.header__dropdown-button').querySelector('.header__dropdown-button__arrow');

    arrow.classList.toggle('header__arrow--active');
    dropdown.classList.toggle('header__dropdown-content--active');
}

// const hamburger = document.querySelector('.header__hamburger');

// hamburger.addEventListener('click', mobileHeaderOn);

// function mobileHeaderOn(e){
//     if(window.innerWidth<801){
//         const header_mobile = document.querySelector('.header--mobile');
//         const button = e.target;
//         header_mobile.classList.toggle('header--mobile--active');
//         button.classList.toggle('header__hamburger--active');
//     }
// }


// tooltipy ikonek pakietow
function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}
const ikonki = document.querySelectorAll('.data__circle');
ikonki.forEach((ikonka)=>{
    if(is_touch_enabled()){
        ikonka.addEventListener('click', toggleTooltip);
    }
    else{
        ikonka.addEventListener('mouseenter', toggleTooltip);
        ikonka.addEventListener('mouseleave', toggleTooltip);
    }
});

function toggleTooltip(e){
    let circle;
    if(e.target.classList.contains('data__circle')){
        circle = e.target;
    }
    else{
        circle = e.target.closest('.data__circle');
    }
    circle.classList.toggle('data__circle--tooltip-active');
}

// newsletter
const newsletter_form = document.querySelector('.footer__bottom__newsletter');
newsletter_form.addEventListener('submit', dodajEmailDoBazy);

function dodajEmailDoBazy(e){
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('.footer__input').value;
    const error = document.querySelector('.footer__error');
    if(email!==''){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('email', email);
        xhr.open('POST', 'ajax/dodaj_email_do_bazy.php', true);
        xhr.onload = function(){
            if(this.status == 200 && this.responseText!==''){
                if(this.responseText==='invalid email'){
                    error.style.color = 'red';
                    error.innerHTML = 'Podaj poprawny adres e-mail';
                }
                else if(this.responseText==='fine'){
                    error.style.color = 'limegreen';
                    error.innerHTML = 'Dodano adres do bazy';
                }
                else if(this.responseText==='istnieje'){
                    error.style.color = 'red';
                    error.innerHTML = 'Podany adres jest już w bazie';
                }
                form.reset();
            }
        }
        xhr.send(params);
    }
    else{
        error.style.color = 'red';
        error.innerHTML = 'Podaj adres e-mail';
    }
}