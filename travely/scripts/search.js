// wyszukiwanie
const search_button = document.querySelector('.search__bar__button');
search_button.addEventListener('click', wyszukajPakiety);

const filter_submits = document.querySelectorAll('.search__filters__dropdown__button');
filter_submits.forEach((button)=>{
    button.addEventListener('click', wyszukajPakiety);
})

function wyszukajPakiety(e){
    const proponowane = document.querySelector('.search__bar__proponowane');
    const input = document.querySelector('.search__bar__input');
    const search_button = document.querySelector('.search__bar__button');
    const dropdowns = document.querySelectorAll('.search__filters__container');
    const wyniki = document.querySelector('.wyniki');
    const brak_wynikow = document.createElement('div');
    brak_wynikow.classList.add('wyniki__brak');
    brak_wynikow.innerHTML = 'Nie znaleziono produktów';
    const fraza = document.querySelector('.search__bar__input').value;
    const odpoczynek = [document.querySelector('#odpoczynek').checked,'odpoczynek'];
    const zwiedzanie = [document.querySelector('#zwiedzanie').checked,'zwiedzanie'];
    const sport = [document.querySelector('#sport').checked,'sport'];
    const przygoda = [document.querySelector('#przygoda').checked,'przygoda'];
    const min_cena = document.querySelector('.search__filters__dropdown__input[placeholder="Min."]').value;
    const max_cena = document.querySelector('.search__filters__dropdown__input[placeholder="Max."]').value;
    let filtry;
    let params = new FormData();

    if(fraza!==''){
        if((odpoczynek[0]==true || zwiedzanie[0]==true || sport[0]==true || przygoda[0]==true)&&(min_cena!=='' || max_cena!=='')){
            filtry = 'typ i cena';
            const typy_array = [odpoczynek,zwiedzanie,sport,przygoda];
            let zaznaczone = [];
            typy_array.forEach((typ)=>{
                if(typ[0]==true){
                    zaznaczone.push(typ[1]);
                }
            });
            params.append('zaznaczone', JSON.stringify(zaznaczone));
    
            params.append('min_cena', min_cena);
            params.append('max_cena', max_cena);
        }
        else if((odpoczynek[0]==true || zwiedzanie[0]==true || sport[0]==true || przygoda[0]==true)&&(min_cena==='' && max_cena==='')){
            filtry = 'typ';
            const typy_array = [odpoczynek,zwiedzanie,sport,przygoda];
            let zaznaczone = [];
            typy_array.forEach((typ)=>{
                if(typ[0]==true){
                    zaznaczone.push(typ[1]);
                }
            });
            params.append('zaznaczone', JSON.stringify(zaznaczone));
        }
        else if((odpoczynek[0]==false && zwiedzanie[0]==false && sport[0]==false && przygoda[0]==false)&&(min_cena!=='' || max_cena!=='')){
            filtry = 'cena';
            params.append('min_cena', min_cena);
            params.append('max_cena', max_cena);
        }
        else if((odpoczynek[0]==false && zwiedzanie[0]==false && sport[0]==false && przygoda[0]==false)&&(min_cena==='' && max_cena==='')){
            filtry = 'none';
        }
        
        if(filtry!==undefined){
            let xhr = new XMLHttpRequest();
            params.append('filtry', filtry);
            params.append('fraza', fraza);
            xhr.open('POST', 'ajax/search_packages.php', true);
            xhr.onload = function(){
                if(this.status==200 && this.responseText!==''){
                    wyswietlWyniki(wyniki,brak_wynikow,JSON.parse(this.responseText));
                    proponowane.innerHTML = '';
                    input.classList.remove('search__bar__input--cut');
                    search_button.classList.remove('search__bar__button--cut');
                    dropdowns.forEach((dropdown)=>{
                        dropdown.classList.remove('search__filters__container--active')
                        dropdown.querySelector('.search__filters__button').classList.remove('search__filters__button--active');
                    })
                    if(e.target.classList.contains('search__bar__button') || e.target.classList.contains('search__bar__button__icon')){
                        const item = window.localStorage.getItem('historia');
                        let historia;
                        if(item!==null){
                            historia = JSON.parse(item);
                        }
                        else{
                            historia = [];
                        }
                        
                        if(historia.find(element=>element==fraza)==undefined){
                            historia.push(fraza);
                            if(historia.length>5){
                                historia.shift();
                            }
                            window.localStorage.setItem('historia', JSON.stringify(historia));
                        }
                    }
                }
            }
            xhr.send(params);
        }
    }
}

function wyswietlWyniki(wyniki,brak_wynikow,response){
    if(response.length==0){
        wyniki.innerHTML = '';
        wyniki.classList.add('wyniki--empty');
        wyniki.appendChild(brak_wynikow);
    }
    else{
        wyniki.classList.remove('wyniki--empty');
        wyniki.innerHTML = '';
        response.forEach((wynik)=>{
            let ikonka;
            switch(wynik.ikonka){
                case 'zwiedzanie':
                    ikonka = 'M20 9h-17v-6h17l3 3-3 3zm-6 10h-4v5h4v-5zm0-19h-4v2h4v-2zm-10 11h17v6h-17l-3-3 3-3z';
                    break;
                case 'sport':
                    ikonka = 'M22.856 6.912c-1.36 5.26-6.115 9.959-12.541 12.443.977 1.273 4.071 3.382 5.837 3.892 4.578-1.691 7.848-6.081 7.848-11.247 0-1.821-.418-3.542-1.144-5.088m-15.224 6.699c.119 1.538.613 2.921 1.355 4.094 6.817-2.445 11.584-7.587 12.474-13.067-.824-1.058-1.818-1.975-2.946-2.706-1.437 6.91-7.647 10.345-10.883 11.679m-2.045-1.045c-1.216-1.41-2.604-2.484-5.347-2.96-.157.774-.24 1.574-.24 2.394 0 6.628 5.372 12 12 12 .496 0 .981-.039 1.461-.097-3.253-1.323-8.032-5.669-7.874-11.337m1.78-1.022c1.209-.534 2.74-1.34 4.222-2.485-2.185-2.84-5.239-4.997-8.252-5.349-1.085 1.133-1.946 2.478-2.522 3.968 3.384.647 5.127 2.152 6.552 3.866m-2.356-9.285c1.969-1.416 4.378-2.259 6.989-2.259 1.647 0 3.216.333 4.645.934-.45 2.861-1.835 5.102-3.537 6.793-2.105-2.675-5.203-4.78-8.097-5.468';
                    break;
                case 'odpoczynek':
                    ikonka = 'M13 2.056v-1.056c0-.552-.447-1-1-1s-1 .448-1 1v1.052c-6.916.522-10.371 5.594-11 9.906 1.865-2.677 6.136-2.677 8 0 1.836-2.637 6.045-2.689 7.917 0 1.864-2.677 6.219-2.677 8.083 0-.625-4.291-4.125-9.333-11-9.902zm-9.238 5.899c1.95-2.633 4.631-3.775 7.434-3.941-2.007 1.622-3.023 4.083-3.196 5.169-1.264-.876-2.783-1.282-4.238-1.228zm12.158 1.229c-.165-1.064-1.123-3.54-3.113-5.167 2.736.177 5.43 1.289 7.414 3.938-1.605-.054-3.101.402-4.301 1.229zm-2.92 2.973v8.843c0 1.657-1.344 3-3 3s-3-1.343-3-3v-1h2v1c0 .551.449 1 1 1s1-.449 1-1v-8.866c.68-.226 1.27-.242 2 .023z';
                    break;
                case 'przygoda':
                    ikonka = 'M20.655 22.122v-2.197c1.907-.418 3.345-2.235 3.345-4.41 0-1.381-.292-1.662-3.536-10.041-.012 0-.16-.459-.646-.459-.488 0-.633.461-.643.461-.611 1.58-1.11 2.863-1.528 3.937.73 1.813.853 2.414.853 3.435 0 1.969-.884 3.737-2.289 4.935.59 1.085 1.59 1.883 2.771 2.142v1.744c-1.538-.339-3.53-.586-6.065-.637v-2.761c2.599-.436 4.583-2.7 4.583-5.423 0-1.687-.384-2.031-4.653-12.271-.014 0-.209-.562-.847-.562-.643 0-.833.564-.847.564-4.633 11.145-4.653 10.837-4.653 12.269 0 2.723 1.984 4.987 4.583 5.423v2.761c-2.562.051-4.571.303-6.116.648v-1.755c1.186-.263 2.187-1.077 2.769-2.186-1.375-1.198-2.236-2.946-2.236-4.891 0-.934.024-1.277.844-3.324-.424-1.088-.938-2.41-1.567-4.05-.011 0-.157-.459-.638-.459-.484 0-.627.461-.637.461-3.487 9.119-3.502 8.867-3.502 10.039 0 2.175 1.423 3.992 3.311 4.41v2.208c-2.587.852-3.311 1.882-3.311 1.882h24s-.732-1.038-3.345-1.893z';
                    break;
            }
            wyniki.innerHTML = wyniki.innerHTML + 
            `<div class="pakiet__component">
            <div class="pakiet__component__img" style="background-image:url('img/packages/${wynik.miasto}.jpg');"></div>
            <div class="pakiet__component__data">
                <div class="data__circle data__circle--${wynik.ikonka}">
                    <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="${ikonka}"/></svg>
                </div>
                <div class="data__left">
                    <p class="data__left__miasto">${wynik.miasto}</p>
                    <div class="data__left__kontynent">
                        <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                        <div class="data__left__kontynent__text">${wynik.kraj}</div>
                    </div>
                </div>
                <div class="data__right">${wynik.cena}zł</div>
            </div>
            <div class="pakiet__component__desc">
                ${wynik.opis}
            </div>
            <a href="pakiet?id=${wynik.id}" class="pakiet__component__button pakiet__component__button">Szczegóły</a>
        </div>`
        });
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
    }
}



// filter dropdowns
const filter__dropdown__buttons = document.querySelectorAll('.search__filters__button');
filter__dropdown__buttons.forEach((button)=>{
    button.addEventListener('click', filterDropdownToggle);
});

function filterDropdownToggle(e){
    const container = e.target.closest('.search__filters__container');
    const button = container.querySelector('.search__filters__button');
    container.classList.toggle('search__filters__container--active');
    if(button.classList.contains('search__filters__button--active')){
        setTimeout(()=>{
            button.classList.remove('search__filters__button--active');
        },150)
    }
    else{
        button.classList.add('search__filters__button--active');
    }
}


// proponowane
const search_input = document.querySelector('.search__bar__input');
search_input.addEventListener('input', zmienProponowane);

function zmienProponowane(e){
    const filterItems = (needle, heystack) => {
        let query = needle.toLowerCase();
        return heystack.filter(item => item.toLowerCase().indexOf(query) >= 0);
    }
    const input = e.target;
    const fraza = input.value;
    const proponowane = document.querySelector('.search__bar__proponowane');
    if(window.localStorage.getItem('historia')!==null){
        proponowane.innerHTML = '';
        const historia = JSON.parse(window.localStorage.getItem('historia'));
        let matching = [];
        if(fraza!==''){
            historia_matching = filterItems(fraza,historia);
            historia_matching.forEach((match)=>{
                matching.push([match,'historia'])
            });
            let xhr = new XMLHttpRequest();
            let params = new FormData();
            params.append('fraza', fraza);
            xhr.open('POST', 'ajax/wyszukiwanie_miast_get-values.php', true);
            xhr.onload = function(){
                if(this.status==200 && this.responseText!==''){
                    const baza_matching = JSON.parse(this.responseText);
                    baza_matching.forEach((match)=>{
                        matching.push([match.miasto,'baza']);
                    });
                    wyswietlProponowane(matching,proponowane);
                }
            }
            xhr.send(params);
        }
        else{
            historia.forEach((match)=>{
                matching.push([match,'historia'])
            })
            wyswietlProponowane(matching,proponowane);
        }
    }
}

function zmienWartoscInputaProponowane(e){
    if(e.target.classList.contains('proponowane__element__x')===false){
        let element;
        if(e.target.classList.contains('proponowane__element')){
            element = e.target;
        }
        else{
            element = e.target.closest('.proponowane__element');
        }
        const text = element.querySelector('.proponowane__element__text').innerHTML;
        const input = document.querySelector('.search__bar__input');
        const button = document.querySelector('.search__bar__button');
        const proponowane = document.querySelector('.search__bar__proponowane');
        input.value = text;
        input.classList.remove('search__bar__input--cut');
        button.classList.remove('search__bar__button--cut');
        proponowane.innerHTML = '';
    }
}
function wyswietlProponowane(matching,proponowane){
    const input = document.querySelector('.search__bar__input');
    const button = document.querySelector('.search__bar__button');
    matching.forEach((match)=>{
        let element;
        switch(match[1]){
            case 'historia':
                element = 
                `
                <div class="proponowane__element proponowane__element--historia">
                    <div class="proponowane__element__left">
                        <img class="proponowane__element__icon" src="img/icons/time-icon.png" alt="zegarek">
                        <p class="proponowane__element__text">${match[0]}</p>
                    </div>
                    <img src="img/icons/x-icon.png" alt="krzyżyk" class="proponowane__element__icon proponowane__element__x">
                </div>
                `
                break;
            case 'baza':
                element = 
                `
                <div class="proponowane__element proponowane__element--baza">
                    <img class="proponowane__element__icon" src="img/icons/compass-icon.png" alt="kompas">
                    <p class="proponowane__element__text">${match[0]}</p>
                </div>
                `
                break;
        }
        proponowane.innerHTML = proponowane.innerHTML + element;
        const proponowane_elements = document.querySelectorAll('.proponowane__element');
        proponowane_elements.forEach((element)=>{
            element.addEventListener('click', zmienWartoscInputaProponowane);
        });
        const usun_historie__buttons = document.querySelectorAll('.proponowane__element__x');
        usun_historie__buttons.forEach((x)=>{
            x.addEventListener('click', usunElementHistorii);
        });
    })
    if(matching.length==1){
        proponowane.style.bottom = '-68px';
    }
    else{
        let value = 68 + (matching.length-1)*52;
        proponowane.style.bottom = '-'+value+'px';
    }
    if(proponowane.innerHTML === ''){
        button.classList.remove('search__bar__button--cut')
        input.classList.remove('search__bar__input--cut')
    }
    else{
        button.classList.add('search__bar__button--cut')
        input.classList.add('search__bar__input--cut')
    }
}
function usunElementHistorii(e){
    const proponowane = document.querySelector('.search__bar__proponowane');
    const element = e.target.closest('.proponowane__element')
    const haslo = element.querySelector('.proponowane__element__text').innerHTML;
    let historia = JSON.parse(window.localStorage.getItem('historia'));

    historia.splice(historia.indexOf(haslo));
    proponowane.removeChild(element);
    window.localStorage.setItem('historia', JSON.stringify(historia));
    let bottom = parseInt(proponowane.style.bottom)+52;
    proponowane.style.bottom = bottom+'px';
}