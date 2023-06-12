const info_form = document.querySelector('.informacje');
info_form.addEventListener('submit', zmienInformacje);
const adres_form = document.querySelector('.adres');
adres_form.addEventListener('submit', zmienAdres);
const haslo_form = document.querySelector('.haslo');
haslo_form.addEventListener('submit', zmienHaslo);

function zmienInformacje(e){
    e.preventDefault();
    const form = e.target;
    const message = form.querySelector('.section__error');
    const imie = form.querySelector('#imie').value;
    const nazwisko = form.querySelector('#nazwisko').value;
    const nr_tel = form.querySelector('#nr_tel').value;
    const email = form.querySelector('#email').value;
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('imie', imie);
    params.append('nazwisko', nazwisko);
    params.append('nr_tel', nr_tel);
    params.append('email', email);
    xhr.open('POST', 'ajax/zmien_ustawienia.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''&&JSON.parse(this.responseText)){
            const response = JSON.parse(this.responseText);        
            switch(response.typ){
                case 'good':
                    message.style.color = 'limegreen';
                    message.innerHTML = response.message;
                    break;
                case 'bad':
                    message.style.color = 'red';
                    message.innerHTML = response.message;
                    break;
            }
        }
    }
    xhr.send(params);
}

function zmienAdres(e){
    e.preventDefault();
    const form = e.target;
    const message = form.querySelector('.section__error');
    const kraj = form.querySelector('#kraj').value;
    const miasto = form.querySelector('#miasto').value;
    const kod_pocztowy = form.querySelector('#kod').value;
    const adres = form.querySelector('#adres').value;
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('kraj',kraj);
    params.append('miasto', miasto);
    params.append('kod_pocztowy', kod_pocztowy);
    params.append('adres',adres);
    xhr.open('POST', 'ajax/zmien_ustawienia.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''&&JSON.parse(this.responseText)){
            const response = JSON.parse(this.responseText);        
            switch(response.typ){
                case 'good':
                    message.style.color = 'limegreen';
                    message.innerHTML = response.message;
                    break;
                case 'bad':
                    message.style.color = 'red';
                    message.innerHTML = response.message;
                    break;
            }
        }
    }
    xhr.send(params);
}

function zmienHaslo(e){
    e.preventDefault();
    const form = e.target;
    const message = form.querySelector('.section__error');
    const nowe_haslo = form.querySelector('#new').value;
    const nowe_haslo_confirm = form.querySelector('#confirm').value;
    const current_haslo = form.querySelector('#current').value;
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('nowe_haslo', nowe_haslo);
    params.append('nowe_haslo_confirm', nowe_haslo_confirm);
    params.append('current_haslo', current_haslo);
    xhr.open('POST', 'ajax/zmien_ustawienia.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''&&JSON.parse(this.responseText)){
            const response = JSON.parse(this.responseText);        
            switch(response.typ){
                case 'good':
                    message.style.color = 'limegreen';
                    message.innerHTML = response.message;
                    break;
                case 'bad':
                    message.style.color = 'red';
                    message.innerHTML = response.message;
                    break;
            }
            form.reset();
        }
    }
    xhr.send(params);
}