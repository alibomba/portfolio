// date tooltips

const date_tooltips = document.querySelectorAll('.post__time-ago');

date_tooltips.forEach((tooltip)=>{
    tooltip.addEventListener('mouseover', dateTooltipOn);
    tooltip.addEventListener('mouseout', dateTooltipOff);
});




function dateTooltipOn(e){
    let date_tooltip = e.target.closest('.post__author-info__text__bottom').querySelector('.date-tooltip');

    date_tooltip.classList.add('date-tooltip--active');
}



function dateTooltipOff(e){
    let date_tooltip = e.target.closest('.post__author-info__text__bottom').querySelector('.date-tooltip');

    date_tooltip.classList.remove('date-tooltip--active');
}



// like button tooltips
const like_buttons = document.querySelectorAll('.post__like-button');
const buttons_containers = document.querySelectorAll('.post__reactions-buttons');

like_buttons.forEach((button)=>{
    button.addEventListener('mouseenter', openreactionButtons);
});

buttons_containers.forEach((container)=>{
    container.addEventListener('mouseleave', closereactionButtons);
});

function openreactionButtons(e){
    let tooltip = e.target.closest('.post__like-button--container').querySelector('.post__reactions-buttons');
        tooltip.classList.add('post__reactions-buttons--active');
    
}
function closereactionButtons(e){
    let tooltip = e.target;
    
    
    tooltip.classList.remove('post__reactions-buttons--active');
}


// reactions numbers
const post_reactions_containers = document.querySelectorAll('.post__reactions-number');

post_reactions_containers.forEach((container)=>{
    container.addEventListener('mouseenter', openReactions);
    container.addEventListener('mouseleave', closeReactions);
});

function openReactions(e){
    let tooltip = e.target.querySelector('.reactions-details');

    tooltip.classList.add('reactions-details--active');
}
function closeReactions(e){
    let tooltip = e.target.querySelector('.reactions-details');

    tooltip.classList.remove('reactions-details--active');  
}



// comments
const comment_buttons = document.querySelectorAll('.post__comment-button');
const comment_close_buttons = document.querySelectorAll('.comments__close-button');

comment_buttons.forEach((button)=>{
    button.addEventListener('click', openComments);
});

comment_close_buttons.forEach((button)=>{
    button.addEventListener('click', closeComments);
});

function openComments(e){
    const tooltip = e.target.closest('.post').querySelector('.comments-tooltip');
    
    tooltip.classList.add('comments-tooltip--active');
}

function closeComments(e){
    const tooltip = e.target.closest('.comments-tooltip');

    tooltip.classList.remove('comments-tooltip--active');
}



// profile overview on hover
const post__authors = document.querySelectorAll('.post__author');


post__authors.forEach((author)=>{
    author.addEventListener('mouseenter', overviewOn);
});
post__authors.forEach((author)=>{
    author.addEventListener('mouseleave', overviewOff);
});


function overviewOn(e){
    const hovered = e.target;
    const overview = hovered.closest('.post__author-info__text').querySelector('.profile-overview');
    const post_id = hovered.closest('.post').id.substring(5);
    const znajomi = overview.querySelector('.profile-overview__znajomi');
    const wspolni_znajomi = overview.querySelector('.profile-overview__wspolni-znajomi');
    const autor = overview.querySelector('.profile-overview__author');


    // ajax
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('postid',post_id);
    xhr.open('POST', 'overview-tooltip.php', true);
    xhr.onload = function(){
        const response = JSON.parse(this.responseText);
        autor.innerHTML = response.autor;
        znajomi.innerHTML = response.znajomi;
        wspolni_znajomi.innerHTML = response.wspolniznajomi;
    };
    xhr.send(params);






    // visual
    if(e.clientY<600){
        overview.classList.remove('profile-overview--at-bottom');
        overview.classList.add('profile-overview--at-top');
    }
    else{
        overview.classList.remove('profile-overview--at-top');
        overview.classList.add('profile-overview--at-bottom');
    }
    overview.classList.add('profile-overview--active');
}

function overviewOff(e){
    const unhovered = e.target;
    const overview = unhovered.closest('.post__author-info__text').querySelector('.profile-overview');
    overview.classList.remove('profile-overview--active');
}








// post options
const more_buttons = document.querySelectorAll('.more-icon');
const close_options_buttons = document.querySelectorAll('.options-dropdown-close');

more_buttons.forEach((button)=>{
    button.addEventListener('click', rozwinOptions);
});

close_options_buttons.forEach((button)=>{
    button.addEventListener('click', zwinOptions);
});

function rozwinOptions(e){
    const clicked = e.target;
    const header = clicked.closest('.post__header');
    const dropdown = header.querySelector('.post-options');

    if(e.clientY<640){
        dropdown.classList.remove('post-options--at-bottom');
        dropdown.classList.add('post-options--at-top');
    }
    else{
        dropdown.classList.remove('post-options--at-top');
        dropdown.classList.add('post-options--at-bottom');
    }
    dropdown.classList.add('post-options--active');
}

function zwinOptions(e){
    const clicked = e.target;
    const dropdown = clicked.closest('.post-options');

    dropdown.classList.remove('post-options--active');
}



// zapisz post
const save_post_buttons = document.querySelectorAll('.save-post-button');

save_post_buttons.forEach((button)=>{
    button.addEventListener('click', zapiszPost);
});


function zapiszPost(e){
    const clicked = e.target.closest('.post-options').querySelector('.save-post-button');
    const postid = clicked.closest('.post').id.substring(5);
    const button_content = clicked.querySelector('.save-button__content');
    const popup = clicked.closest('.post__header').querySelector('.post-saved-popup');
    const post = clicked.closest('.post');
    
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('postid', postid);
    xhr.open('POST', 'save-post.php', true);
    xhr.onload = function(){
        const response = JSON.parse(this.responseText);
        button_content.innerHTML = response.button_content;
        popup.innerHTML = response.message;
        if(window.location.pathname === '/meetpad/zapisane' && response.message === 'Post został usunięty z zapisanych.'){
            post.style.display = 'none';
        }
        popup.classList.add('post-saved-popup--active');
        setTimeout(()=>{popup.classList.remove('post-saved-popup--active')}, 1500);
    };
    xhr.send(params);
}





// włacz powiadomienia

// tutaj bedzie wlaczanie powiadomien od danego uzytkownika

// koniec





// ukryj post
const post_hide_buttons = document.querySelectorAll('.hide-post-button');

post_hide_buttons.forEach((button)=>{
    button.addEventListener('click', ukryjPost);
});

function ukryjPost(e){
    const clicked = e.target;
    const post = clicked.closest('.post');
    const postid = post.id.substring(5);

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('postid', postid);
    xhr.open('POST', 'hide-post.php', true);
    xhr.onload = function(){
        post.style.display = 'none';
    };
    xhr.send(params);
}




// zglos post
const post_report_buttons = document.querySelectorAll('.report-post-button');
const modal_overlay_report = document.querySelectorAll('.modal-overlay--report');

modal_overlay_report.forEach((overlay)=>{
    overlay.addEventListener('click', zglosPostModalOff);
});
modal_overlay_report.forEach((overlay)=>{
    overlay.addEventListener('click', usunPostAnuluj);
});

post_report_buttons.forEach((button)=>{
    button.addEventListener('click', zglosPostModal);
});

// visual
function zglosPostModal(e){
    const clicked = e.target;
    const post = clicked.closest('.post');
    const modal_overlay = post.querySelector('.modal-overlay--report');
    const modal = post.querySelector('.report-post-modal');
    const dropdown = post.querySelector('.post-options');

    dropdown.classList.remove('post-options--active');
    modal_overlay.classList.add('modal--report--active');
    modal.classList.add('modal--report--active');
}

function zglosPostModalOff(e){
    const overlay = e.target;
    const modal = overlay.closest('.post').querySelector('.report-post-modal');
    const form = overlay.closest('.post').querySelector('.post_report_form');

    overlay.classList.remove('modal--report--active');
    modal.classList.remove('modal--report--active');
    form.reset();

}
// ajax i zglaszanie

const report_form = document.querySelectorAll('.post_report_form');

report_form.forEach((form)=>{
    form.addEventListener('submit', zglosPost);
});

function zglosPost(e){
    e.preventDefault();
    const form = e.target;
    const postid = form.closest('.post').id.substring(5);
    const content = form.querySelector('.report_content').value;
    const modal = form.closest('.report-post-modal');
    const overlay = form.closest('.post').querySelector('.modal-overlay--report');
    const popup = form.closest('.post__header').querySelector('.post-saved-popup');

    if(content===''){
        alert('Napisz zgłoszenie!');
    }
    else{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('postid', postid);
        params.append('content', content);
        xhr.open('POST', 'post-report.php', true);
        xhr.onload = function(){
            form.reset();
            modal.classList.remove('modal--report--active');
            overlay.classList.remove('modal--report--active');
            popup.innerHTML = this.responseText;
            popup.classList.add('post-saved-popup--active');
            setTimeout(()=>{popup.classList.remove('post-saved-popup--active')}, 1500);
        };
        xhr.send(params);
    }
}





// edytuj post

// get values
const post_edit_buttons = document.querySelectorAll('.post-edit-button');

post_edit_buttons.forEach((button)=>{
    button.addEventListener('click', edytujPost);
});

function edytujPost(e){
    const clicked = e.target;
    const post_content = clicked.closest('.post').querySelector('.post__content__text');
    const postid = clicked.closest('.post').id.substring(5);
    const options = clicked.closest('.post').querySelector('.post-options');
    const confirm = clicked.closest('.post').querySelector('.confirm-post-edit');
    const stop = clicked.closest('.post').querySelector('.stop-editing-post');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('postid', postid);
    xhr.open('POST', 'post-edit-getcontent.php',true);
    xhr.onload = function(){
        post_content.innerHTML = `<input class="post-edit-input" type="text" value="${this.responseText}">`;
        const post_edit_inputs = document.querySelectorAll('.post-edit-input');
        post_edit_inputs.forEach((input)=>{
            input.addEventListener('input',oznaczEditStart);
        });
        post_edit_inputs.forEach((input)=>{
            input.addEventListener('input',oznaczEditStop);
        });
        post_edit_inputs.forEach((input)=>{
            input.addEventListener('keydown',oznaczEditChange);
        });
        post_edit_inputs.forEach((input)=>{
            input.addEventListener('keydown', oznaczEditEsc);
        });
        options.classList.remove('post-options--active')
        confirm.classList.add('edit--active');
        stop.classList.add('edit--active');
    };
    xhr.send(params);
}


// potwierdz albo odrzuc
const edit_confirm_buttons = document.querySelectorAll('.confirm-post-edit');
const stop_editing_post_buttons = document.querySelectorAll('.stop-editing-post');

edit_confirm_buttons.forEach((button)=>{
    button.addEventListener('click', postEditConfirm);
});
stop_editing_post_buttons.forEach((button)=>{
    button.addEventListener('click', postEditClose);
});



function postEditConfirm(e){
    const container = e.target.closest('.post__content');
    const changed_content = container.querySelector('.post-edit-input').value;
    const postid = container.closest('.post').id.substring(5);
    const text = container.querySelector('.post__content__text');
    const confirm = container.querySelector('.confirm-post-edit');
    const stop = container.querySelector('.stop-editing-post');

    

    if(changed_content === ''){
        alert('Post nie może być pusty!');
    }
    else{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('postid', postid);
        params.append('changed_content',changed_content);
        xhr.open('POST', 'post-edit-changecontent.php', true);
        xhr.onload = function(){
            text.innerHTML = changed_content;
            confirm.classList.remove('edit--active');
            stop.classList.remove('edit--active');
        };
        xhr.send(params);
    }
}


function postEditClose(e){
    const container = e.target.closest('.post__content');
    const text = container.querySelector('.post__content__text');
    const postid = container.closest('.post').id.substring(5);
    const confirm = container.closest('.post').querySelector('.confirm-post-edit');
    const stop = container.closest('.post').querySelector('.stop-editing-post');
    const mentions = container.closest('.post').querySelector('.mention-dropdown--edit');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('postid',postid);
    xhr.open('POST','post-edit-getcontent.php',true);
    xhr.onload = function(){
        text.innerHTML = this.responseText;
        confirm.classList.remove('edit--active');
        stop.classList.remove('edit--active');
        mentions.classList.remove('mention-dropdown--active');
        mention_string = '';
        mention_mode = false;
    };
    xhr.send(params);
}






// zmien widocznosc
const private_change_buttons = document.querySelectorAll('.private-change-button');

private_change_buttons.forEach((button)=>{
    button.addEventListener('click', zmienWidocznosc);
});

function zmienWidocznosc(e){
    const post = e.target.closest('.post');
    const postid = post.id.substring(5);
    const widocznosc_icon_path = post.querySelector('.public-icon');
    const public_path = 'M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771';
    const private_path = 'M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z';

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('postid',postid);
    xhr.open('POST', 'change-post-privacy.php',true);
    xhr.onload = function(){
        switch(this.responseText){
            case 'public':
                widocznosc_icon_path.setAttribute('d',public_path);
                break;
            case 'private':
                widocznosc_icon_path.setAttribute('d',private_path);
                break;
        }
    };
    xhr.send(params);
}




// usun post
const post_delete_buttons = document.querySelectorAll('.delete-post-button');
const post_delete_cancel_buttons = document.querySelectorAll('.delete-cancel');

post_delete_cancel_buttons.forEach((button)=>{
    button.addEventListener('click',usunPostAnuluj);
});

post_delete_buttons.forEach((button)=>{
    button.addEventListener('click',usunPostModal);
});

function usunPostModal(e){
    const post = e.target.closest('.post');
    const modal = post.querySelector('.delete-post-modal');
    const overlay = post.querySelector('.modal-overlay--report');
    const options = post.querySelector('.post-options');

    modal.classList.add('modal--report--active');
    overlay.classList.add('modal--report--active');
    options.classList.remove('post-options--active');
}


function usunPostAnuluj(e){
    const post = e.target.closest('.post');
    const overlay = post.querySelector('.modal-overlay--report');
    const modal = post.querySelector('.delete-post-modal');

    overlay.classList.remove('modal--report--active');
    modal.classList.remove('modal--report--active');
}



const post_delete_forms = document.querySelectorAll('.post_delete_form');

post_delete_forms.forEach((form)=>{
    form.addEventListener('submit',usunPost);
});

function usunPost(e){
    e.preventDefault();
    const form = e.target;
    const postid = form.closest('.post').id.substring(5);
    const post = form.closest('.post');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('postid', postid);
    xhr.open('POST', 'delete-post.php', true);
    xhr.onload = function(){
        post.style.display = 'none';
    };
    xhr.send(params);
}