'use strict';
// rozwijanie headera
const hamburger_button = document.querySelector('.header--mobile__hamburger');
hamburger_button.addEventListener('click', headerToggle);

function headerToggle(e){
    const button = e.target.classList.contains('header--mobile__hamburger') ? e.target : e.target.closest('.header--mobile__hamburger');
    const header_content = document.querySelector('.header--mobile__content');
    if(header_content.style.visibility == 'hidden'){
        header_content.style.visibility = 'visible';
    }
    button.classList.toggle('header--mobile__hamburger--active');
    header_content.classList.toggle('header--mobile__content--active');
    if(!header_content.classList.contains('header--mobile__content--active')){
        setTimeout(()=>{
            header_content.style.visibility = 'hidden';
        },150)
    }
}