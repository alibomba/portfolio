<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['userid'])){
        if(authorize_user($_SESSION['userid'],$_SESSION['PHPSESSID'],$_SESSION['token'],$con)){
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
    <title>Travely</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/index.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/filtr_ofert.js" defer></script>
    <script src="scripts/testimonials.js" defer></script>
</head>
<body>
    <?php include 'inc/header.php'; ?>
    <div class="hero">
        <form class="filtr-ofert">
            <div class="filtr-ofert__top">
                <div class="filtr-ofert__element">
                    <label for="cel" class="element__label">Cel podróży:</label>
                    <input type="text" placeholder="Miasto" id="cel" class="filtr-ofert__input" autocomplete="off">
                    <div class="filtr-ofert__element__dropdown">
                    </div>
                    <svg class="location-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                </div>
                <div class="filtr-ofert__element">
                    <label for="poczatek" class="element__label">Początek:</label>
                    <input type="date" id="poczatek" class="filtr-ofert__input">
                </div>
                <div class="filtr-ofert__element">
                    <label for="koniec" class="element__label">Koniec:</label>
                    <input type="date" id="koniec" class="filtr-ofert__input">
                </div>
                <div class="filtr-ofert__element">
                    <p class="element__label">Osób:</p>
                    <div class="element__row">
                        <svg class="element__row__minus | element__row__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="34" height="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm4.253 9.25h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" fill-rule="nonzero"/></svg>
                        <p class="element__number">2</p>
                        <svg class="element__row__plus | element__row__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="34" height="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm-.747 9.25h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
                    </div>                    
                </div>
                <div class="filtr-ofert__element">
                    <p class="element__label">Maksymalna cena:</p>
                    <p class="element__cena"><span class="element__cena__number">6000</span>zł</p>
                    <input type="range" class="element__slider">
                </div>
            </div>
            <div class="filtr-ofert__error"></div>
            <div class="filtr-ofert__good"></div>
            <input type="submit" value="Szukaj" class="filtr-ofert__button">
        </form>
    </div>
    <div class="najczesciej">
        <h2 class="najczesciej__heading">Najczęściej wybierane oferty</h2>
        <div class="najczesciej__row">
            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Berlin.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle | data__circle--first">
                        <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 9h-17v-6h17l3 3-3 3zm-6 10h-4v5h4v-5zm0-19h-4v2h4v-2zm-10 11h17v6h-17l-3-3 3-3z"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Berlin</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Niemcy</div>
                        </div>
                    </div>
                    <div class="data__right">700zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--first">Szczegóły</a>
            </div>

            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Londyn.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle | data__circle--second">
                        <svg class="data__circle__icon" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M22.856 6.912c-1.36 5.26-6.115 9.959-12.541 12.443.977 1.273 4.071 3.382 5.837 3.892 4.578-1.691 7.848-6.081 7.848-11.247 0-1.821-.418-3.542-1.144-5.088m-15.224 6.699c.119 1.538.613 2.921 1.355 4.094 6.817-2.445 11.584-7.587 12.474-13.067-.824-1.058-1.818-1.975-2.946-2.706-1.437 6.91-7.647 10.345-10.883 11.679m-2.045-1.045c-1.216-1.41-2.604-2.484-5.347-2.96-.157.774-.24 1.574-.24 2.394 0 6.628 5.372 12 12 12 .496 0 .981-.039 1.461-.097-3.253-1.323-8.032-5.669-7.874-11.337m1.78-1.022c1.209-.534 2.74-1.34 4.222-2.485-2.185-2.84-5.239-4.997-8.252-5.349-1.085 1.133-1.946 2.478-2.522 3.968 3.384.647 5.127 2.152 6.552 3.866m-2.356-9.285c1.969-1.416 4.378-2.259 6.989-2.259 1.647 0 3.216.333 4.645.934-.45 2.861-1.835 5.102-3.537 6.793-2.105-2.675-5.203-4.78-8.097-5.468"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Londyn</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Anglia</div>
                        </div>
                    </div>
                    <div class="data__right">630zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--second">Szczegóły</a>
            </div>

            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Dżakarta.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle | data__circle--third">
                        <svg class="data__circle__icon" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20.655 22.122v-2.197c1.907-.418 3.345-2.235 3.345-4.41 0-1.381-.292-1.662-3.536-10.041-.012 0-.16-.459-.646-.459-.488 0-.633.461-.643.461-.611 1.58-1.11 2.863-1.528 3.937.73 1.813.853 2.414.853 3.435 0 1.969-.884 3.737-2.289 4.935.59 1.085 1.59 1.883 2.771 2.142v1.744c-1.538-.339-3.53-.586-6.065-.637v-2.761c2.599-.436 4.583-2.7 4.583-5.423 0-1.687-.384-2.031-4.653-12.271-.014 0-.209-.562-.847-.562-.643 0-.833.564-.847.564-4.633 11.145-4.653 10.837-4.653 12.269 0 2.723 1.984 4.987 4.583 5.423v2.761c-2.562.051-4.571.303-6.116.648v-1.755c1.186-.263 2.187-1.077 2.769-2.186-1.375-1.198-2.236-2.946-2.236-4.891 0-.934.024-1.277.844-3.324-.424-1.088-.938-2.41-1.567-4.05-.011 0-.157-.459-.638-.459-.484 0-.627.461-.637.461-3.487 9.119-3.502 8.867-3.502 10.039 0 2.175 1.423 3.992 3.311 4.41v2.208c-2.587.852-3.311 1.882-3.311 1.882h24s-.732-1.038-3.345-1.893z"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Dżakarta</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Indonezja</div>
                        </div>
                    </div>
                    <div class="data__right">980zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--third">Szczegóły</a>
            </div>
        </div>
    </div>
    <div class="uslugi">
        <h2 class="uslugi__heading">Nasze usługi</h2>
        <div class="uslugi__row">
            <div class="uslugi__row__square">
                <svg class="uslugi-icon" width="120" height="120" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M10.865 17.097c-2.289.805-5.172-.535-5.755-2.756-2.878-.005-5.086-1.408-5.11-3.886-.038-4.031 4.516-9.448 12-9.455 7.485-.007 11.996 5.312 12 10.329.004 5.017-4.182 6.897-7.607 6.263-.364 1.507-.171 3.578.232 4.747l-2.109.661c-.813-2.788-2.2-4.967-3.651-5.903zm-.692-9.276c-.691-.314-1.173-1.012-1.173-1.821 0-1.104.896-2 2-2s2 .896 2 2c0 .26-.05.509-.14.738 1.214.911 2.405 1.855 3.599 2.794.425-.333.96-.532 1.541-.532 1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5c-1.171 0-2.155-.807-2.426-1.895-1.201.098-2.404.173-3.606.254-.169.933-.987 1.641-1.968 1.641-1.104 0-2-.896-2-2 0-1.033.785-1.884 1.79-1.989.121-.731.252-1.46.383-2.19zm2.06-.246c-.297.232-.661.383-1.058.417l-.363 2.18c.504.224.898.651 1.08 1.177l3.647-.289c.047-.267.137-.519.262-.749l-3.568-2.736z"/></svg>
                <p class="uslugi__text">Logistyka</p>
            </div>

            <div class="uslugi__row__square">
                <svg class="uslugi-icon" width="120" height="120" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M3.691 10h6.309l-3-7h2l7 7h5c1.322-.007 3 1.002 3 2s-1.69 1.993-3 2h-5l-7 7h-2l3-7h-6.309l-2.292 2h-1.399l1.491-4-1.491-4h1.399l2.292 2"/></svg>
                <p class="uslugi__text">Lot</p>
            </div>

            <div class="uslugi__row__square">
                <svg class="uslugi-icon" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewbox="0 0 24 24"><path d="M21.739 10.921c-1.347-.39-1.885-.538-3.552-.921 0 0-2.379-2.359-2.832-2.816-.568-.572-1.043-1.184-2.949-1.184h-7.894c-.511 0-.736.547-.07 1-.742.602-1.619 1.38-2.258 2.027-1.435 1.455-2.184 2.385-2.184 4.255 0 1.76 1.042 3.718 3.174 3.718h.01c.413 1.162 1.512 2 2.816 2 1.304 0 2.403-.838 2.816-2h6.367c.413 1.162 1.512 2 2.816 2s2.403-.838 2.816-2h.685c1.994 0 2.5-1.776 2.5-3.165 0-2.041-1.123-2.584-2.261-2.914zm-15.739 6.279c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2zm3.576-6.2c-1.071 0-3.5-.106-5.219-.75.578-.75.998-1.222 1.27-1.536.318-.368.873-.714 1.561-.714h2.388v3zm1-3h1.835c.882 0 1.428.493 2.022 1.105.452.466 1.732 1.895 1.732 1.895h-5.588v-3zm7.424 9.2c-.662 0-1.2-.538-1.2-1.2s.538-1.2 1.2-1.2 1.2.538 1.2 1.2-.538 1.2-1.2 1.2z"/></svg>
                <p class="uslugi__text">Transport</p>
            </div>

            <div class="uslugi__row__square">
                <svg class="uslugi-icon" width="120" height="120" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 19v-7h-23v-7h-1v14h1v-2h22v2h1zm-20-12c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm19 4c0-1.657-1.343-3-3-3h-13v3h16z"/></svg>
                <p class="uslugi__text">Nocleg</p>
            </div>
        </div>
    </div>
    <div class="testimonials">
        <svg class="testimonials-icon" xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 24 24"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
        <div class="testimonials__right">
            <h2 class="testimonials__right__heading">Opinie klientów</h2>
            <p class="testimonials__right__text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'</p>
            <div class="testimonials__right__circles">
                <div class="testimonials__right__circle"></div>
                <div class="testimonials__right__circle"></div>
                <div class="testimonials__right__circle testimonials__right__circle--active"></div>
                <div class="testimonials__right__circle"></div>
                <div class="testimonials__right__circle"></div>
            </div>
        </div>
    </div>
    <div class="liczby">
        <div class="liczby__element">
            <p class="liczby__number">300</p>
            <p class="liczby__desc">Miast</p>
        </div>
        <div class="liczby__element">
            <div class="liczby__number">12 887</div>
            <div class="liczby__desc">Sprzedanych<br>produktów</div>
        </div>
        <div class="liczby__element">
            <div class="liczby__number">6 912</div>
            <div class="liczby__desc">Założonych kont</div>
        </div>
        <div class="liczby__element">
            <div class="liczby__number">983</div>
            <div class="liczby__desc">Opinii klientów</div>
        </div>
    </div>
    <?php include 'inc/footer.php'; ?>
</body>
</html>