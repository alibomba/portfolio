const sidebar = document.querySelector('.sidebar');
const button = document.querySelector('.sidebar__toggle');
const buttonPath = document.querySelector('.sidebar__toggle path');
const openbuttonPathD = 'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 6h-4v12h4v-12z'; 
const closebuttonPathD = 'M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z';


button.addEventListener('click', switchSideBar);

window.addEventListener('resize', ()=>{
    turnActiveOff();
    if(screen.width > 700){
        body.style.paddingLeft = '350px';
    }
});

function switchSideBar(){
    if(!sidebar.classList.contains('sidebar--mobile--active')){
        sidebar.classList.add('sidebar--mobile--active');
        if(screen.width > 650){
            body.style.paddingLeft = '350px';
        }
        buttonPath.setAttribute('d', closebuttonPathD);
        buttonPath.style.fill = 'red';
    }
    else{
        turnActiveOff();
    }
}


function turnActiveOff(){
    if(screen.width <= 700){
        sidebar.classList.remove('sidebar--mobile--active');
        if(screen.width > 650){
            body.style.paddingLeft = '52px';
        }
        buttonPath.setAttribute('d', openbuttonPathD);
        buttonPath.style.fill = 'var(--text-color)';
    }
}