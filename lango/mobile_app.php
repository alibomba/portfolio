<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikacja Mobilna</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/mobile_app.css">
    <script src="scripts/generic.js" defer></script>
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
        <section class="section">
            <img src="img/phone.png" alt="iphone" class="aplikacja__img">
            <div class="section__group">
                <h2 class="section__group__heading">Aplikacja mobilna Lango</h2>
                <p class="section__group__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus veniam commodi quis, consectetur natus soluta est perferendis iusto. Odio quis libero soluta natus. Repellat, amet.</p>
            </div>
        </section>
        <section class="section">
            <img src="img/rozmawiaj-za-granica.jpg" alt="globus" class="section__img section__img--secondary">
            <div class="section__group">
                <h2 class="section__group__heading">Rozmawiaj za granicą</h2>
                <p class="section__group__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum possimus quo inventore facilis quae, magnam, nam iusto at tempore minima ipsam veniam magni quidem dicta!</p>
            </div>
        </section>
        <section class="section">
            <div class="section__group">
                <h2 class="section__group__heading">Tłumaczenie tekstów i zdjęć</h2>
                <p class="section__group__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto reiciendis ipsam minima quis distinctio. Nisi ducimus illum eius id expedita hic necessitatibus dignissimos aliquam consequatur.</p>
            </div>
            <img src="img/tlumaczenie-tekstu.jpg" alt="kartka papieru z tekstem" class="section__img section__img--primary">
        </section>
        <section class="section">
            <img src="img/rozpoznawanie-jezykow.jpg" alt="chłopiec trzymający 2 flagi" class="section__img section__img--secondary">
            <div class="section__group">
                <h2 class="section__group__heading">Rozpoznawanie języków</h2>
                <p class="section__group__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. At, velit et atque labore, autem iure corporis accusamus nisi adipisci, officiis laudantium cumque vel enim assumenda?</p>
            </div>
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