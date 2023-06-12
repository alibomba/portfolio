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
    <title>Kontakt - Travely</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/contact.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/contact.js" defer></script>
</head>
<body>
    <?php include 'inc/header.php'; ?>
    <main>
        <div class="rect">
            <div class="rect__element">
                <img src="img/icons/email-icon.svg" alt="koperta" class="rect__element__icon">
                <p class="rect__element__text">kontakt@travely.com</p>
            </div>
            <div class="rect__element">
                <img src="img/icons/phone-icon.svg" alt="phone" class="rect__element__icon">
                <p class="rect__element__text">+48 123 457 981</p>
            </div>
            <div class="rect__godziny">
                <p class="rect__godziny__heading">Godziny dostępności:</p>
                <div class="rect__godziny__godziny">
                    <p class="rect__godziny__godziny__element">Pn-Pt 6:00-22:00</p>
                    <p class="rect__godziny__godziny__element">Sb 9:00-14:00</p>
                </div>
            </div>
        </div>
        <h1>Wyślij wiadomość do wsparcia</h1>
        <form class="message">
            <div class="message__element">
                <label for="temat" class="message__element__label">Temat:</label>
                <input type="text" id="temat" class="message__element__input">
            </div>
            <div class="message__element">
                <label for="tresc" class="message__element__label">Treść:</label>
                <textarea id="tresc" cols="30" rows="8" class="message__element__textarea"></textarea>
            </div>
            <p class="message__error"></p>
            <input type="submit" value="Wyślij" class="message__button">
        </form>
    </main>
    <?php include 'inc/footer.php'; ?>
</body>
</html>