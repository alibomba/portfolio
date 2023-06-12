// wizualne
const edit_buttons = document.querySelectorAll('.edit-button');
const close_edit_buttons = document.querySelectorAll('.close-button');

edit_buttons.forEach((button)=>{
    button.addEventListener('click', rozwinPola);
});

close_edit_buttons.forEach((button)=>{
    button.addEventListener('click', zwinPola);
});



function rozwinPola(e){
    const container = e.target.closest('.setting__name');
    const edit_button = container.querySelector('.edit-button');
    const close_button = container.querySelector('.close-button');
    const toggle_content = container.closest('.settings__element').querySelector('.toggle-content');

    edit_button.classList.add('invisible');
    close_button.classList.add('active');
    toggle_content.classList.add('active--flex');

}


function zwinPola(e){
    const container = e.target.closest('.setting__name');
    const edit_button = container.querySelector('.edit-button');
    const close_button = container.querySelector('.close-button');
    const toggle_content = container.closest('.settings__element').querySelector('.toggle-content');
    const form = container.closest('form');
    const message = form.querySelector('.message');

    edit_button.classList.remove('invisible');
    close_button.classList.remove('active');
    toggle_content.classList.remove('active--flex');
    message.innerHTML = '';

    form.reset();
}



// formularze i ajax

const login_form = document.querySelector('#login');
const haslo_form = document.querySelector('#haslo');
const weryfikacja_form = document.querySelector('#weryfikacja');
const usun_konto_form = document.querySelector('#usun-konto');
const delete_button = document.querySelector('.delete-button');
const delete_cancel = document.querySelector('.delete-cancel');



login_form.addEventListener('submit',loginChange);
haslo_form.addEventListener('submit', hasloChange);
weryfikacja_form.addEventListener('submit', weryfikacjaChange);
delete_button.addEventListener('click', openDeleteModal);
delete_cancel.addEventListener('click', deleteCancel);
usun_konto_form.addEventListener('submit', usunKonto);


function loginChange(e){
    e.preventDefault();
    const form = e.target;
    const login = document.querySelector('.new-login').value;
    const haslo = document.querySelector('.new-login-haslo').value;
    const message = form.querySelector('.message');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('new_login', login);
    params.append('haslo', haslo);
    xhr.open('POST', 'login-change.php', true)
    xhr.onload = function(){
        const response = JSON.parse(this.responseText);
        switch(response.type){
            case 'good':
                message.classList.add('message-good');
                message.classList.remove('message-bad');
                break;
            case 'bad':
                message.classList.add('message-bad');
                message.classList.remove('message-good');
        }
        message.innerHTML = response.message;
        form.reset();
    };
    xhr.send(params);

}

function hasloChange(e){
    e.preventDefault();
    const form = e.target;
    const current_haslo = document.querySelector('.current_haslo').value;
    const new_haslo = document.querySelector('.new_haslo').value;
    const powtorz_haslo = document.querySelector('.powtorz_haslo').value;
    const message = form.querySelector('.message');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('current_haslo', current_haslo);
    params.append('new_haslo', new_haslo);
    params.append('powtorz_haslo', powtorz_haslo);
    xhr.open('POST', 'haslo-change.php', true);
    xhr.onload = function(){
        const response = JSON.parse(this.responseText);
        switch(response.type){
            case 'good':
                message.classList.add('message-good');
                message.classList.remove('message-bad');
                break;
            case 'bad':
                message.classList.add('message-bad');
                message.classList.remove('message-good');
                break;
        }
        message.innerHTML = response.message;
        form.reset();
    };
    xhr.send(params);
}

function weryfikacjaChange(e){
    e.preventDefault();
    const form = e.target;
    const haslo = document.querySelector('.current_haslo--verify').value;
    const kod_z_maila = document.querySelector('.kod-z-maila').value;
    let on_or_off = form.querySelector('.double-verify-toggle-button').id;
    const message = form.querySelector('.message');
    const button = form.querySelector('.double-verify-toggle-button');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('haslo', haslo);
    params.append('kod_z_maila',kod_z_maila);
    params.append('on_or_off', on_or_off);
    xhr.open('POST', '2el-verify-settings.php', true);
    xhr.onload = function(){
        form.reset();
        const response = JSON.parse(this.responseText);
        switch(response.type){
            case 'good':
                message.classList.add('message-good');
                message.classList.remove('message-bad');
                break;
            case 'bad':
                message.classList.add('message-bad');
                message.classList.remove('message-good');
                break;
        }
        message.innerHTML = response.message;
        if(response.button_content !== ''){
            button.innerHTML = response.button_content;
        }
        if(on_or_off === 'verify--off'){
            on_or_off = 'verify--on';
        }
        else if(on_or_off === 'verify--on'){
            on_or_off = 'verify--off';
        }
        
    };
    xhr.send(params);
}

function openDeleteModal(){
    const modal = document.querySelector('.delete-account-modal');
    const overlay = document.querySelector('.modal-overlay');
    modal.classList.add('delete-account-modal--active');
    overlay.classList.add('modal-overlay--active');
}

function deleteCancel(){
    const modal = document.querySelector('.delete-account-modal');
    const overlay = document.querySelector('.modal-overlay');
    const form = document.querySelector('#usun-konto');
    const message = form.querySelector('.message');

    modal.classList.remove('delete-account-modal--active');
    overlay.classList.remove('modal-overlay--active');
    form.reset();
    message.innerHTML = '';
}

function usunKonto(e){
    e.preventDefault();
    const modal = document.querySelector('.delete-account-modal');
    const overlay = document.querySelector('.modal-overlay');
    const form = e.target;
    const login = document.querySelector('.login--delete').value;
    const haslo = document.querySelector('.current_haslo--delete').value;
    const message = form.querySelector('.message');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('login', login);
    params.append('haslo', haslo);
    xhr.open('POST', 'delete-account.php', true);
    xhr.onload = function(){
        message.innerHTML = this.responseText;
        form.reset();
        modal.classList.remove('delete-account-modal--active');
        overlay.classList.remove('modal-overlay--active');
    };
    xhr.send(params);
}


const verify_toggle_button = document.querySelector('.double-verify-toggle-button');
verify_toggle_button.addEventListener('click', wyslijMaila);

function wyslijMaila(){
    const mail_message = document.querySelector('.mail-message');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('send', true);
    xhr.open('POST', 'wyslij-maila-2el.php', true);
    xhr.onload = function(){
        mail_message.innerHTML = this.responseText;
        setTimeout(()=>{mail_message.innerHTML = '';},3000);
    };
    xhr.send(params);
}