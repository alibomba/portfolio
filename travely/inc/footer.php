<footer>
        <nav class="footer__top">
            <a href="homepage"><img class="logo--footer" src="img/logo.png" alt="logo"></a>
            <a href="#" class="footer-link">Ustawienia prywatności</a>
            <a href="regulamin.pdf" class="footer-link" download="Regulamin">Regulamin strony</a>
            <a href="#" class="footer-link footer-link--bottom">O nas</a>
            <a href="kontakt" class="footer-link footer-link--bottom">Kontakt</a>
        </nav>
        <div class="footer__bottom">
            <p class="footer__bottom__heading">Otrzymuj informacje o zniżkach i nowościach:</p>
            <form class="footer__bottom__newsletter">
                <input type="text" class="footer__input" placeholder="Podaj adres e-mail">
                <input type="submit" value="Zapisz się" class="footer__button">
            </form>
            <p class="footer__error"></p>
        </div>
    </footer>
    <script>
        const footer_input = document.querySelector('.footer__input');
        if(window.innerWidth<336){
            footer_input.setAttribute('placeholder','@')
        }
        window.addEventListener('resize', zmienPlaceholder);
        function zmienPlaceholder(){
            if(window.innerWidth<336){
                footer_input.setAttribute('placeholder','@')
            }
            else{
                footer_input.setAttribute('placeholder','Podaj adres e-mail')
            }
        }
    </script>