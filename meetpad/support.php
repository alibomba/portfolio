<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_SESSION['zalogowano']) || $_SESSION['zalogowano']!==true){
        header('Location: logowanie');
        exit();
    }
    $idkonta = $_SESSION['idkonta'];
    $query = "SELECT * FROM users WHERE userid='$idkonta'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $konto = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meetpad - Wsparcie</title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Portal społecznościowy inspirowany Facebookiem. Znajdź swoich znajomych i komunikuj sie z nimi za pomocą naszego serwisu. Możesz również poznawać nowe osoby dzięki naszym algorytmom. Publikuj posty dla swoich znajomych. Załóż darmowe konto już teraz!">
    <meta name="keywords" content="facebook, social media, social, media, portal, spolecznosciowy, portal spolecznosciowy, instagram, twitter">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/support.css">
    <script src="scripts/switch_sidebar.js" defer></script>
    <script src="scripts/light_or_dark_mode.js" defer></script>
    <script src="scripts/account_settings_tooltip.js" defer></script>
    <script src="scripts/support.js" defer></script>
    <script src="scripts/notifications.js" defer></script>
</head>
<body>
    <?php
        include 'inc/header.php';
        include 'inc/sidebar.php';
    ?>
    <main>
        <form id="support_form">
        <section class="support">
            <header class="support__header">
                <h2>Zgłaszanie problemów</h2>
            </header>
            <main class="support__main">
                <div class="container">
                    <label for="temat">Temat</label>
                    <input type="text" placeholder="Temat" id="temat">
                    <label for="support_content">Treść</label>
                    <textarea class="content" id="support_content" placeholder="Treść"></textarea>
                    <input type="submit" value="Prześlij" class="send">
                </div>
            </main>
        </section>
        </form>
        <form id="feedback_form">
        <section class="feedback">
            <header class="feedback__header">
                <h2>Prześlij opinię</h2>
            </header>
            <main class="feedback__main">
                <div class="container">
                    <label for="feedback_content">Treść</label>
                    <textarea class="content" id="feedback_content" placeholder="Treść"></textarea>
                    <input type="submit" value="Prześlij" class="send">
                </div>
            </main>
        </section>
        </form>
    </main>
</body>
</html>