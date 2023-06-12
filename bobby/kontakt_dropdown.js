const kontakt_button = document.querySelector('.header__kontakt');
kontakt_button.addEventListener('click', rozwinKontakt);

const kontakt_button_close = document.querySelector('.close-kontakt-dropdown');
kontakt_button_close.addEventListener('click', zwinKontakt);


function rozwinKontakt(e){
    const dropdown = e.target.nextSibling.nextSibling;
    dropdown.classList.toggle('kontakt-dropdown--active');
}


function zwinKontakt(e){
    const dropdown = e.target.closest('.kontakt-dropdown');
    dropdown.classList.remove('kontakt-dropdown--active');
}