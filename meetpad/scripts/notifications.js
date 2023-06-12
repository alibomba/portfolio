let xhr = new XMLHttpRequest();
let params = new FormData();
params.append('sprawdzenie', true);
xhr.open('POST', 'sprawdzenie-liczby-rekordow.php', true);
xhr.onload = function(){
    let currentpowiadomienia = parseInt(this.responseText);
    setInterval(()=>{
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('current', currentpowiadomienia);
        xhr.open('POST', 'wysylanie-powiadomien.php', true);
        xhr.onload = function(){
            const response = JSON.parse(this.responseText);
            currentpowiadomienia = response.newcurrentpowiadomienia;
            if(response.nowe == 'true'){
                const powiadomienie = response.powiadomienie;
                const name = powiadomienie.name;
                const profilowe = powiadomienie.profilowe;
                const tresc = powiadomienie.tresc;

                const popup = document.createElement('div');
                const popup_heading = document.createElement('p');
                popup_heading.classList.add('notification-popup__heading');
                popup_heading.innerHTML = 'Nowe powiadomienie';
                const popup_pfp = document.createElement('img');
                popup_pfp.setAttribute('src', profilowe);
                popup_pfp.setAttribute('alt', `${name}'s profile picture`);
                popup_pfp.classList.add('pfp');
                const popup_content = document.createElement('p');
                popup_content.classList.add('notification-popup__content');
                popup_content.innerHTML = `<span class="bold">${name}</span> ${tresc}`;
                popup.classList.add('notification-popup');
                document.body.appendChild(popup);
                popup.appendChild(popup_heading);
                popup.appendChild(popup_pfp);
                popup.appendChild(popup_content);
                popup.addEventListener('click',()=>{
                    window.location.pathname = '/meetpad/powiadomienia';
                });
                setTimeout(()=>{
                    popup.classList.add('notification-popup--visible');
                    setTimeout(()=>{
                        popup.classList.remove('notification-popup--visible');
                        setTimeout(()=>{
                            popup.remove();
                        },100);
                    },5000);
                },100)

                let unread = document.querySelector('.unread-notifications').innerHTML;
                if(unread!==''){
                    if(unread=='9+' || unread=='9'){
                        document.querySelector('.unread-notifications').innerHTML = '9+';
                    }
                    else{
                        let new_unread_number = parseInt(unread)+1;
                        document.querySelector('.unread-notifications').innerHTML = new_unread_number;
                    }
                }
                else{
                    document.querySelector('.unread-notifications').innerHTML = '1';
                }

                let xhr = new XMLHttpRequest();
                let params = new FormData();
                params.append('inkrementacja', true);
                xhr.open('POST', 'unread_notis_increment.php', true);
                xhr.send(params);
            }
        }
        xhr.send(params);
    },3000);
}
xhr.send(params);
