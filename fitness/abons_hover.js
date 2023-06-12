const oferty = document.querySelectorAll('.oferty__elem');

oferty.forEach((oferta)=>{
    oferta.addEventListener('mouseenter', powiekszDiva);
});

oferty.forEach((oferta)=>{
    oferta.addEventListener('mouseleave', zmniejszDiva);
});

function powiekszDiva(e){
    let hovered;
    if(e.target.classList.contains('oferty__elem')){
        hovered = e.target;
    }
    else{
        hovered = e.target.closest('oferty__elem');
    }
    hovered.classList.add('oferty__elem--hovered');
}

function zmniejszDiva(e){
    let hovered;
    if(e.target.classList.contains('oferty__elem')){
        hovered = e.target;
    }
    else{
        hovered = e.target.closest('oferty__elem');
    }
    hovered.classList.remove('oferty__elem--hovered');
}