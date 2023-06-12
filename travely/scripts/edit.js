const konto_form = document.querySelector('.main');
konto_form.addEventListener('submit', zmienInformacje);

function zmienInformacje(e){
    e.preventDefault();
    const form = e.target;
    const imie = form.querySelector('#imie').value;
    const nazwisko = form.querySelector('#nazwisko').value;
    const email = form.querySelector('#email').value;
    const error = form.querySelector('.main__error');

    if(imie!=='' && nazwisko!=='' && email!==''){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('imie', imie);
        params.append('nazwisko', nazwisko);
        params.append('email', email);
        xhr.open('POST', 'ajax/zmien_informacje.php', true);
        xhr.onload = function(){
            if(this.status==200 && this.responseText!==''){
                const response = JSON.parse(this.responseText);
                switch(response.typ){
                    case 'good':
                        error.style.color = 'limegreen';
                        break;
                    case 'bad':
                        error.style.color = 'red';
                        break;
                }
                error.innerHTML = response.info;
                console.log(this.responseText);
            }
        }
        xhr.send(params);
    }
    else{
        error.style.color = 'red';
        error.innerHTML = 'Podaj wszystkie informacje';
    }
}