// teraz trzeba naprawic zmienopcjenaklik a potem dopasowanie scrolla i printables
const combo__button = document.querySelector('.combo__button');
const combo_options = Array.from(document.querySelectorAll('.combo__list__option'));

function toggleRozwiniecieListy(){
    const button = document.querySelector('.combo__button');
    const list = document.querySelector('.combo__list');
    button.classList.toggle('combo__button--expanded');
    list.classList.toggle('combo__list--expanded');
    const ariaExpandedState = button.getAttribute('aria-expanded');
    if(ariaExpandedState=='true'){
        button.setAttribute('aria-expanded', 'false')
    }
    else if(ariaExpandedState=='false'){
        button.setAttribute('aria-expanded', 'true');
        if(combo__button.getAttribute('value')!='null'){
            document.querySelector(`#${combo__button.getAttribute('value')}`).classList.add('combo__list__option--visual-focus');
            combo__button.setAttribute('aria-activedescendant', combo__button.getAttribute('value'));
        }
    }
}

combo__button.addEventListener('click', toggleRozwiniecieListy);

combo__button.addEventListener('focusin',()=>{
    window.addEventListener('keydown', dystrybucjaPrzyciskow);
});

combo__button.addEventListener('focusout', ()=>{
    window.removeEventListener('keydown', dystrybucjaPrzyciskow);
    zwinListe();
})


function dystrybucjaPrzyciskow(e){
    const button_state = document.querySelector('.combo__button').getAttribute('aria-expanded');
    if(button_state == 'false'){
        if(e.key=='ArrowUp' || e.key=='ArrowDown' || e.key=='Enter' || e.key==' '){
            rozwinListe();
        }
        else if(e.key=='Home'){
            rozwinListe();
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus');
            })
            combo_options[0].classList.add('combo__list__option--visual-focus');
            combo__button.setAttribute('aria-activedescendant', combo_options[0].id);

        }
        else if(e.key=='End'){
            rozwinListe();
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus');
            })
            combo_options[combo_options.length - 1].classList.add('combo__list__option--visual-focus');
            combo__button.setAttribute('aria-activedescendant', combo_options[combo_options.length - 1].id);
        }
    }
    else if(button_state == 'true'){
        if(e.key=='Escape'){
            zwinListe();
        }
        else if(e.key=='Enter' || e.key==' ' || e.key=='Tab' || (e.key=='ArrowUp' && e.altKey==true)){
            const selected = document.querySelector('.combo__list__option--visual-focus');
            if(selected!==null){
                combo__button.setAttribute('value', selected.id);
                document.querySelector('.combo__button__text').innerHTML = selected.innerHTML;
            }
            zwinListe();
        }
        else if(e.key=='ArrowDown'){
            const current_selected = document.querySelector('.combo__list__option--visual-focus');
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus')
            });
            if(current_selected!==null){
                const current_index = combo_options.indexOf(current_selected);
                if(current_index!==combo_options.length-1){
                    combo_options[current_index+1].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant',  combo_options[current_index+1].id);
                }
                else{
                    combo_options[current_index].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant',  combo_options[current_index].id);
                }
            }
            else{
                combo_options[0].classList.add('combo__list__option--visual-focus');
                combo__button.setAttribute('aria-activedescendant', combo_options[0].id);
            }
        }
        else if(e.key=='ArrowUp'){
            const current_selected = document.querySelector('.combo__list__option--visual-focus');
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus')
            });
            if(current_selected!==null){
                const current_index = combo_options.indexOf(current_selected);
                if(current_index!==0){
                    combo_options[current_index-1].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant',  combo_options[current_index-1].id);
                }
                else{
                    combo_options[current_index].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant',  combo_options[current_index].id);
                }
            }
            else{
                combo_options[combo_options.length-1].classList.add('combo__list__option--visual-focus');
                combo__button.setAttribute('aria-activedescendant', combo_options[combo_options.length-1].id);
            }
        }
        else if(e.key=='Home'){
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus')
            });
            combo_options[0].classList.add('combo__list__option--visual-focus');
            combo__button.setAttribute('aria-activedescendant', combo_options[0].id);
        }
        else if(e.key=='End'){
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus')
            });
            combo_options[combo_options.length-1].classList.add('combo__list__option--visual-focus');
            combo__button.setAttribute('aria-activedescendant', combo_options[combo_options.length-1].id);
        }
        else if(e.key=='PageUp'){
            const current_selected = document.querySelector('.combo__list__option--visual-focus');
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus')
            });
            if(current_selected!==null){
                const current_index = combo_options.indexOf(current_selected);
                if(current_index < 11){
                    combo_options[0].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant', combo_options[0].id);
                }
                else{
                    combo_options[current_index-10].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant', combo_options[current_index-10].id);
                }
            }
            else{
                combo_options[0].classList.add('combo__list__option--visual-focus');
                combo__button.setAttribute('aria-activedescendant', combo_options[0].id);
            }
        }
        else if(e.key=='PageDown'){
            const current_selected = document.querySelector('.combo__list__option--visual-focus');
            combo_options.forEach((option)=>{
                option.classList.remove('combo__list__option--visual-focus')
            });
            if(current_selected!==null){
                const current_index = combo_options.indexOf(current_selected);
                if(current_index+10 > combo_options.length-1){
                    combo_options[combo_options.length-1].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant', combo_options[combo_options.length-1].id);
                }
                else{
                    combo_options[current_index+10].classList.add('combo__list__option--visual-focus');
                    combo__button.setAttribute('aria-activedescendant', combo_options[current_index+10].id);
                }
            }
            else{
                combo_options[combo_options.length-1].classList.add('combo__list__option--visual-focus');
                combo__button.setAttribute('aria-activedescendant', combo_options[combo_options.length-1].id);
            }
        }
    }
}

function rozwinListe(){
    const button = document.querySelector('.combo__button');
    const list = document.querySelector('.combo__list');
    button.classList.add('combo__button--expanded');
    list.classList.add('combo__list--expanded');
    button.setAttribute('aria-expanded', 'true');
    if(combo__button.getAttribute('value')!='null'){
        document.querySelector(`#${combo__button.getAttribute('value')}`).classList.add('combo__list__option--visual-focus');
        combo__button.setAttribute('aria-activedescendant', combo__button.getAttribute('value'));
    }
}
function zwinListe(){
    const button = document.querySelector('.combo__button');
    const list = document.querySelector('.combo__list');
    button.classList.remove('combo__button--expanded');
    list.classList.remove('combo__list--expanded');
    button.setAttribute('aria-expanded', 'false');
    combo_options.forEach((option)=>{
        option.classList.remove('combo__list__option--visual-focus');
    });
}



// wysylanie zamowienia
const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const wyswietlError = (error) => {
    const info = document.querySelector('.form__response');
    info.classList.remove('form__response--good');
    info.classList.add('form__response--bad');
    info.innerHTML = error;
}
const kontaktForm = document.querySelector('.form');
kontaktForm.addEventListener('submit', wyslijZamowienie);

function wyslijZamowienie(e){
    e.preventDefault();
    const form = e.target;
    const usluga = document.querySelector('.combo__button').getAttribute('value');
    const imie = form.querySelector('#imie').value;
    const nazwisko = form.querySelector('#nazwisko').value;
    const email = form.querySelector('#email').value;
    const nr_tel = form.querySelector('#nr_tel').value;
    const firma = form.querySelector('#firma').value;
    const tresc = form.querySelector('#tresc').value;
    const info = form.querySelector('.form__response');
    if(imie == '' || nazwisko == '' || usluga == '' || email == '' || nr_tel == '' || firma == '' || tresc == ''){
        wyswietlError('Wypełnij wszystkie pola');
    }
    else if(usluga == 'null'){
        wyswietlError('Wybierz usługę');
    }
    else if(validateEmail(email) === null){
        wyswietlError('Podaj poprawny adres e-mail');
    }
    else{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('usluga', usluga);
        params.append('imie', imie);
        params.append('nazwisko', nazwisko);
        params.append('email', email);
        params.append('nr_tel', nr_tel);
        params.append('firma', firma);
        params.append('tresc', tresc);
        xhr.open('POST', 'ajax/wyslij_zamowienie.php', true);
        xhr.onload = function(){
            if(this.status === 200 && this.responseText !== '' && JSON.parse(this.responseText)){
                const response = JSON.parse(this.responseText);
                switch(response.type){
                    case 'good':
                        info.classList.remove('form__response--bad');
                        info.classList.add('form__response--good');
                        info.innerHTML = response.message;
                        form.reset();
                        document.querySelector('.combo__button__text').innerHTML = 'Wybierz usługę';
                        combo__button.setAttribute('value', 'null');
                        break;
                    case 'bad':
                        wyswietlError(response.message);
                        break;
                }
            }
            else{
                wyswietlError('Błąd połączenia z serwerem. Spróbuj ponownie później.');
            }
        }
        xhr.send(params);
    }
}