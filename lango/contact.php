<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kontakt</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/contact.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/contact.js" defer></script>
</head>
<body>
    <header>
        <nav class="header">
            <a href="homepage">
                <img src="img/logo.png" alt="logo Lango" class="header__logo">
            </a>
            <div class="header__nav">
                <a href="uslugi" class="header__nav-link">Usługi</a>
                <a href="aplikacja" class="header__nav-link">Aplikacja</a>
                <a href="kontakt" class="header__nav-link">Kontakt</a>
                <a href="o-nas" class="header__nav-link">O nas</a>
            </div>
            <div class="header__social-links">
                <a href="https://www.youtube.com/" target="_blank" class="social-link">
                    <img src="img/icons/youtube-icon.png">
                </a>
                <a href="https://www.facebook.com/" target="_blank" class="social-link">
                    <img src="img/icons/facebook-icon.png">
                </a>
                <a href="https://twitter.com/home" target="_blank" class="social-link">
                    <img src="img/icons/twitter-icon.png">
                </a>
            </div>
        </nav>
        <div class="header--mobile">
            <div class="header--mobile__top">
                <a href="homepage">
                    <img src="img/logo.png" alt="logo Lango" class="header__logo">
                </a>
                <button class="header--mobile__hamburger">
                    <img src="img/icons/hamburger-icon.png">
                </button>
            </div>
            <nav class="header--mobile__content">
                <a href="uslugi" class="header__nav-link">Usługi</a>
                <a href="aplikacja" class="header__nav-link">Aplikacja</a>
                <a href="kontakt" class="header__nav-link">Kontakt</a>
                <a href="o-nas" class="header__nav-link">O nas</a>
                <a href="https://www.youtube.com/" target="_blank" class="social-link">
                    <img src="img/icons/youtube-icon.png">
                </a>
                <a href="https://www.facebook.com/" target="_blank" class="social-link">
                    <img src="img/icons/facebook-icon.png">
                </a>
                <a href="https://twitter.com/home" target="_blank" class="social-link">
                    <img src="img/icons/twitter-icon.png">
                </a>
            </nav>
        </div>
    </header>
    <main>
        <label id="label">Wybierz usługę</label>
        <div class="combo">
            <div value="null" tabindex="0" role="combobox" aria-labelledby="label" aria-controls="combo__list" aria-expanded="false" class="combo__button"><span class="combo__button__text">Wybierz usługę</span><img class="combo__button__arrow" src="img/icons/down-arrow-icon.png"></div>
            <div role="listbox" id="combo__list" class="combo__list">
                <div role="option" id="tlumaczenie-na-zywo" class="combo__list__option">Tłumaczenie na żywo</div>
                <div role="option" id="transkrypcja" class="combo__list__option">Transkrypcja</div>
                <div role="option" id="tworzenie-napisow" class="combo__list__option">Tworzenie napisów</div>
                <div role="option" id="tlumaczenie-stron-i-aplikacji" class="combo__list__option">Tłumaczenie stron internetowych i aplikacji</div>
                <div role="option" id="rozwiazania-technologiczne" class="combo__list__option">Rozwiązania technologiczne</div>
                <div role="option" id="tlumaczenie-dokumentow" class="combo__list__option">Tłumaczenie dokumentów</div>
                <div role="option" id="interpretacja" class="combo__list__option">Interpretacja</div>
                <div role="option" id="testowanie-programow-i-aplikacji" class="combo__list__option">Testowanie programów i aplikacji</div>
                <div role="option" id="produkcja-wideo" class="combo__list__option">Produkcja wideo</div>
                <div role="option" id="szkolenie-jezykowe-personelu" class="combo__list__option">Szkolenie językowe personelu</div>
                <div role="option" id="tworzenie-tresci" class="combo__list__option">Tworzenie treści</div>
                <div role="option" id="marketing-wielokulturowy" class="combo__list__option">Marketing wielokulturowy</div>
                <div role="option" id="zarzadzanie-globalna-kampania" class="combo__list__option">Zarządzanie globalną kampanią</div>
                <div role="option" id="tlumaczenie-wiadomosci" class="combo__list__option">Tłumaczenie wiadomości</div>
                <div role="option" id="tlumaczenie-rozmow-telefonicznych" class="combo__list__option">Tłumaczenie rozmów telefonicznych</div>
                <div role="option" id="wsparcie-klienta" class="combo__list__option">Wsparcie klienta</div>
                <div role="option" id="inne" class="combo__list__option">Inne(opisz szczegóły)</div>
            </div>
        </div>
        <form class="form">
            <div class="form__grid">
                <input maxlength="25" id="imie" placeholder="Imię" type="text" class="form__grid__input">
                <input maxlength="25" id="nazwisko" placeholder="Nazwisko" type="text" class="form__grid__input">
                <input maxlength="25" id="email" placeholder="Adres e-mail" type="text" class="form__grid__input">
                <input maxlength="25" id="nr_tel" placeholder="Nr telefonu" type="text" class="form__grid__input">
                <input maxlength="25" id="firma" placeholder="Nazwa firmy" type="text" class="form__grid__input">
                <textarea maxlength="300" id="tresc" placeholder="Szczegóły" rows="5" class="form__grid__input"></textarea>
            </div>
            <input type="submit" value="Wyślij zgłoszenie" class="form__button">
            <p class="form__response"></p>
        </form>
    </main>
    <footer>
        <a href="homepage"><img src="img/logo.png" alt="logo Lango" class="footer__logo"></a>
        <div class="footer__nav" aria-label="Footer navigation">
            <a href="#" class="footer__nav-link">Polityka prywatności</a>
            <a href="o-nas" class="footer__nav-link">O nas</a>
            <a href="#" class="footer__nav-link">Regulamin strony</a>
            <a href="#" class="footer__nav-link">Lorem</a>
            <a href="kontakt" class="footer__nav-link">Kontakt</a>
            <a href="#" class="footer__nav-link">Ipsum</a>
        </div>
    </footer>
</body>
</html>