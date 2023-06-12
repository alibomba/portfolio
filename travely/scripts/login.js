const eyes = document.querySelectorAll('.haslo-toggle');
eyes.forEach((eye)=>{
    eye.addEventListener('click', togglePasswordVisibility);
});

function togglePasswordVisibility(e){
    const eye = e.target;
    const input = eye.closest('.haslo-input-container').querySelector('.login__inputs__password');

    if(eye.getAttribute('src')==='img/icons/pass-shown-icon.png'){
        eye.setAttribute('src', 'img/icons/pass-hidden-icon.png');
    }
    else{
        eye.setAttribute('src', 'img/icons/pass-shown-icon.png');
    }

    if(input.getAttribute('type')==='text'){
        input.setAttribute('type', 'password');
    }
    else{
        input.setAttribute('type', 'text');
    }
}