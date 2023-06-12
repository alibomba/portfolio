const post_create_input = document.querySelector('.create-post__input');
const comment_create_inputs = document.querySelectorAll('.comment-input');
let mention_string = '';
let mention_dropdown_elements;
let mention_mode;

// post
if(window.location.pathname === '/meetpad/homepage' || window.location.pathname === '/meetpad/'){
    post_create_input.addEventListener('input',oznaczPostStart);
    post_create_input.addEventListener('input',oznaczPostStop);
    post_create_input.addEventListener('keydown',oznaczPostChange);
    post_create_input.addEventListener('keydown', oznaczPostEsc);
}

// post edit
// (w pliku post tooltips)


// komentarz
comment_create_inputs.forEach((input)=>{
    input.addEventListener('input',oznaczKomentarzStart);
});
comment_create_inputs.forEach((input)=>{
    input.addEventListener('input', oznaczKomentarzStop);
});
comment_create_inputs.forEach((input)=>{
    input.addEventListener('keydown', oznaczKomentarzChange);
});
comment_create_inputs.forEach((input)=>{
    input.addEventListener('keydown', oznaczKomentarzEsc);
});







// post
function oznaczPostStart(e){
    if(e.data==='@'){
        const dropdown = document.querySelector('.mention-dropdown--post');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('mention','start');
        xhr.open('POST', 'mention-getvalues.php',true);
        xhr.onload = function(){
            dropdown.innerHTML = '';
            const json = JSON.parse(this.responseText);
            const response = json.znajomi;
            let bottom_value;
            switch(response.length){
                case 1:
                    bottom_value = 133;
                    break;
                case 2:
                    bottom_value = 244;
                    break;
                case 3:
                    bottom_value = 355;
                    break;
                case 4:
                    bottom_value = 466;
                    break;
                case 5:
                    bottom_value = 577;
                    break;
            }
            dropdown.style.bottom = '-'+bottom_value+'px';
            response.forEach((znajomy)=>{
                let element = `<div class="mention-dropdown__element">
                <div class="mention-dropdown__element__top">
                    <img src="${znajomy.profilowe}" alt="${znajomy.full_name}'s profile picture" class="pfp">
                    <span class="mention-name">${znajomy.full_name}</span>
                </div>
                <div class="mention-dropdown__element__bottom">
                    <span class="mention-friends">${znajomy.wspolni_znajomi} wspolnych znajomych</span>
                </div>
              </div>`;
              dropdown.innerHTML = dropdown.innerHTML + element;
            });
            dropdown.classList.add('mention-dropdown--active');
            mention_dropdown_elements = document.querySelectorAll('.mention-dropdown__element');
            mention_dropdown_elements.forEach((element)=>{
                element.addEventListener('click', dodajOznaczenieDoInputa);
            });
            mention_mode = true;
        };
        xhr.send(params);
    }
}
function oznaczPostStop(e){
    if(e.inputType === 'deleteContentBackward' && !e.target.value.includes('@')){
        const dropdown = document.querySelector('.mention-dropdown--post');
        dropdown.classList.remove('mention-dropdown--active');
        mention_string = '';
        mention_mode = false;
    }
}
function oznaczPostEsc(e){
    if(e.key==='Escape'){
        const dropdown = document.querySelector('.mention-dropdown--post');
        dropdown.classList.remove('mention-dropdown--active');
        mention_string = '';
        mention_mode = false;
    }
}


function oznaczPostChange(e){
    if(e.target.value.includes('@') && e.key!=='@' && mention_mode===true){
        if(e.key === 'Backspace'){
            mention_string = mention_string.substring(0,mention_string.length-1);
        }
        else if(e.key.length === 1){
            mention_string = mention_string + e.key;
        }
        const dropdown = document.querySelector('.mention-dropdown--post');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('mention', 'change');
        params.append('mention_string', mention_string);
        xhr.open('POST', 'mention-getvalues.php', true);
        xhr.onload = function(){
            dropdown.innerHTML = '';
            const json = JSON.parse(this.responseText);
            const response = json.znajomi;
            let bottom_value;
            switch(response.length){
                case 1:
                    bottom_value = 133;
                    break;
                case 2:
                    bottom_value = 244;
                    break;
                case 3:
                    bottom_value = 355;
                    break;
                case 4:
                    bottom_value = 466;
                    break;
                case 5:
                    bottom_value = 577;
                    break;
            }
            dropdown.style.bottom = '-'+bottom_value+'px';
            response.forEach((znajomy)=>{
                let element = `<div class="mention-dropdown__element">
                <div class="mention-dropdown__element__top">
                    <img src="${znajomy.profilowe}" alt="${znajomy.full_name}'s profile picture" class="pfp">
                    <span class="mention-name">${znajomy.full_name}</span>
                </div>
                <div class="mention-dropdown__element__bottom">
                    <span class="mention-friends">${znajomy.wspolni_znajomi} wspolnych znajomych</span>
                </div>
              </div>`;
              dropdown.innerHTML = dropdown.innerHTML + element;
            });
            mention_dropdown_elements = document.querySelectorAll('.mention-dropdown__element');
            mention_dropdown_elements.forEach((element)=>{
                element.addEventListener('click', dodajOznaczenieDoInputa);
            });
        };
        xhr.send(params);
    }
}




// edit

function oznaczEditStart(e){
    if(e.data==='@'){
        const input = e.target;
        const container = input.closest('.post__main');
        const dropdown = container.querySelector('.mention-dropdown--edit');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('mention','start');
        xhr.open('POST', 'mention-getvalues.php',true);
        xhr.onload = function(){
            dropdown.innerHTML = '';
            const json = JSON.parse(this.responseText);
            const response = json.znajomi;
            let bottom_value;
            switch(response.length){
                case 1:
                    bottom_value = 43;
                    break;
                case 2:
                    bottom_value = -70;
                    break;
                case 3:
                    bottom_value = -179;
                    break;
                case 4:
                    bottom_value = -290;
                    break;
                case 5:
                    bottom_value = -401;
                    break;
            }
            dropdown.style.bottom = bottom_value+'px';
            response.forEach((znajomy)=>{
                let element = `<div class="mention-dropdown__element">
                <div class="mention-dropdown__element__top">
                    <img src="${znajomy.profilowe}" alt="${znajomy.full_name}'s profile picture" class="pfp">
                    <span class="mention-name">${znajomy.full_name}</span>
                </div>
                <div class="mention-dropdown__element__bottom">
                    <span class="mention-friends">${znajomy.wspolni_znajomi} wspolnych znajomych</span>
                </div>
              </div>`;
              dropdown.innerHTML = dropdown.innerHTML + element;
            });
            dropdown.classList.add('mention-dropdown--active');
            mention_dropdown_elements = document.querySelectorAll('.mention-dropdown__element');
            mention_dropdown_elements.forEach((element)=>{
                element.addEventListener('click', dodajOznaczenieDoInputa);
            });
            mention_mode = true;
        };
        xhr.send(params);
    }
}

function oznaczEditStop(e){
    const input = e.target;
    if(e.inputType === 'deleteContentBackward' && !input.value.includes('@')){
        const dropdown = input.closest('.post').querySelector('.mention-dropdown--edit');
        dropdown.classList.remove('mention-dropdown--active');
        mention_string = '';
        mention_mode = false;
    }
}
function oznaczEditEsc(e){
    const input = e.target;
    if(e.key==='Escape'){
        const dropdown = input.closest('.post').querySelector('.mention-dropdown--edit');
        dropdown.classList.remove('mention-dropdown--active');
        mention_string = '';
        mention_mode = false;
    }
}

function oznaczEditChange(e){
    const input = e.target;
    if(input.value.includes('@') && e.key!=='@' && mention_mode===true){
        if(e.key === 'Backspace'){
            mention_string = mention_string.substring(0,mention_string.length-1);
        }
        else if(e.key.length === 1){
            mention_string = mention_string + e.key;
        }
        const dropdown = input.closest('.post').querySelector('.mention-dropdown--edit');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('mention', 'change');
        params.append('mention_string', mention_string);
        xhr.open('POST', 'mention-getvalues.php', true);
        xhr.onload = function(){
            dropdown.innerHTML = '';
            const json = JSON.parse(this.responseText);
            const response = json.znajomi;
            let bottom_value;
            switch(response.length){
                case 1:
                    bottom_value = 43;
                    break;
                case 2:
                    bottom_value = -70;
                    break;
                case 3:
                    bottom_value = -179;
                    break;
                case 4:
                    bottom_value = -290;
                    break;
                case 5:
                    bottom_value = -401;
                    break;
            }
            dropdown.style.bottom = bottom_value+'px';
            response.forEach((znajomy)=>{
                let element = `<div class="mention-dropdown__element">
                <div class="mention-dropdown__element__top">
                    <img src="${znajomy.profilowe}" alt="${znajomy.full_name}'s profile picture" class="pfp">
                    <span class="mention-name">${znajomy.full_name}</span>
                </div>
                <div class="mention-dropdown__element__bottom">
                    <span class="mention-friends">${znajomy.wspolni_znajomi} wspolnych znajomych</span>
                </div>
              </div>`;
              dropdown.innerHTML = dropdown.innerHTML + element;
            });
            mention_dropdown_elements = document.querySelectorAll('.mention-dropdown__element');
            mention_dropdown_elements.forEach((element)=>{
                element.addEventListener('click', dodajOznaczenieDoInputa);
            });
        };
        xhr.send(params);
    }
}




// komentarz
function oznaczKomentarzStart(e){
    if(e.data==='@'){
        const input = e.target;
        const container = input.closest('.comment-form');
        const dropdown = container.querySelector('.mention-dropdown--comment');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('mention','start');
        xhr.open('POST', 'mention-getvalues.php',true);
        xhr.onload = function(){
            dropdown.innerHTML = '';
            const json = JSON.parse(this.responseText);
            const response = json.znajomi;
            let bottom_value;
            switch(response.length){
                case 1:
                    bottom_value = 135;
                    break;
                case 2:
                    bottom_value = 246;
                    break;
                case 3:
                    bottom_value = 357;
                    break;
                case 4:
                    bottom_value = 468;
                    break;
                case 5:
                    bottom_value = 579;
                    break;
            }
            dropdown.style.bottom = '-'+bottom_value+'px';
            response.forEach((znajomy)=>{
                let element = `<div class="mention-dropdown__element">
                <div class="mention-dropdown__element__top">
                    <img src="${znajomy.profilowe}" alt="${znajomy.full_name}'s profile picture" class="pfp">
                    <span class="mention-name">${znajomy.full_name}</span>
                </div>
                <div class="mention-dropdown__element__bottom">
                    <span class="mention-friends">${znajomy.wspolni_znajomi} wspolnych znajomych</span>
                </div>
              </div>`;
              dropdown.innerHTML = dropdown.innerHTML + element;
            });
            dropdown.classList.add('mention-dropdown--active');
            mention_dropdown_elements = document.querySelectorAll('.mention-dropdown__element');
            mention_dropdown_elements.forEach((element)=>{
                element.addEventListener('click', dodajOznaczenieDoInputa);
            });
            mention_mode = true;
        };
        xhr.send(params);
    }
}

function oznaczKomentarzStop(e){
    const input = e.target;
    if(e.inputType === 'deleteContentBackward' && !input.value.includes('@')){
        const dropdown = input.closest('.comment-form').querySelector('.mention-dropdown--comment');
        dropdown.classList.remove('mention-dropdown--active');
        mention_string = '';
        mention_mode = false;
    }
}
function oznaczKomentarzEsc(e){
    const input = e.target;
    if(e.key==='Escape'){
        const dropdown = input.closest('.comment-form').querySelector('.mention-dropdown--comment');
        dropdown.classList.remove('mention-dropdown--active');
        mention_string = '';
        mention_mode = false;
    }
}

function oznaczKomentarzChange(e){
    const input = e.target;
    if(input.value.includes('@') && e.key!=='@' && mention_mode===true){
        if(e.key === 'Backspace'){
            mention_string = mention_string.substring(0,mention_string.length-1);
        }
        else if(e.key.length === 1){
            mention_string = mention_string + e.key;
        }
        const dropdown = input.closest('.comment-form').querySelector('.mention-dropdown--comment');
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('mention', 'change');
        params.append('mention_string', mention_string);
        xhr.open('POST', 'mention-getvalues.php', true);
        xhr.onload = function(){
            dropdown.innerHTML = '';
            const json = JSON.parse(this.responseText);
            const response = json.znajomi;
            let bottom_value;
            switch(response.length){
                case 1:
                    bottom_value = 135;
                    break;
                case 2:
                    bottom_value = 246;
                    break;
                case 3:
                    bottom_value = 357;
                    break;
                case 4:
                    bottom_value = 468;
                    break;
                case 5:
                    bottom_value = 579;
                    break;
            }
            dropdown.style.bottom = '-'+bottom_value+'px';
            response.forEach((znajomy)=>{
                let element = `<div class="mention-dropdown__element">
                <div class="mention-dropdown__element__top">
                    <img src="${znajomy.profilowe}" alt="${znajomy.full_name}'s profile picture" class="pfp">
                    <span class="mention-name">${znajomy.full_name}</span>
                </div>
                <div class="mention-dropdown__element__bottom">
                    <span class="mention-friends">${znajomy.wspolni_znajomi} wspolnych znajomych</span>
                </div>
              </div>`;
              dropdown.innerHTML = dropdown.innerHTML + element;
            });
            mention_dropdown_elements = document.querySelectorAll('.mention-dropdown__element');
            mention_dropdown_elements.forEach((element)=>{
                element.addEventListener('click', dodajOznaczenieDoInputa);
            });
        };
        xhr.send(params);
    }
}


// klikniecie nazwiska
function insert(main_string, ins_string, pos) {
    if(typeof(pos) == "undefined") {
     pos = 0;
   }
    if(typeof(ins_string) == "undefined") {
     ins_string = '';
   }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}





function dodajOznaczenieDoInputa(e){
    const element = e.target.closest('.mention-dropdown__element');
    const surname = element.querySelector('.mention-name').innerHTML;
    const dropdown = element.closest('.mention-dropdown');
    let input;
    let new_value;
    if(dropdown.classList.contains('mention-dropdown--post')){
        input = element.closest('.create-post__input--container').querySelector('.create-post__input');
    }
    else if(dropdown.classList.contains('mention-dropdown--edit')){
        input = element.closest('.post__main').querySelector('.post-edit-input');
    }
    else if(dropdown.classList.contains('mention-dropdown--comment')){
        input = element.closest('.comment-form').querySelector('.comment-input');
    }
    const input_current_value = input.value;
    let mention_position = input_current_value.search(mention_string);
    if(mention_position === 0){
        mention_position = input.selectionStart;
    }
    mention_position--;
    const mention_string_length = mention_string.length;
    let current_mention = input_current_value.substring(mention_position,mention_position + (mention_string_length + 1));
    if(current_mention==='@'){
        mention_position = input.selectionStart;
        new_value = insert(input_current_value,surname,mention_position);
    }
    else{
        new_value = input_current_value.replace(current_mention,'@'+surname);
    }
    input.value = new_value;
    dropdown.classList.remove('mention-dropdown--active');
    mention_string = '';
    mention_mode = false;
}

