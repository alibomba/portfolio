const form = document.querySelector('#plany-form');

form.addEventListener('submit', wyslijForma);

function wyslijForma(e){
    e.preventDefault();
    const form = e.target;

    const wiek = form.querySelector('#wiek').value;
    const liczba_treningow = form.querySelector('#treningi').value;
    const waga = form.querySelector('#waga').value;
    const wzrost = form.querySelector('#wzrost').value;
    const email = form.querySelector('#email').value;

    const poczatkujacy = form.querySelector('#poczatkujacy');
    const srednio = form.querySelector('#sredniozaawansowany');
    const zaawansowany = form.querySelector('#zaawansowany');
    let poziom_zaawansowania;
    if(poczatkujacy.checked){
        poziom_zaawansowania = 'początkujący';
    }
    else if(srednio.checked){
        poziom_zaawansowania = 'średniozaawansowany';
    }
    else if(zaawansowany.checked){
        poziom_zaawansowania = 'zaawansowany';
    }

    const redukcja = form.querySelector('#redukcja');
    const masa = form.querySelector('#masa');
    const wytrzymalosc = form.querySelector('#wytrzymalosc');
    let cel;
    if(redukcja.checked){
        cel = 'redukcja';
    }
    else if(masa.checked){
        cel = 'masa';
    }
    else if(wytrzymalosc.checked){
        cel = 'wytrzymałość';
    }


    if(wiek!=='' && liczba_treningow!=='' && waga!=='' && wzrost!=='' && email!=='' &&poziom_zaawansowania!==undefined && cel!==undefined){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('wiek', wiek);
        params.append('liczba_treningow',liczba_treningow);
        params.append('waga',waga);
        params.append('wzrost',wzrost);
        params.append('email',email);
        params.append('poziom',poziom_zaawansowania);
        params.append('cel', cel);
        xhr.open('POST','plan_submit.php',true);
        xhr.onload = function(){
            if(this.status == 200 && this.responseText=='Udane'){
                form.reset();
                alert('Pomyślnie złożono zamówienie');
            }
        }
        xhr.send(params);
    }
    else{
        alert('Wszystkie pola muszą zostać wypełnione!');
    }
}