function sendFriendRequest(e,userid){
    let button;
    if(window.location.pathname === '/meetpad/profile'){
        button = e.target.closest('.profile__header__buttons').querySelector('.add-friend-button');
    }
    const button_img = button.querySelector('img');
    const button_content = button.querySelector('.add-friend-button__content');
    
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('userid', userid);
    xhr.open('POST', 'send-friend-request.php', true);
    xhr.onload = function(){
        const response = JSON.parse(this.responseText);
        if(response.newclass === 'add-friend-button--add'){
            button.classList.add('add-friend-button--add');
            button.classList.remove('add-friend-button--cancel');
            button.classList.remove('add-friend-button--delete');
        }
        else if(response.newclass === 'add-friend-button--cancel'){
            button.classList.add('add-friend-button--cancel');
            button.classList.remove('add-friend-button--add');
            button.classList.remove('add-friend-button--delete');
        }
        button_img.setAttribute('src',response.newimg);
        button_content.innerHTML = response.newcontent;
    };
    xhr.send(params);
}