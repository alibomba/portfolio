const oczy = document.querySelectorAll('.haslo-eye');
oczy.forEach((oko)=>{
    oko.addEventListener('click', zmienWidocznoscHasla);
});

function zmienWidocznoscHasla(e){
    const oko = e.target;
    const input = oko.closest('.haslo-container').querySelector('.haslo-input');
    if(input.getAttribute('type')==='password'){
        input.setAttribute('type', 'text');
        oko.setAttribute('src', 'img/icons/shown-password-icon.svg');
    }
    else if(input.getAttribute('type')==='text'){
        input.setAttribute('type', 'password');
        oko.setAttribute('src', 'img/icons/hidden-password-icon.svg');
    }
}