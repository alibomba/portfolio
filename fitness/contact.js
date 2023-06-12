const form = document.querySelector('.kontakt');
form.addEventListener('submit', wyslijWiadomosc);

function wyslijWiadomosc(e){
    e.preventDefault();
    const form = e.target;
    const temat = form.querySelector('#temat').value;
    const email = form.querySelector('#email').value;
    const tresc = form.querySelector('#tresc').value;


    if(temat==='' || email==='' || tresc===''){
        alert('Wszystkie pola są obowiązkowe!');
    }
    else{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('temat', temat);
        params.append('email', email);
        params.append('tresc', tresc);
        xhr.open('POST', 'kontakt_send.php', true);
        xhr.onload = function(){
            if(this.status==200 && this.responseText=='Dziala'){
                alert('Pomyślnie wysłano wiadomość!');
                form.reset();
            }
        };
        xhr.send(params);
    }
}