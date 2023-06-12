const comment_forms = document.querySelectorAll('.comment-form');

comment_forms.forEach((form)=>{
    form.addEventListener('submit', addComment);
});

function addComment(e){
    e.preventDefault();
    const form = e.target;
    const content = form.querySelector('.comment-input').value;
    const parent_id = form.closest('.post').id.substring(5);
    const comments_container = form.closest('.comments-tooltip').querySelector('.comments');
    const comments_counter = form.closest('.post').querySelector('.post__comments-number');

    if(content!==''){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('content', content);
        params.append('parentid', parent_id);
        xhr.open('POST', 'comment-upload.php', true);
        xhr.onload = function(){
            const response = JSON.parse(this.responseText);
            let comment = `
            <div class="comment">
                        <div class="comment__top">
                            <img class="pfp" src="${response.profilowe}" alt="${response.autor}'s profile picture">
                            <span class="comment__author">
                                <a href="AUTHOR'S PROFILE (TO CHANGE)">${response.autor}</a>
                            </span>
                            <span class="comment__ago">${response.data}</span>
                        </div>
                        <p class="comment__content">
                            ${response.content}
                        </p>
                        <div class="comment__bottom">
                            <span class="comment__like-button">
                                Lubię to! (0)
                            </span>
                            <span class="comment__reply-button">
                                Odpowiedz
                            </span>
                        </div>
                    </div>
            `;
            comments_container.innerHTML = comment + comments_container.innerHTML;
            comments_counter.innerHTML = `${response.newcomments} komentarzy`;
            form.reset();
        }
        xhr.send(params);
    }
    else{
        alert('Komentarz musi posiadać treść!');
    }
}