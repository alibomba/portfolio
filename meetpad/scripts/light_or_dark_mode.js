const body = document.querySelector('body');
const modal_overlay = document.querySelector('.modal-overlay');
const edit_profile_button = document.querySelector('.edit-profile-button');
let mode = '';
let src = '';
let darkmode_button_content = '';
const darkmode_toggle = document.querySelector('.darkmode-toggle');
const darkmode_toggle_text = document.querySelector('.darkmode-toggle-text');

if(localStorage.getItem('theme_mode') == 'lightmode' || localStorage.getItem('theme_mode') == 'darkmode'){
    mode = localStorage.getItem('theme_mode');
    if(darkmode_toggle){
        if(localStorage.getItem('theme_mode') == 'darkmode'){
            src = 'img/icons/darkmode-on-icon.png';
            darkmode_button_content = 'Wł.';
        }
        else if(localStorage.getItem('theme_mode') == 'lightmode'){
            src = 'img/icons/darkmode-off-icon.png';
            darkmode_button_content = 'Wył.';
        }
        darkmode_toggle.setAttribute('src',src);
        darkmode_toggle_text.innerHTML = darkmode_button_content;
    }
}
else{
    mode = 'lightmode';
    if(darkmode_toggle){
        darkmode_toggle.setAttribute('src','img/darkmode-off-icon.png');
        darkmode_toggle_text.innerHTML = 'Wył.';
    }
}

window.addEventListener('load', () =>{
    body.classList.add(mode);
});