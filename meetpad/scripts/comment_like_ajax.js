function toggleCommentLike(liked_id,liker_id,e){
    const button = e.target;
    const comment_like_counter = button.querySelector('.comment__like-counter');

    button.classList.toggle('comment-button--liked');

    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('liked_id', liked_id);
    params.append('liker_id', liker_id);
    xhr.open('POST', 'add-comment-like.php', true);
    xhr.onload = function(){
        comment_like_counter.innerHTML = this.responseText;
    };
    xhr.send(params);
}
