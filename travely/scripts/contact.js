const kontakt_form = document.querySelector('.message');
kontakt_form.addEventListener('submit', wyslijWiadomosc);

function wyslijWiadomosc(e){
    e.preventDefault();
    const form = e.target;
    const temat = form.querySelector('#temat').value;
    const tresc = form.querySelector('#tresc').value;
    const error = form.querySelector('.message__error');
    let zalogowano = new XMLHttpRequest();
    let params = new FormData();
    params.append('sprawdzanie', true);
    zalogowano.open('POST', 'ajax/czy_zalogowano.php', true);
    zalogowano.onload = function(){
        if(this.status==200 && this.responseText!==''){
            if(this.responseText==='zalogowano'){
                if(temat!=='' && tresc!==''){
                    let xhr = new XMLHttpRequest();
                    let params = new FormData();
                    params.append('temat', temat);
                    params.append('tresc', tresc);
                    xhr.open('POST', 'ajax/wyslij_wiadomosc.php', true);
                    xhr.onload = function(){
                        if(this.status==200 && this.responseText==='fine'){
                            error.style.color = 'limegreen';
                            error.innerHTML = 'Wysłano wiadomość do wsparcia strony';
                        }
                    }
                    xhr.send(params);
                }
                else if(temat!=='' && tresc===''){
                    error.style.color = 'red';
                    error.innerHTML = 'Wprowadź treść wiadomości';
                }
                else if(temat==='' && tresc!==''){
                    error.style.color = 'red';
                    error.innerHTML = 'Podaj temat wiadomości';
                }
                else if(temat==='' && tresc===''){
                    error.style.color = 'red';
                    error.innerHTML = 'Podaj temat oraz treść wiadomości';
                }
            }
            else if(this.responseText==='nie zalogowano'){
                error.style.color = 'red';
                error.innerHTML = 'Musisz być zalogowany, aby wysłać wiadomość';
            }
        }
    }
    zalogowano.send(params);
}