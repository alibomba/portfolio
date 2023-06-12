let buttons = document.querySelectorAll('.button--orange,.button--brown');
buttons.forEach((button)=>{
    button.addEventListener('click', rozwinListe);
});

let dania = document.querySelectorAll('.button--green');
dania.forEach((danie)=>{
    danie.addEventListener('click', rozwinDetale);
})

function rozwinListe(e){
    const plus_path = 'm12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z';
    const minus_path = 'm12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm4.253 7.75h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z';
    let clicked;
    if(e.target.tagName!=='LI'){
        clicked = e.target.closest('li');
    }
    else{
        clicked = e.target;
    }
    let icon = clicked.querySelector('svg>path');
    let list = clicked.nextSibling.nextSibling;
    list.classList.toggle('list--visible');
    if(icon.getAttribute('d')===plus_path){
        icon.setAttribute('d', minus_path);
    }
    else{
        icon.setAttribute('d', plus_path);
    }
}

function rozwinDetale(e){
    const down_path = 'm16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z';
    const up_path = 'm16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z';
    let clicked;
    if(e.target.tagName!=='LI'){
        clicked = e.target.closest('li');
    }
    else{
        clicked = e.target;
    }
    let icon = clicked.querySelector('svg>path');
    let button = clicked.querySelector('.button--green');
    let details = clicked.querySelector('.danie__details');
    details.classList.toggle('danie__details--active');
    button.classList.toggle('button--green--active');
    if(icon.getAttribute('d')===down_path){
        icon.setAttribute('d', up_path);
    }
    else{
        icon.setAttribute('d', down_path);
    }
}