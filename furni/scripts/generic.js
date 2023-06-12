// header dropdowns
const header_dropdown_buttons = document.querySelectorAll('.header__dropdown-button');
header_dropdown_buttons.forEach((button)=>{
    button.addEventListener('click', wlaczHeaderDropdown);
});

function wlaczHeaderDropdown(e){
    let target;
    if(e.target.classList.contains('header__nav-link')){
        target = e.target;
    }
    else{
        target = e.target.closest('.header__nav-link');
    }
    const rest = document.querySelectorAll('.header__dropdown--active');
    rest.forEach((dropdown)=>{
        dropdown.classList.remove('header__dropdown--active');
    })
    target.nextElementSibling.classList.toggle('header__dropdown--active')
}

document.querySelector('html').addEventListener('click', odklikniecieDropdowna);

function odklikniecieDropdowna(e){
    if(!e.target.classList.contains('header__dropdown')&&!e.target.classList.contains('header__nav-link')){
        const dropdowns = document.querySelectorAll('.header__dropdown');
        dropdowns.forEach((dropdown)=>{
            dropdown.classList.remove('header__dropdown--active');
        })
    }
}




// dodaj do koszyka
const popup = document.querySelector('.popup');
function dodajDoKoszyka(e,id_produktu){
    const button = e.target;
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_produktu', id_produktu);
    xhr.open('POST', 'ajax/add_to_cart.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''){
            let tresc_popupa;
            if(this.responseText==='nie zalogowano'){
                tresc_popupa = 'Musisz być zalogowany';
            }
            else if(this.responseText==='dodano'){
                tresc_popupa = '<a href="koszyk">Dodano produkt do koszyka</a>';
                button.setAttribute('src', 'img/icons/delete-from-cart-icon.png');
            }
            else if(this.responseText==='usunieto'){
                tresc_popupa = '<a href="koszyk">Usunięto produkt z koszyka</a>';
                button.setAttribute('src', 'img/icons/add-to-cart-icon.png');
            }
            else{
                tresc_popupa = 'Wystąpił niezidentyfikowany błąd';
            }
            popup.innerHTML = tresc_popupa;
            popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
            popup.classList.add('popup--active');
            setTimeout(()=>{
                popup.classList.remove('popup--active');
            },3000);
        }
    }
    xhr.send(params);
}


// dodaj do ulubionych
function dodajDoUlubionych(e,id_produktu){
    const button = e.target;
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_produktu', id_produktu);
    xhr.open('POST', 'ajax/add_to_favourite.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''){
            let tresc_popupa;
            if(this.responseText==='nie zalogowano'){
                tresc_popupa = 'Musisz być zalogowany';
            }
            else if(this.responseText==='dodano'){
                tresc_popupa = '<a href="ulubione">Dodano produkt do ulubionych</a>';
                button.setAttribute('src', 'img/icons/filled-heart-icon.png');
            }
            else if(this.responseText==='usunieto'){
                tresc_popupa = '<a href="ulubione">Usunięto produkt z ulubionych</a>';
                button.setAttribute('src', 'img/icons/heart-icon.png');
            }
            else{
                tresc_popupa = 'Wystąpił niezidentyfikowany błąd';
            }
            popup.innerHTML = tresc_popupa;
            popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
            popup.classList.add('popup--active');
            setTimeout(()=>{
                popup.classList.remove('popup--active');
            },3000);
        }
    }
    xhr.send(params);
}