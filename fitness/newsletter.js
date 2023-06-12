const overlay = document.querySelector('.newsletter-overlay');
const popup_close = document.querySelector('.popup__close');
popup_close.addEventListener('click', wylaczPopupa);
setTimeout(wyswietlPopupa,4000);

function wyswietlPopupa(){
    overlay.classList.add('overlay--active');
}
function wylaczPopupa(){
    overlay.classList.remove('overlay--active');
}

const newsletter_form = document.querySelector('.popup__form');
newsletter_form.addEventListener('submit', wyslijMaila);

function wyslijMaila(e){
    e.preventDefault();
    const form = e.target;
    const mail = form.querySelector('.popup__input').value;
    if(mail==''){
        alert('Proszę podać maila!')
    }
    else{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('mail',mail);
        xhr.open('POST', 'newsletter.php', true);
        xhr.onload = function(){
            if(this.status == 200){
                if(this.responseText == 'git'){
                    alert('Pomyślnie dodano e-mail do bazy danych');
                    wylaczPopupa();
                }
                else if(this.responseText == 'nie git'){
                    alert('E-mail jest nie poprawny!');
                }
                else{
                    alert(this.responseText);
                }
                form.reset();
            }
        }
        xhr.send(params);
    }
}