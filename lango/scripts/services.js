// zmienianie tabów
const switch_links = document.querySelectorAll('.switch-bar__link');
switch_links.forEach((link)=>{
    link.addEventListener('click', zmienTaba);
});

const wszystkie_uslugi = [
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`,
    `<div class="grid__kafelek">
        <div class="kafelek__top"></div>
        <p class="kafelek__text">Lorem ipsum</p>
        <a href="#" class="kafelek__link">Więcej</a>
    </div>`
];

const wszystkie_jezyki = [
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/arabski.svg" alt="flaga Arabii Saudyjskiej" class="element__img">
        <p class="element__text">Arabski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/hiszpanski.svg" alt="flaga Hiszpanii" class="element__img">
        <p class="element__text">Hiszpański</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/holenderski.svg" alt="flaga Holandii" class="element__img">
        <p class="element__text">Holenderski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/japonski.svg" alt="flaga Japonii" class="element__img">
        <p class="element__text">Japoński</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/niemiecki.svg" alt="flaga Niemiec" class="element__img">
        <p class="element__text">Niemiecki</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/portugalski.svg" alt="flaga Portugalii" class="element__img">
        <p class="element__text">Portugalski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/uk.svg" alt="flaga Wielkiej Brytanii" class="element__img">
        <p class="element__text">Angielski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/wloski.svg" alt="flaga Włoch" class="element__img">
        <p class="element__text">Włoski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/norweski.svg" alt="flaga Norwegii" class="element__img">
        <p class="element__text">Norweski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/szwedzki.svg" alt="flaga Szwecji" class="element__img">
        <p class="element__text">Szwedzki</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/wegierski.svg" alt="flaga Węgier" class="element__img">
        <p class="element__text">Węgierski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/finski.svg" alt="flaga Finlandii" class="element__img">
        <p class="element__text">Fiński</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/ukrainski.svg" alt="flaga Ukrainy" class="element__img">
        <p class="element__text">Ukraiński</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/francuski.svg" alt="flaga Francji" class="element__img">
        <p class="element__text">Francuski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/dunski.svg" alt="flaga Danii" class="element__img">
        <p class="element__text">Duński</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/islandzki.svg" alt="flaga Islandii" class="element__img">
        <p class="element__text">Islandzki</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/hinduski.svg" alt="flaga Indii" class="element__img">
        <p class="element__text">Hinduski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/chinski.svg" alt="flaga Chin" class="element__img">
        <p class="element__text">Chiński</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/czeski.svg" alt="flaga Czech" class="element__img">
        <p class="element__text">Czeski</p>
    </div>`,
    `<div class="jezyki-grid__element">
        <img src="img/icons/languages/turecki.svg" alt="flaga Turcji" class="element__img">
        <p class="element__text">Turecki</p>
    </div>`
];
let other_content_cache;
const grid_jezykow_string = `<div class="jezyki-grid">
<div class="jezyki-grid__element">
    <img src="img/icons/languages/arabski.svg" alt="flaga Arabii Saudyjskiej" class="element__img">
    <p class="element__text">Arabski</p>
</div>
<div class="jezyki-grid__element">
    <img src="img/icons/languages/hiszpanski.svg" alt="flaga Hiszpanii" class="element__img">
    <p class="element__text">Hiszpański</p>
</div>
<div class="jezyki-grid__element">
    <img src="img/icons/languages/holenderski.svg" alt="flaga Holandii" class="element__img">
    <p class="element__text">Holenderski</p>
</div>
<div class="jezyki-grid__element">
    <img src="img/icons/languages/japonski.svg" alt="flaga Japonii" class="element__img">
    <p class="element__text">Japoński</p>
</div>
<div class="jezyki-grid__element">
    <img src="img/icons/languages/niemiecki.svg" alt="flaga Niemiec" class="element__img">
    <p class="element__text">Niemiecki</p>
</div>
<div class="jezyki-grid__element">
    <img src="img/icons/languages/portugalski.svg" alt="flaga Portugalii" class="element__img">
    <p class="element__text">Portugalski</p>
</div>
<div class="jezyki-grid__element">
    <img src="img/icons/languages/uk.svg" alt="flaga Wielkiej Brytanii" class="element__img">
    <p class="element__text">Angielski</p>
</div>
<div class="jezyki-grid__element">
    <img src="img/icons/languages/wloski.svg" alt="flaga Włoch" class="element__img">
    <p class="element__text">Włoski</p>
</div>
</div>`;
function zmienTaba(e){
    const aktualny_content_element = document.querySelector('.switch-bar').nextElementSibling;
    const nowy_tab = e.target.innerHTML;
    const aktualny_tab = aktualny_content_element.classList.contains('grid') ? 'Usługi' : 'Języki';
    aktualny_content_element.remove();
    if(nowy_tab=='Usługi' && aktualny_tab=='Języki'){
        document.querySelector('.switch-bar').insertAdjacentElement('afterend', other_content_cache);
        if(other_content_cache.childElementCount == wszystkie_uslugi.length){
            zmienNaPokazMniej()
        }
        else{
            zmienNaPokazWiecej()
        }
    }
    else if(nowy_tab=='Języki' && aktualny_tab=='Usługi'){
        if(other_content_cache !== undefined){
            document.querySelector('.switch-bar').insertAdjacentElement('afterend', other_content_cache);
            if(other_content_cache.childElementCount == wszystkie_jezyki.length){
                zmienNaPokazMniej()
            }
            else{
                zmienNaPokazWiecej()
            }
        }
        else{
            document.querySelector('.switch-bar').insertAdjacentHTML('afterend', grid_jezykow_string);
            if(document.querySelector('.switch-bar').nextElementSibling.childElementCount == wszystkie_jezyki.length){
                zmienNaPokazMniej()
            }
            else{
                zmienNaPokazWiecej()
            }
        }
    }
    other_content_cache = aktualny_content_element;
    document.querySelector('.switch-bar__link--active').classList.remove('switch-bar__link--active');
    e.target.classList.add('switch-bar__link--active');
}

function zmienNaPokazMniej(){
    document.querySelector('.more').innerHTML = 'Pokaż mniej <img class="more__img" src="img/icons/up-arrow-icon.png" alt="strzałka w górę">';
    document.querySelector('.more').classList.remove('more--more');
    document.querySelector('.more').classList.add('more--less');
}
function zmienNaPokazWiecej(){
    document.querySelector('.more').innerHTML = 'Pokaż więcej <img class="more__img" src="img/icons/down-arrow-icon.png" alt="strzałka w dół">';
    document.querySelector('.more').classList.remove('more--less');
    document.querySelector('.more').classList.add('more--more');
}



// pokaz mniej i wiecej
const wiecej_button = document.querySelector('.more');
wiecej_button.addEventListener('click', pokazWiecejLubMniej);

function pokazWiecejLubMniej(){
    const button = document.querySelector('.more');
    const content_parent = document.querySelector('.switch-bar').nextElementSibling;
    const current_tab = content_parent.classList.contains('grid') ? 'uslugi' : 'jezyki';
    const liczba_elementow = content_parent.childElementCount;
    let new_content_array;
    if(current_tab == 'uslugi'){
        if(button.classList.contains('more--more')){
            new_content_array = wszystkie_uslugi.slice(0,liczba_elementow+6);
            if(new_content_array.length === wszystkie_uslugi.length){
                zmienNaPokazMniej();
            }
        }
        else if(button.classList.contains('more--less')){
            new_content_array = wszystkie_uslugi.slice(0,6);
            zmienNaPokazWiecej();
        }
    }
    else if(current_tab == 'jezyki'){
        if(button.classList.contains('more--more')){
            new_content_array = wszystkie_jezyki.slice(0,liczba_elementow+8);
            if(new_content_array.length === wszystkie_jezyki.length){
                zmienNaPokazMniej();
            }
        }
        else if(button.classList.contains('more--less')){
            new_content_array = wszystkie_jezyki.slice(0,8);
            zmienNaPokazWiecej();
        }
    }
    content_parent.innerHTML = '';
    new_content_array.forEach((element)=>{
        content_parent.innerHTML = content_parent.innerHTML + element;
    });
}