<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $zalogowano = true;
        }
        else{
            $zalogowano = false;
        }
    }
    else{
        $zalogowano = false;
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>O nas</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/about.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/about.js" defer></script>
</head>
<body>
<?php include 'inc/header_form.php'; ?>
    <main>
        <h1>Skontaktuj się z nami</h1>
        <section class="kontakt">
            <article class="kontakt__article">
                <h3 class="kontakt__article__heading">Wyślij wiadomość</h3>
                <p class="kontakt__article__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod dolorem porro unde. Reiciendis iusto quod dicta quis voluptatum, autem, ipsum, dignissimos doloribus sit quisquam eius. Autem est incidunt eum maiores?</p>
            </article>
            <form class="kontakt__form">
                <div class="form__mini-inputy">
                    <div class="form__mini-inputy__container">
                        <label for="imie" class="form__label">Imię</label>
                        <input id="imie" type="text" class="form__mini-input">
                    </div>
                    <div class="form__mini-inputy__container">
                        <label for="nazwisko" class="form__label">Nazwisko</label>
                        <input id="nazwisko" type="text" class="form__mini-input">
                    </div>
                    <div class="form__mini-inputy__container">
                        <label for="email" class="form__label">Adres e-mail</label>
                        <input id="email" type="text" class="form__mini-input">
                    </div>
                    <div class="form__mini-inputy__container">
                        <label for="nr_tel" class="form__label">Nr telefonu</label>
                        <input id="nr_tel" type="text" class="form__mini-input">
                    </div>
                    <div class="form__mini-inputy__container">
                        <label for="firma" class="form__label">Firma*</label>
                        <input maxlength="50" id="firma" type="text" class="form__mini-input">
                    </div>
                    <div class="form__mini-inputy__container">
                        <label for="temat" class="form__label">Temat</label>
                        <input maxlength="30" id="temat" type="text" class="form__mini-input">
                    </div>
                </div>
                <div class="form__mini-inputy__container textarea-container">
                    <label for="wiadomosc" class="form__label">Wiadomość</label>
                    <textarea maxlength="300" id="wiadomosc" cols="50" rows="8" class="form__wiadomosc"></textarea>
                </div>
                <p class="form__error"></p>
                <div class="form__row">
                    <input type="submit" value="Wyślij" class="form__button">
                    <p class="form__info">*pole nieobowiązkowe</p>
                </div>
            </form>
        </section>
        <section class="bottom">
            <div class="bottom__top">
                <div class="bottom__top__element">
                    <p class="element__heading">Nr kontaktowy</p>
                    <div class="element__green">
                        <svg class="element__green__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M6.176 1.322l2.844-1.322 4.041 7.89-2.724 1.341c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-7.862 3.591-19.103-18.258-11.385-22.281zm1.929 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.971-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.251-4.398z"/></svg>
                        <p class="element__green__text">+48 123 123 123</p>
                    </div>
                </div>
                <div class="bottom__top__element">
                    <p class="element__heading">Adres e-mail</p>
                    <div class="element__green">
                        <svg class="element__green__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                        <p class="element__green__text">furni@gmail.com</p>
                    </div>
                </div>
                <div class="bottom__top__element">
                    <p class="element__heading">Adres</p>
                    <div class="element__green">
                        <svg class="element__green__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg>
                        <p class="element__green__text">Warszawa<br>ul.Biała,18A/9</p>
                    </div>
                </div>
            </div>
            <div class="bottom__map-container">
                <iframe class="bottom__map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.125270078328!2d20.998096272553948!3d52.24218852513577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd89fc70a813%3A0x11014e0153c32856!2sHala%20Gwardii!5e0!3m2!1spl!2spl!4v1671212571347!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    </main>
    <footer class="footer">
        <div class="footer__top">
            <a href="homepage"><img src="img/logo.png" alt="logo furni" class="footer__logo"></a>
            <nav class="footer__nav">
                <a href="#" class="footer__nav-link">Polityka prywatności</a>
                <a href="#" class="footer__nav-link">Kontakt</a>
                <a href="#" class="footer__nav-link">Regulamin strony</a>
                <a href="o-nas" class="footer__nav-link">O nas</a>
            </nav>
        </div>
        <p class="footer__bottom">Furni &copy; 2022 Wszelkie prawa zastrzeżone</p>
    </footer>
</body>
</html>