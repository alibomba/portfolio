<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bobby Koszyk</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/cart.css">
    <script src="kontakt_dropdown.js" defer></script>
    <script src="cart.js" defer></script>
</head>
<body>
    <header class="header">
        <a href="homepage"><img class="header__logo" src="img/logo.png" alt="bobby restaurant logo"></a>
        <div class="header__nav">
            <a class="header__nav-link" href="menu">Menu</a>
            <a class="header__nav-link" href="koszyk">Koszyk</a>
            <p class="header__nav-link header__kontakt">Kontakt</p>
            <div class="kontakt-dropdown">
                <p><span class="bold">Tel:</span> +48 112 245 823</p>
                <img class="close-kontakt-dropdown" src="img/icons/close-icon.png" alt="close icon">
            </div>
        </div>
    </header>
    <main>
        <div class="produkty"></div>
        <button class="kup-teraz">Kup teraz</button>
    </main>
    <div class="kup-modal">
        <form id="kup-form">
            <div class="okienko">
                <label for="miasto">Miasto:</label>
                <input type="text" id="miasto" class="field">
            </div>
            <div class="okienko">
                <label for="kod-pocztowy">Kod pocztowy:</label>
                <input type="text" id="kod-pocztowy" class="field">
            </div>
            <div class="okienko">
                <label for="adres">Adres:</label>
                <input type="text" id="adres" class="field">
            </div>
            <div class="okienko">
                <label for="nr-tel">Nr telefonu:</label>
                <input type="text" id="nr-tel" class="field">
            </div>
            <div class="cena">
                <p>Produkty: <span class="produkty__price bold"></span> zł</p>
                <p>Dostawa: <span class="bold">5.99</span> zł</p>
            </div>
            <div class="cena">
                <p>Do zapłaty: <span class="do-zaplaty__price bold"></span> zł</p>
            </div>
            <input type="submit" value="Zapłać" class="zaplac-button">
        </form>
        <img class="kup-teraz__close" src="img/icons/close-icon.png" alt="close icon">
    </div>
    <div class="popup">Pomyślnie złożono zamówienie</div>
</body>
</html>