function kupPakiet(e,id){
    const error = document.querySelector('.right__error');
    let zalogowano = new XMLHttpRequest();
    let params = new FormData();
    params.append('sprawdzanie',true)
    zalogowano.open('POST', 'ajax/czy_zalogowano.php', true);
    zalogowano.onload = function(){
        if(this.status == 200 && this.responseText !== ''){
            if(this.responseText==='zalogowano'){
                let xhr = new XMLHttpRequest();
                let params = new FormData();
                params.append('id_produktu',id);
                xhr.open('POST', 'ajax/kup_package.php', true);
                xhr.onload = function(){
                    if(this.status === 200 && this.responseText==='kupiono'){
                        error.style.color = 'limegreen';
                        error.innerHTML = 'Produkt został zakupiony';
                    }
                }
                xhr.send(params);
            }
            else if(this.responseText==='nie zalogowano'){
                error.style.color = 'red';
                error.innerHTML = 'Musisz być zalogowany!';
            }
        }
    }
    zalogowano.send(params);
}