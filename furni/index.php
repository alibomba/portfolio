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
    <title>Furni</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/index.css">
    <script src="scripts/generic.js" defer></script>
</head>
<body>
    <?php include 'inc/header_form.php'; ?>
    <main>
        <section class="hero">
            <div class="hero__left">
                <h2 class="hero__heading">Najlepsze<br>produkty na rynku</h2>
                <p class="hero__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa facere, error corporis delectus et accusantium voluptatibus aperiam praesentium ipsam dolore!</p>
                <div class="hero__buttons">
                    <a href="sklep" class="hero__buttons__button hero__buttons__button--primary">Do sklepu</a>
                    <a href="#" class="hero__buttons__button hero__buttons__button--thirdary">Opinie</a>
                </div>
            </div>
            <img src="img/hero-sofa.png" alt="sofa" class="hero__img">
        </section>
        <section class="wykonanie">
            <div class="wykonanie__left">
                <h2 class="wykonanie__heading">Staranne wykonanie</h2>
                <p class="wykonanie__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!</p>
            </div>
            <div class="wykonanie__right">
                <div class="wykonanie__rect">
                    <img src="img/chair1.png" alt="krzesło" class="wykonanie__rect__img">
                    <img src="img/icons/plus-icon.png" alt="przycisk z plusem" class="wykonanie__rect__plus">
                </div>
                <div class="wykonanie__rect">
                    <img src="img/chair2.png" alt="krzesło" class="wykonanie__rect__img">
                    <img src="img/icons/plus-icon.png" alt="przycisk z plusem" class="wykonanie__rect__plus">
                </div>
                <div class="wykonanie__rect">
                    <img src="img/chair3.png" alt="krzesło" class="wykonanie__rect__img">
                    <img src="img/icons/plus-icon.png" alt="przycisk z plusem" class="wykonanie__rect__plus">
                </div>
            </div>
        </section>
        <section class="dlaczego">
            <div class="dlaczego__left">
                <h2 class="dlaczego__heading">Dlaczego akurat my?</h2>
                <div class="dlaczego__grid">
                    <div class="dlaczego__grid__square">
                        <img src="img/icons/szybka-dostawa-icon.png" alt="samochód dostawczy" class="dlaczego__grid__square__icon">
                        <p class="dlaczego__grid__square__text">Szybka dostawa</p>
                    </div>
                    <div class="dlaczego__grid__square">
                        <img src="img/icons/zadowolenie-icon.png" alt="uśmiechnięta twarz" class="dlaczego__grid__square__icon">
                        <p class="dlaczego__grid__square__text">Zadowolenie klientów</p>
                    </div>
                    <div class="dlaczego__grid__square">
                        <img src="img/icons/wsparcie-icon.png" alt="wsparcie" class="dlaczego__grid__square__icon">
                        <p class="dlaczego__grid__square__text">Wsparcie 24/7</p>
                    </div>
                    <div class="dlaczego__grid__square">
                        <img src="img/icons/pomoc-ekspertow-icon.png" alt="książka" class="dlaczego__grid__square__icon">
                        <p class="dlaczego__grid__square__text">Pomoc ekspertów</p>
                    </div>
                </div>
            </div>
            <div class="circle circle--primary"></div>
            <img src="img/dlaczego-my.jpg" alt="urządzone pomieszczenie" class="dlaczego__img">
        </section>
        <section class="pomagamy">
            <img src="img/pomagamy-urzadzac.jpg" alt="urządzone pomieszczenie" class="pomagamy__img">
            <div class="circle circle--secondary"></div>
            <div class="pomagamy__right">
                <h2 class="pomagamy__heading">Pomagamy urządzać</h2>
                <p class="pomagamy__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime doloremque iste blanditiis voluptates fuga natus debitis commodi tempore, saepe tenetur.</p>
            </div>
        </section>
        <section class="modern">
            <h2 class="modern__heading">Nowoczesny styl</h2>
            <div class="modern__grid">
                <img src="img/modern1.jpg" alt="urządzone pomieszczenie" class="modern__grid__img">
                <img src="img/modern2.jpg" alt="urządzone pomieszczenie" class="modern__grid__img">
                <img src="img/modern3.jpg" alt="urządzone pomieszczenie" class="modern__grid__img">
                <img src="img/modern4.jpg" alt="urządzone pomieszczenie" class="modern__grid__img">
            </div>
        </section>
        <section class="newsletter">
            <h2 class="newsletter__heading">Otrzymuj nowości związane ze zniżkami i inne</h2>
            <form class="newsletter__form">
                <input type="text" class="newsletter__form__input" placeholder="Podaj adres e-mail">
                <button class="newsletter__form__submit" type="submit">
                    <img src="img/icons/send-icon.png" alt="wyślij" class="newsletter__form__submit__icon">
                </button>
            </form>
            <p class="newsletter__error"></p>
        </section>
        <div class="sponsorzy">
            <img src="img/sponsorzy/ashley.png" alt="logo ashley" class="sponsorzy__img ashley">
            <img src="img/sponsorzy/bassett.png" alt="logo bassett" class="sponsorzy__img bassett">
            <img src="img/sponsorzy/decor.png" alt="logo decors" class="sponsorzy__img decor">
            <img src="img/sponsorzy/best-furniture.png" alt="logo best furniture" class="sponsorzy__img best-furniture">
            <img src="img/sponsorzy/fabuwood.png" alt="logo fabuwood" class="sponsorzy__img fabuwood">
            <img src="img/sponsorzy/hound.png" alt="logo hound" class="sponsorzy__img hound">
        </div>
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