// dodaj do koszyka
function dodajProduktDoKoszyka(e,id_produktu){
    const button = e.target;
    const popup = document.querySelector('.popup');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_produktu', id_produktu);
    xhr.open('POST', 'ajax/add_to_cart.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''){
            switch(this.responseText){
                case 'nie zalogowano':
                    popup.innerHTML = 'Musisz być zalogowany';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
                case 'dodano':
                    popup.innerHTML = 'Dodano produkt do koszyka';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    button.innerHTML = 'Usuń z koszyka';
                    break;
                case 'usunieto':
                    popup.innerHTML = 'Usunięto produkt z koszyka';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    button.innerHTML = 'Dodaj do koszyka';
                    break;
                default:
                    popup.innerHTML = 'Niezidentyfikowany błąd';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
            }
        }
    }
    xhr.send(params);
}

// dodaj do ulubionych
function dodajProduktDoUlubionych(e,id_produktu){
    const button = e.target;
    const popup = document.querySelector('.popup');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_produktu', id_produktu);
    xhr.open('POST', 'ajax/add_to_favourite.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''){
            switch(this.responseText){
                case 'nie zalogowano':
                    popup.innerHTML = 'Musisz być zalogowany';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
                case 'dodano':
                    popup.innerHTML = 'Dodano produkt do ulubionych';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    button.innerHTML = 'Usuń z ulubionych';
                    break;
                case 'usunieto':
                    popup.innerHTML = 'Usunięto produkt z ulubionych';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    button.innerHTML = 'Dodaj do ulubionych';
                    break;
                default:
                    popup.innerHTML = 'Niezidentyfikowany błąd';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
            }
        }
    }
    xhr.send(params);
}

// zmien liczbe gwiazdek w komentarzu
const napisz__gwiazdki = document.querySelectorAll('.napisz__star');
napisz__gwiazdki.forEach((gwiazdka)=>{
    gwiazdka.addEventListener('click', wypelnijGwiazdki);
});

function wypelnijGwiazdki(e){
    const gwiazdka = e.target;
    const container = gwiazdka.closest('.napisz__bottom__left__stars');
    const gwiazdki_array = Array.from(document.querySelectorAll('.napisz__star'));
    const numer_gwiazdki = gwiazdki_array.indexOf(gwiazdka);
    let gwiazdki = [
        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">',
        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">',
        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">',
        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">',
        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">'
    ];
    for(let i=0; i<=numer_gwiazdki; i++){
        gwiazdki[i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="napisz__star">';
    }
    container.innerHTML = '';
    gwiazdki.forEach((element)=>{
        container.innerHTML = container.innerHTML + element;
    });
    document.querySelectorAll('.napisz__star').forEach((gwiazda)=>{
        gwiazda.addEventListener('click', wypelnijGwiazdki);
    });
}

// napisz komentarz
const napisz_form = document.querySelector('.napisz');
napisz_form.addEventListener('submit', napiszKomentarz);

function napiszKomentarz(e){
    e.preventDefault();
    const form = e.target;
    const tresc = form.querySelector('.napisz__input').value;
    const ile_gwiazdek = Array.from(form.querySelectorAll('.napisz__star')).filter(x=>x.getAttribute('src')==='img/icons/filled-star-icon.png').length;
    const id_produktu = document.querySelector('.id_produktu').innerHTML;
    const popup = document.querySelector('.popup');
    const komentarze_heading = document.querySelector('.komentarze__heading');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('tresc', tresc);
    params.append('ile_gwiazdek', ile_gwiazdek);
    params.append('id_produktu', id_produktu);
    xhr.open('POST', 'ajax/napisz_komentarz.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''&&JSON.parse(this.responseText)){
            const response = JSON.parse(this.responseText);
            if(response.error!==''){
                popup.innerHTML = response.error;
                popup.style.left = 'calc(50% - '+popup.offsetWidth/2+')';
                popup.classList.add('popup--active');
                setTimeout(()=>{
                    popup.classList.remove('popup--active');
                },3000);
            }
            else{
                if(document.querySelector('.brak-komentarzy')!==null){
                    document.querySelector('.brak-komentarzy').remove();
                }
                let gwiazdki = [
                    '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                    '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                    '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                    '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                    '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">'
                ];
                const liczba_gwiazdek = parseInt(response.ile_gwiazdek);
                for(let i=0;i<=liczba_gwiazdek-1;i++){
                    gwiazdki[i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="komentarz__star">';
                }
                let gwiazdki_string = '';
                gwiazdki.forEach((gwiazdka)=>{
                    gwiazdki_string = gwiazdki_string+gwiazdka;
                });
                const komentarz = `
                <article class="komentarze__komentarz">
                    <div class="komentarz__top">
                        <div class="komentarz__top__left">
                            <p class="komentarz__autor">${response.autor}</p>
                            <div class="komentarz__top__left__stars">
                                ${gwiazdki_string}    
                            </div>
                        </div>
                        <div class="komentarz__top__right">
                            <p class="komentarz__data">${response.data_dodania}</p>
                            <img src="img/icons/comment-delete-icon.png" alt="kosz" class="komentarz__delete" onclick="usunKomentarz(event,${response.id_komentarza})">
                        </div>
                    </div>
                    <p class="komentarz__tresc">${response.tresc}</p>
                    <div class="komentarz__bottom">
                        <div class="komentarz__bottom__element">
                            <img onclick="dodajLike(event,${response.id_komentarza})" src="img/icons/like-icon.png" alt="like" class="komentarz__bottom__like">
                            <p class="komentarz__bottom__number">0</p>
                        </div>
                        <div class="komentarz__bottom__element">
                            <img onclick="dodajDislike(event,${response.id_komentarza})" src="img/icons/dislike-icon.png" alt="dislike" class="komentarz__bottom__dislike">
                            <p class="komentarz__bottom__number">0</p>
                        </div>
                    </div>
                </article>
                `;
                komentarze_heading.insertAdjacentHTML('afterend',komentarz);
                popup.innerHTML = 'Opublikowano komentarz';
                popup.style.left = 'calc(50% - '+popup.offsetWidth/2+')';
                popup.classList.add('popup--active');
                setTimeout(()=>{
                    popup.classList.remove('popup--active');
                },3000);
                form.reset();
            }
        }
    }
    xhr.send(params);
}

// daj like do komentarza
function dodajLike(e,id_komentarza){
    const like_button = e.target;
    const licznik_like = like_button.nextElementSibling;
    const dislike_button = like_button.closest('.komentarz__bottom').querySelector('.komentarz__bottom__dislike');
    const licznik_dislike = dislike_button.nextElementSibling;
    const popup = document.querySelector('.popup');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_komentarza', id_komentarza);
    params.append('typ', 'like');
    xhr.open('POST', 'ajax/dodaj_reakcje.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''){
            switch(this.responseText){
                case 'nie zalogowano':
                    popup.innerHTML = 'Musisz być zalogowany';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
                case 'dodano':
                    like_button.setAttribute('src', 'img/icons/filled-like-icon.png');
                    licznik_like.innerHTML = parseInt(licznik_like.innerHTML)+1;
                    break;
                case 'usunieto':
                    like_button.setAttribute('src', 'img/icons/like-icon.png');
                    licznik_like.innerHTML = parseInt(licznik_like.innerHTML)-1;
                    break;
                case 'usunieto i dodano':
                    dislike_button.setAttribute('src', 'img/icons/dislike-icon.png');
                    licznik_dislike.innerHTML = parseInt(licznik_dislike.innerHTML)-1;
                    like_button.setAttribute('src', 'img/icons/filled-like-icon.png');
                    licznik_like.innerHTML = parseInt(licznik_like.innerHTML)+1;
                    break;
                default:
                    popup.innerHTML = 'Niezidentyfikowany błąd';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
            }
        }
    }
    xhr.send(params);
}

// daj dislike do komentarza
function dodajDislike(e,id_komentarza){
    const dislike_button = e.target;
    const licznik_dislike = dislike_button.nextElementSibling;
    const like_button = dislike_button.closest('.komentarz__bottom').querySelector('.komentarz__bottom__like');
    const licznik_like = like_button.nextElementSibling;
    const popup = document.querySelector('.popup');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_komentarza', id_komentarza);
    params.append('typ', 'dislike');
    xhr.open('POST', 'ajax/dodaj_reakcje.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''){
            switch(this.responseText){
                case 'nie zalogowano':
                    popup.innerHTML = 'Musisz być zalogowany';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
                case 'dodano':
                    dislike_button.setAttribute('src', 'img/icons/filled-dislike-icon.png');
                    licznik_dislike.innerHTML = parseInt(licznik_dislike.innerHTML)+1;
                    break;
                case 'usunieto':
                    dislike_button.setAttribute('src', 'img/icons/dislike-icon.png');
                    licznik_dislike.innerHTML = parseInt(licznik_dislike.innerHTML)-1;
                    break;
                case 'usunieto i dodano':
                    like_button.setAttribute('src', 'img/icons/like-icon.png');
                    licznik_like.innerHTML = parseInt(licznik_like.innerHTML)-1;
                    dislike_button.setAttribute('src', 'img/icons/filled-dislike-icon.png');
                    licznik_dislike.innerHTML = parseInt(licznik_dislike.innerHTML)+1;
                    break;
                default:
                    popup.innerHTML = 'Niezidentyfikowany błąd';
                    popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
                    popup.classList.add('popup--active');
                    setTimeout(()=>{
                        popup.classList.remove('popup--active');
                    },3000)
                    break;
            }
        }
    }
    xhr.send(params);
}

// usun komentarz
function usunKomentarz(e,id_komentarza){
    const popup = document.querySelector('.popup');
    const komentarz = e.target.closest('.komentarze__komentarz');
    const komentarze_container = document.querySelector('.komentarze');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_komentarza', id_komentarza);
    xhr.open('POST', 'ajax/usun_komentarz.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText==='usunieto'){
            komentarz.classList.add('komentarze__komentarz--deleted');
            setTimeout(()=>{
                komentarz.remove();
                if(komentarze_container.childElementCount===1){
                    komentarze_container.innerHTML = komentarze_container.innerHTML + '<div class="brak-komentarzy">Brak komentarzy</div>';
                }
            },250)
            popup.innerHTML = 'Usunięto komentarz';
            popup.style.left = 'calc(50%-'+popup.offsetWidth/2+')';
            popup.classList.add('popup--active');
            setTimeout(()=>{
                popup.classList.remove('popup--active');
            },3000);
        }
    }
    xhr.send(params);
}