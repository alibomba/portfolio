// dropdown miast
const search_bar = document.querySelector('#cel');
search_bar.addEventListener('input',zmienContentDropdowna);

function zmienContentDropdowna(e){
    const input = e.target;
    const fraza = input.value;
    const dropdown = input.closest('.filtr-ofert__element').querySelector('.filtr-ofert__element__dropdown');
    if(fraza!==''){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('fraza', fraza);
        xhr.open('POST', 'ajax/wyszukiwanie_miast_get-values.php', true);
        xhr.onload = function(){
            if(this.status==200){
                let response;
                if(this.responseText=='Brak'){
                    dropdown.innerHTML = '';
                    input.style.borderRadius = '7px';
                }
                else{
                    response = JSON.parse(this.responseText);
                }

                if(response.length>0){
                    dropdown.innerHTML = '';
                    let wartosc;
                    if(response.length==1){
                        wartosc = 27;
                    }
                    else{
                        wartosc = 27+(response.length-1)*41.5;
                    }
                    dropdown.style.bottom = '-'+wartosc+'px';

                    response.forEach((miasto)=>{
                        dropdown.innerHTML = dropdown.innerHTML + `<p class="element__dropdown__element"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg><span class="element__dropdown__element__miasto">${miasto.miasto}</span></p>`;
                        input.style.borderRadius = '7px 7px 0 0';
                    });
                    const elements = document.querySelectorAll('.element__dropdown__element');
                    elements.forEach((element)=>{
                        element.addEventListener('click', zmienWartoscInputa);
                    });
                }
                else{
                    dropdown.innerHTML = '';
                    input.style.borderRadius = '7px';
                }
            }
        }
        xhr.send(params);
    }
    else{
        dropdown.innerHTML = '';
        input.style.borderRadius = '7px';
    }
}

function zmienWartoscInputa(e){
    let input = e.target.closest('.filtr-ofert__element').querySelector('.filtr-ofert__input');
    let dropdown = e.target.closest('.filtr-ofert__element__dropdown');
    let value;
    if(e.target.classList.contains('element__dropdown__element__miasto')){
        value = e.target.innerHTML;
    }
    else{
        value = e.target.closest('.element__dropdown__element').querySelector('.element__dropdown__element__miasto').innerHTML;
    }
    input.value = value;
    input.style.borderRadius = '7px';
    dropdown.innerHTML = '';
}


// zmiana liczby osob
const zmien_liczbe = function(e){
    const svg = e.target.closest('svg');
    let container_liczby = document.querySelector('.element__number');
    let liczba = parseInt(container_liczby.innerHTML);
    let nowa_liczba;
    if(svg.classList.contains('element__row__minus')){
        nowa_liczba = liczba-1;
    }
    else if(svg.classList.contains('element__row__plus')){
        nowa_liczba = liczba+1;
    }
    container_liczby.innerHTML = nowa_liczba;
    if(nowa_liczba==1 || nowa_liczba==10){
        svg.querySelector('path').style.fill = 'gray';
        svg.style.cursor = 'not-allowed';
        svg.removeEventListener('click', zmien_liczbe);
    }
    else if(nowa_liczba==2){
        let dzialajacy = document.querySelector('.element__row__minus');
        dzialajacy.addEventListener('click',zmien_liczbe);
        dzialajacy.querySelector('path').style.fill = 'var(--primary)'
        dzialajacy.style.cursor = 'pointer';
    }
    else if(nowa_liczba==9){
        let dzialajacy = document.querySelector('.element__row__plus');
        dzialajacy.addEventListener('click',zmien_liczbe);
        dzialajacy.querySelector('path').style.fill = 'var(--primary)';
        dzialajacy.style.cursor = 'pointer';
    }
    
}
const kontrolki = document.querySelectorAll('.element__row__icon');
kontrolki.forEach((kontrolka)=>{
    kontrolka.addEventListener('click', zmien_liczbe);
});



// zmiana ceny
const slider = document.querySelector('.element__slider');

slider.addEventListener('input',zmienCene);

function zmienCene(e){
    const step = parseInt(e.target.value)+10;
    const mnoznik = 10000;
    const wynik = mnoznik * (step/100);
    let container = document.querySelector('.element__cena__number');
    container.innerHTML = Math.ceil(wynik);
}


// submit
const wyszukiwarka = document.querySelector('.filtr-ofert');
wyszukiwarka.addEventListener('submit', wyszukajHotel);

function wyszukajHotel(e){
    e.preventDefault();
    const form = e.target;
    const miasto = form.querySelector('#cel').value;
    const poczatek = form.querySelector('#poczatek').value;
    const koniec = form.querySelector('#koniec').value;
    const osob = form.querySelector('.element__number').innerHTML;
    const maks_cena = form.querySelector('.element__cena__number').innerHTML;
    let error = form.querySelector('.filtr-ofert__error');
    let good = form.querySelector('.filtr-ofert__good');

    if(miasto==''){
        error.innerHTML = 'Podaj miasto';
    }
    else if(poczatek==''){
        error.innerHTML = 'Podaj datę wyjazdu';
    }
    else if(koniec==''){
        error.innerHTML = 'Podaj datę powrotu';
    }
    else if(poczatek>koniec){
        error.innerHTML = 'Data wyjazdu musi być przed datą powrotu';
    }
    else{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('miasto', miasto);
        params.append('poczatek', poczatek);
        params.append('koniec', koniec);
        params.append('osob', osob);
        params.append('maks_cena', maks_cena);
        xhr.open('POST', 'ajax/filtr_ofert.php', true);
        xhr.onload = function(){
            if(this.status==200 && this.responseText=='fine'){
                form.reset();
                error.innerHTML = '';
                good.innerHTML = 'Działa';
                setTimeout(()=>{
                    good.innerHTML = '';
                },4000);
            }
            else{
                error.innerHTML = 'Błąd bazy danych! Spróbuj ponownie później.';
            }
        }
        xhr.send(params);
    }

}