const cytaty = [
    'Jedyną osobą, która może cię zmotywować jesteś ty sam!',
    'Sukces to suma niewielkiego wysiłku powtarzanego z dnia na dzień.',
    'Nigdy się nie poddawaj. Na wielkie rzeczy potrzeba czasu.',
    'Wszystko jest możliwe, o ile masz wystarczający tupet.',
    'Trudno jest pokonać osobę, która nigdy się nie poddaje.',
    'Wątpliwości zabiły więcej marzeń niż jakiekolwiek porażki.',
    ' Przegrywa nie ten który padł, lecz ten który nie chciał powstać.',
    'Tam, gdzie nie ma walki, nie ma siły.',
    'Przestań siebie powstrzymywać. Jeśli nie jesteś szczęśliwy – wprowadź zmiany.',
    'Zanim coś osiągniesz, musisz czegoś od siebie oczekiwać.',
    'Zwycięzcą jest ten, który podnosi się wtedy kiedy już nie może.'
];
const cytat__cytat = document.createElement('div');
cytat__cytat.classList.add('cytat__cytat');
cytat__cytat.innerHTML = cytaty[Math.floor(Math.random() * cytaty.length)];
const cytat__text = document.querySelector('.cytat__text');
cytat__text.appendChild(cytat__cytat);
setInterval(zmienCytat,7000);

function zmienCytat(){
    let current_cytat = document.querySelector('.cytat__cytat');
    let current_cytat_tresc = current_cytat.innerHTML;
    current_cytat.classList.add('cytat--invisible');
    setTimeout(()=>{
       cytat__text.removeChild(current_cytat);
       let cytat__cytat_nowy = document.createElement('div');
       cytat__cytat_nowy.classList.add('cytat__cytat');
       cytat__cytat_nowy.classList.add('cytat--invisible');
       let cytat_nowy_tresc = cytaty[Math.floor(Math.random() * cytaty.length)];
       if(cytat_nowy_tresc==current_cytat_tresc){
            cytat__cytat_nowy.innerHTML = current_cytat_tresc;
            cytat__text.appendChild(cytat__cytat_nowy);
            zmienCytat();
       }
       else{
            cytat__cytat_nowy.innerHTML = cytat_nowy_tresc;
            cytat__text.appendChild(cytat__cytat_nowy);
            setTimeout(()=>{
                cytat__cytat_nowy.classList.remove('cytat--invisible');
           },200) 
       }
    },300);
}