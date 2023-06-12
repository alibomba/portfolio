const kafelki = document.querySelectorAll('.trenerzy__trener');
kafelki.forEach((kafelek)=>{
    kafelek.addEventListener('click', zmienKafelek);
});
const strzalki = document.querySelectorAll('.slider__arrow');
strzalki.forEach((strzalka)=>{
    strzalka.addEventListener('click', zmienKafelek);
});


function zmienKafelek(e){
    let clicked = e.target;
    let kafelek;
    const kafelki_nodelist = document.querySelectorAll('.trenerzy__trener');
    if(clicked.classList.contains('trenerzy__trener')){
        kafelek = clicked;
    }
    else if(clicked.classList.contains('slider__left-arrow')){
        kafelek = kafelki_nodelist[1];
    }
    else if(clicked.classList.contains('slider__right-arrow')){
        kafelek = kafelki_nodelist[3];
    }
    else{
        kafelek = clicked.closest('.trenerzy__trener');
    }
    const numer_kafelka =  [].slice.call(kafelki_nodelist,0).indexOf(kafelek);
    let kolejnosc;
    if(numer_kafelka==1){
        kafelki_nodelist.forEach((kafelek)=>{
            kafelek.style.right = '-265px';
        })
        kafelki_nodelist[0].classList.remove('trener--invisible');
        kafelki_nodelist[0].classList.add('trener--inactive');

        kafelki_nodelist[2].classList.add('trener--inactive');
        
        kafelki_nodelist[3].classList.remove('trener--inactive');
        kafelki_nodelist[3].classList.add('trener--invisible');
        kolejnosc = [
            kafelki_nodelist[4],
            kafelki_nodelist[0],
            kafelki_nodelist[1],
            kafelki_nodelist[2],
            kafelki_nodelist[3]
        ];
    } 
    else if(numer_kafelka==3){
        kafelki_nodelist.forEach((kafelek)=>{
            kafelek.style.right = '265px';
        })
        kafelki_nodelist[1].classList.remove('trener--inactive');
        kafelki_nodelist[1].classList.add('trener--invisible');

        kafelki_nodelist[2].classList.add('trener--inactive');
        
        kafelki_nodelist[4].classList.remove('trener--invisible');
        kafelki_nodelist[4].classList.add('trener--inactive');
        kolejnosc = [
            kafelki_nodelist[1],
            kafelki_nodelist[2],
            kafelki_nodelist[3],
            kafelki_nodelist[4],
            kafelki_nodelist[0]
        ];
    }
    else{
        return 0;
    }
    kafelek.classList.remove('trener--inactive');
    ustawKafelki(kolejnosc);
}


function ustawKafelki(kolejnosc){
    const kafelki_parent = document.querySelector('.trenerzy__components');
    setTimeout(()=>{
        kolejnosc.forEach((element)=>{
            element.style.right = '0';
            kafelki_parent.appendChild(element);
        });
    },500)
}