function dodajDoKoszyka(id){
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('id',id);
    xhr.open('POST', 'get-danie-cart.php', true);
    xhr.onload = function(){
        if(this.status == 200){
            const response = JSON.parse(this.responseText);
            const popup = document.querySelector('.cart-popup');
            if(localStorage.getItem('koszyk')!==null){
                let koszyk = JSON.parse(localStorage.getItem('koszyk'));
                let produkt = {
                    "idproduktu":id,
                    "obraz":response.obraz,
                    "nazwa":response.nazwa,
                    "ilosc":1,
                    "cena":response.cena
                };
                koszyk.unshift(produkt);
                localStorage.setItem('koszyk',JSON.stringify(koszyk));
            }
            else{
                let koszyk = [];
                let produkt = {
                    "idproduktu":id,
                    "obraz":response.obraz,
                    "nazwa":response.nazwa,
                    "ilosc":1,
                    "cena":response.cena
                };
                koszyk.push(produkt);
                localStorage.setItem('koszyk',JSON.stringify(koszyk));
            }
            popup.classList.add('cart-popup--active');
                setTimeout(()=>{
                    popup.classList.remove('cart-popup--active');
            },3000)
        }
    }
    xhr.send(params);
}