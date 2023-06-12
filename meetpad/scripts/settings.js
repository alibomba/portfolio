const setting_edit_buttons = document.querySelectorAll('.edit-icon');
const close_edit_buttons = document.querySelectorAll('.close-edit-icon');
const setting_submit_buttons = document.querySelectorAll('.submit-setting');

setting_edit_buttons.forEach((button)=>{
    button.addEventListener('click', edytujUstawienie);
});

close_edit_buttons.forEach((button)=>{
    button.addEventListener('click', zamknijUstawienie);
});

setting_submit_buttons.forEach((button)=>{
    button.addEventListener('click', zatwierdzUstawienie);
});



function edytujUstawienie(e){
    const container = e.target.closest('.settings__element__right');
    const edit_button = container.querySelector('.edit-icon');
    const setting_name = container.closest('.settings__element').querySelector('.bold').innerHTML;
    const close_button = container.querySelector('.close-edit-icon');
    const submit_button = container.querySelector('.submit-setting');
    const value = container.querySelector('.settings__value');

    edit_button.classList.add('edit-button--invisible');
    close_button.classList.add('close-edit-icon--active');
    submit_button.classList.add('submit-setting--active');

    if(setting_name === 'Opis profilu' || setting_name === 'Numer telefonu (wyświetlany w profilu)' || setting_name === 'Adres e-mail (wyświetlany w profilu)' || setting_name === 'Szkoła' || setting_name === 'Praca' || setting_name === 'Imię' || setting_name === 'Nazwisko' || setting_name === 'E-mail (login)'){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('setting', setting_name);
        params.append('setting-type', 'one');
        xhr.open('POST', 'settings-get-values.php', true);
        xhr.onload = function(){
            value.innerHTML = `<input class="setting__change" type="text" value="${this.responseText}">`;
        };
        xhr.send(params);
    }
    else if(setting_name === 'Miejsce zamieszkania' || setting_name === 'Miejsce urodzenia'){
        const locations_container = container.querySelector('.settings__location-inputs');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('setting', setting_name);
        params.append('setting-type', 'two');
        xhr.open('POST', 'settings-get-values.php', true);
        xhr.onload = function(){
            console.log(this.responseText);
            const response = JSON.parse(this.responseText);
            locations_container.innerHTML = `<input type="text" class="setting__change" placeholder="Miasto" value="${response.miasto}"> <input type="text" class="setting__change" placeholder="Kraj" value="${response.kraj}">`;
        };
        xhr.send(params);
    }
    else if(setting_name === 'Data urodzenia'){
        value.innerHTML = `<input type="date" class="setting__change">`;
    }
}
function zamknijUstawienie(e){
    const container = e.target.closest('.settings__element__right');
    const edit_button = container.querySelector('.edit-icon');
    const setting_name = container.closest('.settings__element').querySelector('.bold').innerHTML;
    const close_button = container.querySelector('.close-edit-icon');
    const submit_button = container.querySelector('.submit-setting');
    const value = container.querySelector('.settings__value');
    
    edit_button.classList.remove('edit-button--invisible');
    close_button.classList.remove('close-edit-icon--active');
    submit_button.classList.remove('submit-setting--active');

    if(setting_name === 'Opis profilu' || setting_name === 'Numer telefonu (wyświetlany w profilu)' || setting_name === 'Adres e-mail (wyświetlany w profilu)' || setting_name === 'Szkoła' || setting_name === 'Praca' || setting_name === 'Imię' || setting_name === 'Nazwisko' || setting_name === 'E-mail (login)'){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('setting', setting_name);
        params.append('setting-type', 'one');
        xhr.open('POST', 'settings-get-values.php', true);
        xhr.onload = function(){
            value.innerHTML = this.responseText==='' ? 'Nie ustawiono' : this.responseText;
        };
        xhr.send(params);
    }
    else if(setting_name === 'Miejsce zamieszkania' || setting_name === 'Miejsce urodzenia'){
        const locations_container = container.querySelector('.settings__location-inputs');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('setting', setting_name);
        params.append('setting-type', 'two');
        xhr.open('POST', 'settings-get-values.php', true);
        xhr.onload = function(){
            const response = JSON.parse(this.responseText);
            if(response.miasto !== '' && response.kraj !== ''){
                locations_container.innerHTML = `<span class="settings__value">${response.miasto}</span><span class="settings__value">${response.kraj}</span>`;
            }
            else{
                locations_container.innerHTML = '<span class="settings__value">Nie ustawiono</span>';
            }
        };
        xhr.send(params);
    }
    else if(setting_name === 'Data urodzenia'){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('setting-type', 'three');
        params.append('setting', setting_name);
        xhr.open('POST', 'settings-get-values.php', true);
        xhr.onload = function(){
            const date = new Date(this.responseText * 1000);
            console.log(date);
            let dzien = date.getDate();
            let miesiac = tlumacz_miesiecy(date.getMonth());
            let rok = date.getFullYear();
            value.innerHTML = `${dzien} ${miesiac} ${rok}`;

        };
        xhr.send(params);
    }
}

function zatwierdzUstawienie(e){
    const container = e.target.closest('.settings__element__right');
    const edit_button = container.querySelector('.edit-icon');
    const setting_name = container.closest('.settings__element').querySelector('.bold').innerHTML;
    const close_button = container.querySelector('.close-edit-icon');
    const submit_button = container.querySelector('.submit-setting');
    const value = container.querySelector('.settings__value');
    const setting_input = container.querySelector('.setting__change');

    if(setting_name==='Miejsce zamieszkania' || setting_name === 'Miejsce urodzenia'){
        const locations_container = container.querySelector('.settings__location-inputs');
        const location_inputs = locations_container.querySelectorAll('input');
        let changed_setting = [];
        location_inputs.forEach((input)=>{
            changed_setting.push(input.value);
        });
        if((changed_setting[0] !== '' && changed_setting[1] === '') || (changed_setting[0] === '' && changed_setting[1] !== '')){
            alert('Oba pola muszą być wypełnione!');
        }
        else{
            let xhr = new XMLHttpRequest();
            let params = new FormData();
            params.append('setting_name', setting_name);
            params.append('miasto', changed_setting[0]);
            params.append('kraj', changed_setting[1]);
            xhr.open('POST', 'change-settings.php', true);
            xhr.onload = function(){
                const response = JSON.parse(this.responseText);
                if(response.miasto !== '' && response.kraj !== ''){
                    locations_container.innerHTML = `<span class="settings__value">${response.miasto}</span><span class="settings__value">${response.kraj}</span>`;
                }
                else{
                    locations_container.innerHTML = '<span class="settings__value">Nie ustawiono</span>';
                }
                edit_button.classList.remove('edit-button--invisible');
                close_button.classList.remove('close-edit-icon--active');
                submit_button.classList.remove('submit-setting--active');
            };
            xhr.send(params);
        }
    }
    else{
        let changed_setting = setting_input.value;
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('setting_name', setting_name);
        params.append('setting', changed_setting);
        xhr.open('POST', 'change-settings.php', true);
        xhr.onload = function(){
            if(setting_name === 'Data urodzenia'){
                const date = new Date(this.responseText * 1000);
                let dzien = date.getDate();
                let miesiac = tlumacz_miesiecy(date.getMonth());
                let rok = date.getFullYear();
                value.innerHTML = `${dzien} ${miesiac} ${rok}`;
            }
            else{
                value.innerHTML = this.responseText==='' ? 'Nie ustawiono' : this.responseText;
            }
            edit_button.classList.remove('edit-button--invisible');
            close_button.classList.remove('close-edit-icon--active');
            submit_button.classList.remove('submit-setting--active');

        };
        xhr.send(params);
    }
}



function tlumacz_miesiecy(miesiac){
    miesiac++;
    let tlumaczenie;
    switch(miesiac){
        case 1:
            tlumaczenie = 'stycznia';
            break;
        case 2:
            tlumaczenie = 'lutego';
            break;
        case 3:
            tlumaczenie = 'marca';
            break;
        case 4:
            tlumaczenie = 'kwietnia';
            break;
        case 5:
            tlumaczenie = 'maja';
            break;
        case 6:
            tlumaczenie = 'czerwca';
            break;
        case 7:
            tlumaczenie = 'lipca';
            break;
        case 8:
            tlumaczenie = 'sierpnia';
            break;
        case 9:
            tlumaczenie = 'września';
            break;
        case 10:
            tlumaczenie = 'października';
            break;
        case 11:
            tlumaczenie = 'listopada';
            break;
        case 12:
            tlumaczenie = 'grudnia';
            break;
    }
    return tlumaczenie;
}





// profile picture change
const pfp_edit = document.querySelector('.edit-icon--pfp');
const pfp_close_edit = document.querySelector('.close-edit-icon--pfp');
const pfp_submit = document.querySelector('.pfp-submit');
const pfp_form = document.querySelector('#pfp-form');
const pfp_input = document.querySelector('#pfp');
const pfp_image = document.querySelector('.pfp--settings');

pfp_edit.addEventListener('click', otworzPfpEdit);

pfp_close_edit.addEventListener('click', zamknijPfpEdit);

pfp_form.addEventListener('submit', submit_pfp);

function otworzPfpEdit(){
    pfp_edit.classList.add('edit-button--invisible');
    pfp_close_edit.classList.add('close-edit-icon--active');
    pfp_submit.classList.add('pfp-submit--active');
}
function zamknijPfpEdit(){
    pfp_edit.classList.remove('edit-button--invisible');
    pfp_close_edit.classList.remove('close-edit-icon--active');
    pfp_submit.classList.remove('pfp-submit--active');
    pfp_form.reset();
}
function submit_pfp(e){
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    for(const file of pfp_input.files){
        params.append('pfp',file);
    }
    xhr.open('POST', 'pfp-change.php', true);
    xhr.onload = function(){
        const response = JSON.parse(this.responseText);
        if(response.error !== ''){
            alert(response.error);
        }
        else{
            pfp_image.setAttribute('src', response.path);
        }
        pfp_edit.classList.remove('edit-button--invisible');
        pfp_close_edit.classList.remove('close-edit-icon--active');
        pfp_submit.classList.remove('pfp-submit--active');
        pfp_form.reset();
    };
    xhr.send(params);
}