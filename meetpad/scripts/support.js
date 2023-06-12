const support = document.querySelector('#support_form');
const feedback = document.querySelector('#feedback_form');


support.addEventListener('submit', supportSend);
feedback.addEventListener('submit', feedbackSend);


function supportSend(e){
    e.preventDefault();
    const form = e.target;
    const temat = document.querySelector('#temat').value;
    const tresc = document.querySelector('#support_content').value;



    if(temat!== '' && tresc !== ''){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('temat',temat);
        params.append('tresc', tresc);
        xhr.open('POST', 'support-send.php', true);
        xhr.onload = function(){
            form.reset();
            alert(this.responseText);
        };
        xhr.send(params);
    }
    else{
        alert('Oba pola muszą być wypełnione!');
    }


}

function feedbackSend(e){
    e.preventDefault();
    const form = e.target;
    const tresc = document.querySelector('#feedback_content').value;

    if(tresc !== ''){
        let xhr = new XMLHttpRequest();
        let params = new FormData();
        params.append('tresc', tresc);
        xhr.open('POST', 'support-send.php', true);
        xhr.onload = function(){
            form.reset();
            alert(this.responseText);
        };
        xhr.send(params);
    }
    else{
        alert('Prosimy wprowadzić opinię!');
    }
}