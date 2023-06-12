function addLike(liked_id, liker_id,e){
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('liked_id', liked_id);
    params.append('liker_id', liker_id);
    xhr.open('POST', 'add-like.php', true);
    xhr.onload = function(){
        const like_counter = e.target.closest('.post__footer').querySelector('.like-counter');
        const heart_counter = e.target.closest('.post__footer').querySelector('.heart-counter');
        const reaction_counter = e.target.closest('.post__footer').querySelector('.reaction-counter');
        const button = e.target.closest('.post__like-button--container').querySelector('.post__like-button');
        const response = JSON.parse(this.responseText);

        like_counter.innerHTML = response.newlikes;
        reaction_counter.innerHTML = response.newreactions;
        if(response.newhearts !== ''){
            heart_counter.innerHTML = response.newhearts;
        }

        button.classList.toggle('button--liked');
        button.classList.remove('button--hearted');
    };
    xhr.send(params);
}

function addHeart(hearted_id,hearter_id,e){
    let xhr = new XMLHttpRequest();
    let params = new FormData();
    params.append('hearted_id', hearted_id);
    params.append('hearter_id', hearter_id);
    xhr.open('POST', 'add-heart.php', true);
    xhr.onload = function(){
        const heart_counter = e.target.closest('.post__footer').querySelector('.heart-counter');
        const like_counter = e.target.closest('.post__footer').querySelector('.like-counter');
        const reaction_counter = e.target.closest('.post__footer').querySelector('.reaction-counter');
        const button = e.target.closest('.post__like-button--container').querySelector('.post__like-button');
        const response = JSON.parse(this.responseText);

        heart_counter.innerHTML = response.newhearts;
        reaction_counter.innerHTML = response.newreactions;
        if(response.newlikes !== ''){
            like_counter.innerHTML = response.newlikes;
        }

        button.classList.toggle('button--hearted');
        button.classList.remove('button--liked');
    };
    xhr.send(params);
}