const button = document.querySelector('.bmi__button');

button.addEventListener('click', obliczBMI);

function obliczBMI(){
    const wzrost = parseInt(document.querySelector('#wzrost').value)/100;
    const waga = document.querySelector('#waga').value;
    if(wzrost!=='' && waga!==''){
        const bmi = waga/Math.pow(wzrost,2);
        let typ;
        if(bmi<16){
            typ = 'Jesteś wygłodzony!';
        }
        else if(bmi>=16 && bmi<=16.99){
            typ = 'Jesteś wychudzony!';
        }
        else if(bmi>=17 && bmi<=18.49){
            typ = 'Masz niedowagę';
        }
        else if(bmi>=18.5 && bmi<=24.99){
            typ = 'Twoja waga jest prawidłowa';
        }
        else if(bmi>=25 && bmi<=29.99){
            typ = 'Masz nadwagę';
        }
        else if(bmi>=30 && bmi<=34.9){
            typ = 'Masz otyłość I stopnia';
        }
        else if(bmi>=35 && bmi<=39.99){
            typ = 'Masz otyłość II stopnia';
        }
        else if(bmi>40){
            typ = 'Masz otyłość III stopnia!';
        }

        let check = document.querySelector('.bmi__wynik');
        if(check===null){
            const parent = document.querySelector('.bmi');
            const bmi__wynik = document.createElement('div');
            bmi__wynik.classList.add('bmi__wynik');
            bmi__wynik.innerHTML = `Twoje BMI wynosi ${bmi.toFixed(2)}`;
            const bmi__typ = document.createElement('div');
            bmi__typ.classList.add('bmi__typ');
            bmi__typ.innerHTML = typ;
            parent.appendChild(bmi__wynik);
            parent.appendChild(bmi__typ);
        }
        else{
            let bmi__wynik = check;
            let bmi__typ = document.querySelector('.bmi__typ');

            bmi__wynik.innerHTML = `Twoje BMI wynosi ${bmi.toFixed(2)}`;
            bmi__typ.innerHTML = typ; 
        }
    }
    else{
        alert('Prosimy wypełnić oba pola!');
    }
}