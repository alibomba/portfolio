const elements_content = document.querySelector('.elements').innerHTML;
const search_bar = document.querySelector('.search-bar');
search_bar.addEventListener('input', zmienWyniki);

function zmienWyniki(e){
    const input = e.target;
    const fraza = input.value;

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('fraza', fraza);
    xhr.open('POST', 'get-dishes.php', true);
    xhr.onload = function(){
        if(this.status == 200){
            const response = JSON.parse(this.responseText);
            let elements_container = document.querySelector('.elements');
            if(response.wyniki=='all'){
                elements_container.innerHTML = elements_content;
                buttons = document.querySelectorAll('.button--orange,.button--brown');
                dania = document.querySelectorAll('.button--green');
                buttons.forEach((button)=>{
                    button.addEventListener('click', rozwinListe);
                });
                dania.forEach((danie)=>{
                    danie.addEventListener('click', rozwinDetale);
                })
            }
            else if(response.wyniki=='0'){
                elements_container.innerHTML = '';
                buttons = document.querySelectorAll('.button--orange,.button--brown');
                dania = document.querySelectorAll('.button--green');
                buttons.forEach((button)=>{
                    button.addEventListener('click', rozwinListe);
                });
                dania.forEach((danie)=>{
                    danie.addEventListener('click', rozwinDetale);
                })
            }
            else if(response.wyniki=='1'){
                let wyniki = '';
                response.dania.forEach((danie)=>{
                    wyniki = wyniki+`<li class="danie">
                    <button class="button--green">${danie.nazwa} <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                    <div class="danie__details">
                        <img class="danie__details__img" src="${danie.obraz}" alt="${danie.obraz}">
                        <div class="danie__details__right">
                            <p class="danie__details__heading bold">Opis:</p>
                            <p class="danie__details__desc">${danie.opis}</p>
                            <p class="danie__details__cena"><span class="bold">Cena:</span> ${danie.cena}</p>
                            <div class="danie__details__buttons">
                                <button class="add-to-cart" onclick="dodajDoKoszyka(${danie.id})">Dodaj do koszyka</button>
                                <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                            </div>
                        </div>
                    </div>
                </li>`;
                });
                elements_container.innerHTML = wyniki;
                buttons = document.querySelectorAll('.button--orange,.button--brown');
                dania = document.querySelectorAll('.button--green');
                buttons.forEach((button)=>{
                    button.addEventListener('click', rozwinListe);
                });
                dania.forEach((danie)=>{
                    danie.addEventListener('click', rozwinDetale);
                })
            }
        }
    }
    xhr.send(params);
}