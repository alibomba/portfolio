const form = document.querySelector('.kontakt__form');
form.addEventListener('submit', wyslijWiadomosc);

function wyslijWiadomosc(e){
    e.preventDefault();
    const form = e.target;
    const imie = form.querySelector('#imie').value;
    const nazwisko = form.querySelector('#nazwisko').value;
    const email = form.querySelector('#email').value;
    const nr_tel = form.querySelector('#nr_tel').value;
    const firma = form.querySelector('#firma').value;
    const temat = form.querySelector('#temat').value;
    const tresc = form.querySelector('#wiadomosc').value;
    const error = form.querySelector('.form__error');
    error.innerHTML = '';
    const popup = document.querySelector('.popup');
    if(imie!==''&&nazwisko!==''&&email!==''&&nr_tel!==''&&temat!==''&&tresc!==''){
        let ok = true;
        let error_text;
        if(!imie.match('[a-zA-Z][a-zA-Z ]{2,}')){
            ok = false;
            error_text = 'Podaj poprawne imię';
        }
        if(!nazwisko.match('[a-zA-Z][a-zA-Z ]{2,}')){
            ok = false;
            error_text = 'Podaj poprawne nazwisko';
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            ok = false;
            error_text = 'Podaj poprawny adres e-mail';
        }
        if(ok){
            let xhr = new XMLHttpRequest();
            let params = new FormData();
            params.append('imie',imie);
            params.append('nazwisko',nazwisko);
            params.append('email', email);
            params.append('nr_tel', nr_tel);
            params.append('firma', firma);
            params.append('temat', temat);
            params.append('tresc',tresc);
            xhr.open('POST', 'ajax/wyslij_wiadomosc.php', true);
            xhr.onload = function(){
                if(this.status===200&&JSON.parse(this.responseText)){
                    const response = JSON.parse(this.responseText);
                    if(response.info!==''&&response.error===''){
                        popup.innerHTML = response.info;
                        popup.style.left = 'calc(50% - '+popup.offsetWidt/2+')';
                        popup.classList.add('popup--active');
                        setTimeout(()=>{
                            popup.classList.remove('popup--active');
                        },3000)
                    }
                    else if(response.info===''&&response.error!==''){
                        error.innerHTML = response.error;
                    }
                }
            }
            xhr.send(params);
        }
        else{
            error.innerHTML = error_text;
        }
    }
    else{
        error.innerHTML = 'Proszę wypełnić wszystkie obowiązkowe pola';
    }
}