function koszykZmniejszIlosc(e,id_koszyka){
    const zamowienie = document.querySelector('.podsumowanie__zamowienie');
    const calosc = document.querySelector('.podsumowanie__calosc');
    const minus = e.target;
    const plus = minus.closest('.ilosc').querySelector('.ilosc__plus');
    const ilosc = minus.nextElementSibling;
    const cena = minus.closest('.pozycja').querySelector('.pozycja__cena');
    const cena_jednego = (parseFloat(cena.innerHTML)/parseInt(ilosc.innerHTML)).toFixed(2);
    const checkbox = minus.closest('.pozycja').querySelector('.pozycja__checkbox');
    if(parseInt(ilosc.innerHTML)>1){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('id_koszyka', id_koszyka);
        params.append('operacja', 'minus');
        xhr.open('POST', 'ajax/change_cart_quantity.php', true);
        xhr.onload = function(){
            if(this.status===200&&this.responseText==='fine'){
                ilosc.innerHTML = parseInt(ilosc.innerHTML)-1;
                cena.innerHTML = (parseInt(ilosc.innerHTML)*cena_jednego).toFixed(2)+' zł';
                if(checkbox.checked){
                    zamowienie.innerHTML = (parseFloat(zamowienie.innerHTML)-cena_jednego).toFixed(2);
                    calosc.innerHTML = (parseFloat(zamowienie.innerHTML)+30).toFixed(2);
                }
                if(parseInt(ilosc.innerHTML)===1){
                    minus.style.cursor = 'not-allowed';
                }
                plus.style.cursor = 'pointer';
            }
        };
        xhr.send(params);
    }
}

function koszykZwiekszIlosc(e,id_koszyka){
    const zamowienie = document.querySelector('.podsumowanie__zamowienie');
    const calosc = document.querySelector('.podsumowanie__calosc');
    const plus = e.target;
    const minus = plus.closest('.ilosc').querySelector('.ilosc__minus');
    const ilosc = plus.previousElementSibling;
    const cena = plus.closest('.pozycja').querySelector('.pozycja__cena');
    const cena_jednego = (parseFloat(cena.innerHTML)/parseInt(ilosc.innerHTML)).toFixed(2);
    const checkbox = plus.closest('.pozycja').querySelector('.pozycja__checkbox');
    if(parseInt(ilosc.innerHTML)<100){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('id_koszyka', id_koszyka);
        params.append('operacja', 'plus');
        xhr.open('POST', 'ajax/change_cart_quantity.php', true);
        xhr.onload = function(){
            if(this.status===200&&this.responseText==='fine'){
                ilosc.innerHTML = parseInt(ilosc.innerHTML)+1;
                cena.innerHTML = (parseInt(ilosc.innerHTML)*cena_jednego).toFixed(2)+' zł';
                if(checkbox.checked){
                    zamowienie.innerHTML = (parseFloat(zamowienie.innerHTML)+parseFloat(cena_jednego)).toFixed(2);
                    calosc.innerHTML = (parseFloat(zamowienie.innerHTML)+30).toFixed(2);
                }
                if(parseInt(ilosc.innerHTML)===100){
                    plus.style.cursor = 'not-allowed';
                }
                minus.style.cursor = 'pointer';
            }
        }
        xhr.send(params);
    }
}

function koszykUsunZKoszyka(e,id_koszyka){
    const popup = document.querySelector('.popup');
    const pozycja = e.target.closest('.pozycja');
    const pozycja_cena = parseFloat(pozycja.querySelector('.pozycja__cena').innerHTML);
    const zamowienie = document.querySelector('.podsumowanie__zamowienie');
    const calosc = document.querySelector('.podsumowanie__calosc');
    const checkbox = pozycja.querySelector('.pozycja__checkbox');
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id_koszyka', id_koszyka);
    xhr.open('POST', 'ajax/delete_from_cart.php', true);
    xhr.onload = function(){
        if(this.status===200&&this.responseText==='fine'){
            pozycja.remove()
            popup.innerHTML = 'Usunięto produkt z koszyka';
            popup.style.left = 'calc(50% - '+popup.offsetWidth/2+')';
            popup.classList.add('popup--active');
            setTimeout(()=>{
                popup.classList.remove('popup--active');
            },3000);
            if(document.querySelector('.produkty').childElementCount===0){
                document.querySelector('.koszyk').innerHTML = '<div class="brak-produktow-big">Brak produktów</div>';
            }
            if(checkbox.checked){
                zamowienie.innerHTML = (parseFloat(zamowienie.innerHTML)-pozycja_cena).toFixed(2);
                calosc.innerHTML = (parseFloat(zamowienie.innerHTML)+30).toFixed(2);
            }
        }
    }
    xhr.send(params);
}


const checkboxy = document.querySelectorAll('.pozycja__checkbox');
checkboxy.forEach((checkbox)=>{
    checkbox.addEventListener('click', zmienCenePodsumowania);
});

function zmienCenePodsumowania(e){
    const checkbox = e.target;
    const cena_pozycji = parseFloat(checkbox.closest('.pozycja').querySelector('.pozycja__cena').innerHTML);
    const zamowienie = document.querySelector('.podsumowanie__zamowienie');
    const calosc = document.querySelector('.podsumowanie__calosc');
    if(checkbox.checked){
        zamowienie.innerHTML = (parseFloat(zamowienie.innerHTML)+cena_pozycji).toFixed(2);
        calosc.innerHTML = (parseFloat(zamowienie.innerHTML)+30).toFixed(2);
    }
    else{
        zamowienie.innerHTML = (parseFloat(zamowienie.innerHTML)-cena_pozycji).toFixed(2);
        calosc.innerHTML = (parseFloat(zamowienie.innerHTML)+30).toFixed(2);
    }
}