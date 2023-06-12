// wypisywanie produktow
if(localStorage.getItem('koszyk')!==null && localStorage.getItem('koszyk')!=='' && JSON.parse(localStorage.getItem('koszyk')).length!==0){
    const array = JSON.parse(localStorage.getItem('koszyk'));
    let produkty = document.querySelector('.produkty');
    array.forEach((produkt)=>{
       produkty.innerHTML = produkty.innerHTML + `<div class="product" id="pr-${produkt.idproduktu}">
       <div class="product__left">
           <img class="product__img" src="${produkt.obraz}" alt="${produkt.nazwa}'s picture">
           <p class="product__name">${produkt.nazwa}</p>
           <div class="product__switches">
               <svg class="product__minus" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg>
               <p class="product__amount">${produkt.ilosc}</p>
               <svg class="product__plus" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
           </div>
       </div>
       <div class="product__right">
           <p class="product__price">${produkt.cena*produkt.ilosc}</p>
           <img class="product__delete" src="img/icons/delete-icon.png" alt="delete icon">
       </div>
   </div>`;
    });
}
else{
    document.querySelector('main').innerHTML = '<p class="brak">Brak przedmiotów w koszyku</p>';
}

// odejmowanie ilosci
const minus_buttons = document.querySelectorAll('.product__minus');
minus_buttons.forEach((button)=>{
    button.addEventListener('click', odejmijIlosc);
})

function odejmijIlosc(e){
    const product = e.target.closest('.product');
    const idproduktu = product.id.substr(3);
    let ilosc = product.querySelector('.product__amount');
    let cena = product.querySelector('.product__price');
    let koszyk = JSON.parse(localStorage.getItem('koszyk'));
    let index_of_product = koszyk.findIndex((element)=>element.idproduktu==idproduktu);
    koszyk[index_of_product].ilosc = koszyk[index_of_product].ilosc - 1;
    if(koszyk[index_of_product].ilosc==0){
        koszyk.splice(index_of_product,1);
        const element = document.querySelector(`#pr-${idproduktu}`);
        element.remove();
        localStorage.setItem('koszyk', JSON.stringify(koszyk));
        if(document.querySelector('.produkty').innerHTML==''){
            document.querySelector('main').innerHTML = '<p class="brak">Brak przedmiotów w koszyku</p>';
        }
    }
    else{
        ilosc.innerHTML = koszyk[index_of_product].ilosc;
        cena.innerHTML = koszyk[index_of_product].ilosc * koszyk[index_of_product].cena;
        localStorage.setItem('koszyk', JSON.stringify(koszyk));
    }
}

// dodawanie ilosci
const plus_buttons = document.querySelectorAll('.product__plus');
plus_buttons.forEach((button)=>{
    button.addEventListener('click', dodajIlosc);
});

function dodajIlosc(e){
    const product = e.target.closest('.product');
    const idproduktu = product.id.substr(3);
    let ilosc = product.querySelector('.product__amount');
    let cena = product.querySelector('.product__price');
    let koszyk = JSON.parse(localStorage.getItem('koszyk'));
    let index_of_product = koszyk.findIndex((element)=>element.idproduktu==idproduktu);
    koszyk[index_of_product].ilosc = koszyk[index_of_product].ilosc + 1;
        ilosc.innerHTML = koszyk[index_of_product].ilosc;
        cena.innerHTML = koszyk[index_of_product].ilosc * koszyk[index_of_product].cena;
        localStorage.setItem('koszyk', JSON.stringify(koszyk));
}

// usuwanie produktu
const delete_buttons = document.querySelectorAll('.product__delete');
delete_buttons.forEach((button)=>{
    button.addEventListener('click', usunProdukt);
});

function usunProdukt(e){
    const product = e.target.closest('.product');
    const idproduktu = product.id.substr(3);
    let koszyk = JSON.parse(localStorage.getItem('koszyk'));
    let index_of_product = koszyk.findIndex((element)=>element.idproduktu==idproduktu);
    koszyk.splice(index_of_product,1);
    localStorage.setItem('koszyk', JSON.stringify(koszyk));
    const element = document.querySelector(`#pr-${idproduktu}`);
    element.remove();
    if(document.querySelector('.produkty').innerHTML==''){
        document.querySelector('main').innerHTML = '<p class="brak">Brak przedmiotów w koszyku</p>';
    }
}

// kupowanie
const kup_teraz = document.querySelector('.kup-teraz');
kup_teraz.addEventListener('click', kupModalOn);

function kupModalOn(){
    const modal = document.querySelector('.kup-modal');
    let produkty_cena = document.querySelector('.produkty__price');
    let cala_cena = document.querySelector('.do-zaplaty__price');
    let produkty_suma = 0;
    const prices = document.querySelectorAll('.product__price');
    prices.forEach((price)=>{
        produkty_suma = produkty_suma+parseFloat(price.innerHTML);
    });
    produkty_cena.innerHTML = produkty_suma;
    cala_cena.innerHTML = produkty_suma+5.99;
    modal.classList.add('kup-modal--active');
}

const kup_teraz_close = document.querySelector('.kup-teraz__close');
kup_teraz_close.addEventListener('click',kupModalOff);

function kupModalOff(){
    const modal = document.querySelector('.kup-modal');
    const form = document.querySelector('#kup-form');
    form.reset();
    modal.classList.remove('kup-modal--active');
}

// potwierdzenie platnosci
const zamowienie_form = document.querySelector('#kup-form');
zamowienie_form.addEventListener('submit', zamowProdukty);

function zamowProdukty(e){
    e.preventDefault();
    const form = e.target;
    const popup = document.querySelector('.popup');
    const modal = document.querySelector('.kup-modal');
    let main = document.querySelector('main');
    const miasto = document.querySelector('#miasto').value;
    const kod_pocztowy = document.querySelector('#kod-pocztowy').value;
    const adres = document.querySelector('#adres').value;
    let koszyk = localStorage.getItem('koszyk');
    const full_adres = `${kod_pocztowy} ${miasto}, ${adres}`;
    const nr_tel = document.querySelector('#nr-tel').value;
    if(miasto=='' || kod_pocztowy=='' || adres=='' || nr_tel==''){
        alert('Wszystkie pola są obowiązkowe!');
    }
    else{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('adres', full_adres);
        params.append('nr_tel', nr_tel);
        params.append('koszyk', koszyk);
        xhr.open('POST', 'order.php', true);
        xhr.onload = function(){
            if(this.status == 200 && this.responseText==='Zamówiono'){
                form.reset();
                popup.classList.add('popup--active');
                setTimeout(()=>{
                    popup.classList.remove('popup--active');
                },3000);
                modal.classList.remove('kup-modal--active');
                main.innerHTML = '<p class="brak">Brak przedmiotów w koszyku</p>';
                localStorage.removeItem('koszyk');
            }
        }
        xhr.send(params);
    }
}