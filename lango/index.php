<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lango</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/index.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/index.js" defer></script>
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
        <section class="hero">
            <div class="hero__text">
                <p class="hero__text__top"><span class="hero__text__top__variable"></span> mogą być wszędzie</p>
                <p class="hero__text__bottom">Czy <span class="hero__text__bottom__variable"></span> mówi w ich języku?</p>
            </div>
            <div class="hero__buttons">
                <a href="uslugi" class="hero__button hero__button--secondary">Co oferujemy</a>
                <a href="kontakt" class="hero__button hero__button--primary">Wynajmij tłumacza</a>
            </div>
        </section>
    </header>
    <main>
        <section class="jezyki">
            <h2 class="section-heading">Oferujemy ponad 200 języków</h2>
            <div class="jezyki__grid">
                <img class="jezyki__grid__portugalia" src="img/icons/languages/portugalski.svg" alt="flaga Portugalii">
                <img class="jezyki__grid__japonia" src="img/icons/languages/japonski.svg" alt="flaga Japonii">
                <img class="jezyki__grid__wlochy" src="img/icons/languages/wloski.svg" alt="flaga Włoch">
                <img class="jezyki__grid__hiszpania" src="img/icons/languages/hiszpanski.svg" alt="flaga Hiszpanii">
                <img class="jezyki__grid__arabia" src="img/icons/languages/arabski.svg" alt="flaga Arabii Saudyjskiej">
                <img class="jezyki__grid__niemcy" src="img/icons/languages/niemiecki.svg" alt="flaga Niemiec">
                <img class="jezyki__grid__usa" src="img/icons/languages/usa.svg" alt="flaga Stanów Zjednoczonych">
                <img class="jezyki__grid__uk" src="img/icons/languages/uk.svg" alt="flaga Wielkiej Brytanii">
            </div>
        </section>
        <section class="benefits">
            <article class="benefits__article">
                <img src="img/icons/rozwiazania-icon.png" class="benefits__article__img">
                <h3 class="benefits__article__heading">Rozwiązania</h3>
                <p class="benefits__article__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </article>
            <article class="benefits__article">
                <img src="img/icons/app-mobilna-icon.png" class="benefits__article__img">
                <h3 class="benefits__article__heading">Aplikacja mobilna</h3>
                <p class="benefits__article__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </article>
            <article class="benefits__article">
                <img src="img/icons/eksperci-icon.png" class="benefits__article__img">
                <h3 class="benefits__article__heading">Eksperci</h3>
                <p class="benefits__article__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </article>
        </section>
        <section class="specjalizacje">
            <h2 class="section-heading">Specjalizacje tłumaczy</h2>
            <div class="specjalizacje__grid">
                <div class="specjalizacje__grid__img specjalizacje__grid__img--science" tabindex="0">
                    <p class="specjalizacje__grid__img__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quos nobis iste quas quia excepturi accusamus placeat recusandae suscipit est?</p>
                </div>
                <div class="specjalizacje__grid__img specjalizacje__grid__img--sport" tabindex="0">
                    <p class="specjalizacje__grid__img__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quos nobis iste quas quia excepturi accusamus placeat recusandae suscipit est?</p>
                </div>
                <div class="specjalizacje__grid__img specjalizacje__grid__img--medicine" tabindex="0">
                    <p class="specjalizacje__grid__img__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quos nobis iste quas quia excepturi accusamus placeat recusandae suscipit est?</p>
                </div>
                <div class="specjalizacje__grid__img specjalizacje__grid__img--law" tabindex="0">
                    <p class="specjalizacje__grid__img__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quos nobis iste quas quia excepturi accusamus placeat recusandae suscipit est?</p>
                </div>
                <div class="specjalizacje__grid__img specjalizacje__grid__img--fashion" tabindex="0">
                    <p class="specjalizacje__grid__img__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quos nobis iste quas quia excepturi accusamus placeat recusandae suscipit est?</p>
                </div>
                <div class="specjalizacje__grid__img specjalizacje__grid__img--religion" tabindex="0">
                    <p class="specjalizacje__grid__img__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quos nobis iste quas quia excepturi accusamus placeat recusandae suscipit est?</p>
                </div>
                <div class="specjalizacje__grid__img specjalizacje__grid__img--it" tabindex="0">
                    <p class="specjalizacje__grid__img__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quos nobis iste quas quia excepturi accusamus placeat recusandae suscipit est?</p>
                </div>
            </div>
        </section>
        <section class="uslugi">
            <h2 class="section-heading">Przykładowe usługi</h2>
            <div class="uslugi__row">
                <article class="uslugi__article">
                    <img src="img/icons/services/tlumaczenie-icon.png" class="uslugi__article__img">
                    <h3 class="uslugi__article__heading">Tłumaczenie</h3>
                    <p class="uslugi__article__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </article>
                <article class="uslugi__article">
                    <img src="img/icons/services/transkrypcja-icon.png" class="uslugi__article__img">
                    <h3 class="uslugi__article__heading">Transkrypcja</h3>
                    <p class="uslugi__article__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </article>
                <article class="uslugi__article">
                    <img src="img/icons/services/napisy-icon.png" class="uslugi__article__img">
                    <h3 class="uslugi__article__heading">Tworzenie napisów</h3>
                    <p class="uslugi__article__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </article>
            </div>
            <a href="uslugi" class="uslugi__button">Zobacz wszystkie</a>
        </section>
        <section class="partnerzy">
            <h2 class="section-heading">Współpracujemy / współpracowaliśmy z</h2>
            <div class="partnerzy__row">
                <a href="https://www.asus.com/pl/" target="_blank"><img src="img/loga_partnerow/asus.png" alt="logo Asus" class="partnerzy__img"></a>
                <a href="https://www.bosch.pl/" target="_blank"><img src="img/loga_partnerow/bosch.png" alt="logo Bosch" class="partnerzy__img"></a>
                <a href="https://www.ea.com/pl-pl" target="_blank"><img src="img/loga_partnerow/ea.png" alt="logo EA" class="partnerzy__img"></a>
                <a href="https://www.underarmour.eu/en-pl/" target="_blank"><img src="img/loga_partnerow/under_armor.png" alt="logo Under Armour" class="partnerzy__img"></a>
                <a href="https://www.vans.pl/" target="_blank"><img src="img/loga_partnerow/vans.png" alt="logo Vans" class="partnerzy__img"></a>
                <a href="https://www.ford.pl/" target="_blank"><img src="img/loga_partnerow/ford.png" alt="logo Ford" class="partnerzy__img"></a>
            </div>
        </section>
        <section class="testimonials">
            <h2 class="section-heading">Co mowią nasi klienci?</h2>
            <div class="testimonials__container">
                <article class="testimonials__element testimonials__element--secondary">
                    <div class="element__top">
                        <p class="element__top__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <svg class="element__top__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"/></svg>
                    </div>
                    <div class="element__bottom">
                        <img src="img/testimonials/mikhail-nilov.jpg" alt="Mikhail Nilov" class="element__bottom__img">
                        <div class="element__bottom__right">
                            <p class="element__bottom__right__author">Mikhail Nilov</p>
                            <p class="element__bottom__right__job">Programistka</p>
                        </div>
                    </div>
                </article>

                <article class="testimonials__element testimonials__element--primary">
                    <div class="element__top">
                        <p class="element__top__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <svg class="element__top__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"/></svg>
                    </div>
                    <div class="element__bottom">
                        <img src="img/testimonials/daniel-duarte.jpg" alt="Daniel Duarte" class="element__bottom__img">
                        <div class="element__bottom__right">
                            <p class="element__bottom__right__author">Daniel Duarte</p>
                            <p class="element__bottom__right__job">Projektantka</p>
                        </div>
                    </div>
                </article>

                <article class="testimonials__element testimonials__element--secondary">
                    <div class="element__top">
                        <p class="element__top__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <svg class="element__top__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"/></svg>
                    </div>
                    <div class="element__bottom">
                        <img src="img/testimonials/victoria-strelkaph.jpg" alt="Victoria Strelkaph" class="element__bottom__img">
                        <div class="element__bottom__right">
                            <p class="element__bottom__right__author">Victoria Strelkaph</p>
                            <p class="element__bottom__right__job">Montażystka</p>
                        </div>
                    </div>
                </article>

                <article class="testimonials__element testimonials__element--primary">
                    <div class="element__top">
                        <p class="element__top__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <svg class="element__top__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.301 4c.411 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.738 4.129-4.308 4.129-3.24 0-4.83-2.547-4.83-5.307 0-5.98 6.834-10.693 8.468-10.693zm-10.833 0c.41 0 .699.313.699.663 0 .248-.145.515-.497.702-1.788.948-3.858 4.226-3.858 6.248 3.016-.092 4.326 2.582 4.326 4.258 0 2.007-1.739 4.129-4.308 4.129-3.241 0-4.83-2.547-4.83-5.307 0-5.98 6.833-10.693 8.468-10.693z" fill-rule="nonzero"/></svg>
                    </div>
                    <div class="element__bottom">
                        <img src="img/testimonials/airam-datoon.jpg" alt="Airam Datoon" class="element__bottom__img">
                        <div class="element__bottom__right">
                            <p class="element__bottom__right__author">Airam Datoon</p>
                            <p class="element__bottom__right__job">Pisarka</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <section class="newsletter">
            <h2 class="section-heading">Otrzymuj nowości</h2>
            <form class="newsletter__form">
                <input type="text" class="newsletter__input">
                <input type="submit" value="Zapisz się" class="newsletter__button">
            </form>
            <p class="newsletter__info"></p>
        </section>
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