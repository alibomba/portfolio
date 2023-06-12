const form = document.querySelector('#create-post-form');
const content_input = document.querySelector('.create-post__input');
const file_input = document.querySelector('.create-post__file-input');
const privacy_buttons_container = document.querySelector('.privacy-buttons');
const privacy_button = document.querySelector('.privacy-button');
const private_button = document.querySelector('.private-button');
const public_button = document.querySelector('.public-button');
const post_close = document.querySelector('.post-close');
const location_button = document.querySelector('.create-post__location');
const location_modal = document.querySelector('.location-modal');
const location_submit_button = document.querySelector('.location-submit');
const location_input = document.querySelector('.location-input');
const location_error = document.querySelector('.location-error');
const udany_upload_popup = document.querySelector('.udany_upload');
const file_error = document.querySelector('.file_error');
const posts_container = document.querySelector('.posts');
let current_privacy_setting = 'public';
let lokalizacja;

content_input.addEventListener('focus', ()=>{
    privacy_buttons_container.style.display = 'flex';
});
post_close.addEventListener('click', ()=>{
    privacy_buttons_container.style.display = 'none';
    file_error.style.display = 'none';
    form.reset();
});


public_button.addEventListener('click', ()=>{
    public_button.classList.remove('active');
    private_button.classList.add('active');
    location_error.innerHTML = '';
    current_privacy_setting = 'private';
});
private_button.addEventListener('click', ()=>{
    private_button.classList.remove('active');
    public_button.classList.add('active');
    current_privacy_setting = 'public';
});


location_button.addEventListener('click', ()=>{
    location_modal.classList.add('location-modal--active');
    modal_overlay.classList.add('modal-overlay--active');
});
modal_overlay.addEventListener('click', ()=>{
    location_modal.classList.remove('location-modal--active');
    modal_overlay.classList.remove('modal-overlay--active');
})

location_submit_button.addEventListener('click', ()=>{
    if(location_input.value)
    {
        location_modal.classList.remove('location-modal--active');
        modal_overlay.classList.remove('modal-overlay--active');
        lokalizacja = location_input.value;
    }
    else{
        location_error.innerHTML = 'Podaj lokalizację!';
    }
});






form.addEventListener('submit', dodajPost);


function dodajPost(e){
    e.preventDefault();
    if(content_input.value)
    {

        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        for(const file of file_input.files){
            formData.append('file',file);
        }
        formData.append('content',content_input.value);
        formData.append('location', lokalizacja);
        formData.append('privacy', current_privacy_setting);

        
        xhr.open('POST','post-upload.php', true);

        
        xhr.onload = function(){
            console.log(this.responseText);
            const response = JSON.parse(this.responseText);
            if(response.db_error !== ''){
                body.innerHTML = response.db_error;
            }
            if(response.udany_upload_posta !== ''){
                udany_upload_popup.innerHTML = response.udany_upload_posta;
                udany_upload_popup.style.transform = 'translateY(0%)';
                udany_upload_popup.style.opacity = '1';
                form.reset();
                privacy_buttons_container.style.display = 'none';
                // adding the post to feed
                let new_post = `<section class="post" id="post-${response.uploaded_id}">
                <header class="post__header">
                    <div class="post__author-info">
                        <img class="pfp" src="${response.uploaded_prof_autora}" alt="${response.uploaded_autor}'s profile picture">
                        <div class="post__author-info__text">
                            <h2><a class="post__author" href="AUTHOR'S PROFILE (TO CHANGE)">${response.uploaded_autor}</a></h2>
                            <div class="post__author-info__text__bottom">
                                <p class="post__time-ago">Przed chwilą</p>
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path class="public-icon" d="${get_privacy_icon(response.uploaded_widocznosc)}"/></svg>
                            </div>
                            <span class="post__location">${response.uploaded_lokalizacja !== '' ? response.uploaded_lokalizacja : ''}</span>
                        </div>
                    </div>
                    <img class="more-icon" src="img/icons/more-icon.png" alt="more icon (three dots)">
                </header>
                <main class="post__main">
                    <p class="post__content">${response.uploaded_tresc_posta}</p>
                    ${response.uploaded_obrazek !== '' ? '<img class="post__image" src="'+response.uploaded_obrazek+'" alt="post image">' : ''}
                </main>
                <footer class="post__footer">
                    <div class="post__numbers">
                        <div class="post__reactions-number">
                            <div class="post__reactions-number__icons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="like-icon" d="M19.396 20.708c-.81-.062-.733-.812.031-.953 1.269-.234 1.827-.914 1.827-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.132-.09 1.688-.764 1.688-1.41 0-.565-.425-1.108-1.261-1.22-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.667-.198-4.979-.885.907-3.657.689-8.782-1.687-8.782-1.594 0-1.896 1.807-2.375 3.469-1.718 5.969-5.156 7.062-8.687 7.603v9.928c6.688 0 8.5 3 13.505 3 3.199 0 4.852-1.735 4.852-2.666-.001-.334-.273-.572-.961-.626z"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="heart-icon" d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
                            </div>
                            <span>${parseInt(response.uploaded_lajki)+parseInt(response.uploaded_serca)}</span>
                        </div>
                        <div class="post__comments-number">
                            ${response.uploaded_komentarze} komentarzy
                        </div>
                    </div>
                    <div class="post__interaction-buttons">
                        <button onclick="addLike(${response.uploaded_id})" class="post__like-button"><img src="img/icons/like-icon.svg" alt="like icon"> Lubię to!</button>
                        <button class="post__comment-button"><img src="img/icons/comment-icon.svg" alt="comment icon"> Skomentuj</button>
                        <button class="post__share-button"><img src="img/icons/share-icon.svg" alt="share icon"> Udostępnij</button>
                    </div>
                </footer>
                </section>`;
                posts_container.innerHTML = new_post + posts_container.innerHTML;
                //koniec adding the post to feed
                setTimeout(()=>{
                    udany_upload_popup.style.transform = 'translateY(200%)';
                    udany_upload_popup.style.opacity = '0';
                },2000)
            }
            if(response.file_error !== ''){
                file_error.style.display = 'block';
                file_error.innerHTML = response.file_error;
            }
            else{
                file_error.style.display = 'none';
            }
        }

        xhr.send(formData);
    }
    else{
        alert('Post musi posiadać treść!');
    }
}
function get_privacy_icon(privacy){
    let path;
    if(privacy==='public'){
        path = 'M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771';
    }
    else if(privacy === 'private'){
        path = 'M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z';
    }
    return path;
}