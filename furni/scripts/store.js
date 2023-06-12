// scroll
const pasek_wyboru = document.querySelector('.pasek-wyboru');
const kategoria = document.querySelector('.kat').innerHTML;
const szerokosc = pasek_wyboru.scrollWidth;
if(kategoria==='komody' || kategoria==='biurka' || kategoria==='kanapy'){
    pasek_wyboru.scrollLeft = szerokosc*0.23;
}
else if(kategoria==='krzesla'||kategoria==='lampy'||kategoria==='lustra'){
    pasek_wyboru.scrollLeft = szerokosc*0.47;
}
else if(kategoria==='lozka'||kategoria==='regaly'||kategoria==='stoly'||kategoria==='szafy'){
    pasek_wyboru.scrollLeft = szerokosc;
}
else{
    pasek_wyboru.scrollLeft = 0;
}

let lastScrollTop = 0;
// znikanie obrazkow na scrolla
window.addEventListener('scroll', zmienWidocznoscObrazowLinkow);
function zmienWidocznoscObrazowLinkow(e){
    const obrazki_linkow = document.querySelectorAll('.pasek__link__img');
    var st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > lastScrollTop){
      obrazki_linkow.forEach((obrazek)=>{
        obrazek.style.display = 'none';
      });
   } else {
    obrazki_linkow.forEach((obrazek)=>{
        obrazek.style.display = 'block';
      });
   }
   lastScrollTop = st <= 0 ? 0 : st;
}

// wyszukiwanie
const fraza_get = document.querySelector('.fraza').innerHTML;
const search_submit = document.querySelector('.header__search__icon');
search_submit.addEventListener('click', wyszukajProdukty);
const cena_od = document.querySelector('.cena__input[placeholder="Od"]');
cena_od.addEventListener('input', wyszukajProdukty);
const cena_do = document.querySelector('.cena__input[placeholder="Do"]');
cena_do.addEventListener('input', wyszukajProdukty);
const sortuj = document.querySelector('.sortuj');
sortuj.addEventListener('change', wyszukajProdukty)


function wyszukajProdukty(){
    const fraza_input = document.querySelector('.header__search__input').value;
    const produkty = document.querySelector('.produkty');
    let fraza;
    if(fraza_get!==''){
        fraza = fraza_get;
    }
    if(fraza_input!==''){
        fraza = fraza_input;
    }
    if(fraza_get===''&&fraza_input===''){
        fraza = '';
    }
    const min = cena_od.value;
    const max = cena_do.value;
    const sort = sortuj.options[sortuj.selectedIndex].value;

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('fraza', fraza);
    params.append('min', min);
    params.append('max', max);
    params.append('sort', sort);
    params.append('kategoria', kategoria);
    xhr.open('POST', 'ajax/store_filters.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText!==''){
            produkty.innerHTML = '';
            if(this.responseText==='brak'){
                produkty.innerHTML = '<div class="brak-wynikow">Nie znaleziono produktów</div>';
            }
            else if(JSON.parse(this.responseText)){
                const wyniki = JSON.parse(this.responseText);
                wyniki.forEach((produkt)=>{
                    let xhr = new XMLHttpRequest();
                    let params = new FormData();
                    params.append('id_produktu', produkt.id);
                    xhr.open('POST', 'ajax/if_in_cart_and_favourite.php', true);
                    xhr.onload = function(){
                        if(this.status===200&&this.responseText!==''&&JSON.parse(this.responseText)){
                            const response = JSON.parse(this.responseText);
                            let koszyk_img;
                            let ulubione_img;
                            if(response.koszyk=='true'){
                                koszyk_img = 'delete-from-cart-icon.png';
                            }
                            else{
                                koszyk_img = 'add-to-cart-icon.png';
                            }
                            if(response.ulubione=='true'){
                                ulubione_img = 'filled-heart-icon.png';
                            }
                            else{
                                ulubione_img = 'heart-icon.png';
                            }
                            let xhr = new XMLHttpRequest();
                            let params = new FormData();
                            params.append('id_produktu', produkt.id);
                            xhr.open('POST', 'ajax/check_avg_stars.php', true);
                            xhr.onload = function(){
                                if(this.status===200&&this.responseText!==''){
                                    let gwiazdki = [
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">'
                                    ];
                                    if(this.responseText!=='Brak ocen'){
                                        for(let i=0;i<=parseInt(this.responseText)-1;i++){
                                            gwiazdki[i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">';
                                        }
                                        gwiazdki_string = '';
                                        gwiazdki.forEach((gwiazdka)=>{
                                            gwiazdki_string = gwiazdki_string + gwiazdka;
                                        });
                                    }
                                    else{
                                        gwiazdki_string = 'Brak ocen';
                                    }
                                    const component = 
                                    `
                                        <div class="produkt">
                                            <div class="produkt__top">
                                                <img src="img/products/${produkt.kategoria}/${produkt.nazwa}.png" alt="${produkt.nazwa}" class="produkt__img">
                                                <a href="produkt?id=${produkt.id}" class="produkt__nazwa">${produkt.nazwa}</a>
                                                ${produkt.poprzednia_cena!==null?'<p class="produkt__cena"><span class="produkt__cena__previous">'+produkt.poprzednia_cena+' zł</span>'+produkt.cena+' zł</p>':'<p class="produkt__cena">'+produkt.cena+' zł</p>'}
                                                <div class="produkt__gwiazdki">
                                                    ${gwiazdki_string}
                                                </div>
                                            </div>
                                            <div class="produkt__bottom">
                                                <img onclick="dodajDoKoszyka(event,${produkt.id})" src="img/icons/${koszyk_img}" alt="dodaj do koszyka" class="produkt__bottom__icon">
                                                <img onclick="dodajDoUlubionych(event,${produkt.id})" src="img/icons/${ulubione_img}" alt="serce" class="produkt__bottom__icon">
                                            </div>
                                        </div>
                                    `;
                                    produkty.innerHTML = produkty.innerHTML + component;
                                }
                            }
                            xhr.send(params);
                        }
                    }
                    xhr.send(params);
                });
           }
        }
    }
    xhr.send(params);
}