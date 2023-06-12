<?php
    if(isset($_GET['tab'])){
        $tab = $_GET['tab'];
    }
    else{
        $tab = 'karnety';
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abonamenty</title>
    <link rel="icon" href="img/logo.svg">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/abons.css">
    <script src="abons_hover.js" defer></script>
    <script src="plany.js" defer></script>
</head>
<body>
    <header class="header">
        <a href="homepage"><img class="header__logo" src="img/logo.svg" alt="logo"></a>
        <nav class="header__nav">
            <a class="header__nav-link" href="homepage">Strona główna</a>
            <a class="header__nav-link header__nav-link--active" href="abonamenty">Abonamenty</a>
            <a class="header__nav-link" href="BMI">BMI</a>
            <a class="header__nav-link" href="kontakt">Kontakt</a>
        </nav>
    </header>
    <div class="tabs">
        <a href="abonamenty?tab=karnety" class="tab-link <?php if($tab=='karnety'){ echo 'tab-link--active'; } ?>">Karnety</a>
        <a href="abonamenty?tab=plany" class="tab-link <?php if($tab=='plany'){ echo 'tab-link--active'; } ?>">Plany</a>
        <a href="abonamenty?tab=zajecia" class="tab-link <?php if($tab=='zajecia'){ echo 'tab-link--active'; } ?>">Zajęcia</a>
        <a href="https://sklep.sfd.pl/" target="_blank" class="tab-link">Sklep</a>
    </div>
    <?php
        switch($tab){
            case 'karnety':
                include 'inc/karnety.php';
                break;
            case 'plany':
                include 'inc/plany.php';
                break;
        }
    ?>
<footer class="footer__bottom">
    <a href="homepage"><img src="img/logo-black.png" alt="black logo" class="footer__logo"></a>
    <form class="footer__bottom__cta">
        <input placeholder="Newsletter" type="text" id="newsletter" class="footer__bottom__input">
        <input type="submit" value="Wyślij" class="footer__button">
    </form>
</footer>
</body>
</html>