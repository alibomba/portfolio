<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_SESSION['zalogowano']) || $_SESSION['zalogowano'] !== true){
        header('Location: logowanie');
    }
    if(isset($_GET['tab'])){
        $tab = $_GET['tab'];
    }
    else{
        $tab = 'ogolne';
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
    <title>Ustawienia</title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Portal społecznościowy inspirowany Facebookiem. Znajdź swoich znajomych i komunikuj sie z nimi za pomocą naszego serwisu. Możesz również poznawać nowe osoby dzięki naszym algorytmom. Publikuj posty dla swoich znajomych. Załóż darmowe konto już teraz!">
    <meta name="keywords" content="facebook, social media, social, media, portal, spolecznosciowy, portal spolecznosciowy, instagram, twitter">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/settings.css">
    <script src="scripts/switch_sidebar.js" defer></script>
    <script src="scripts/light_or_dark_mode.js" defer></script>
    <script src="scripts/account_settings_tooltip.js" defer></script>
    <script src="scripts/settings.js" defer></script>
    <script src="scripts/notifications.js" defer></script>
</head>
<body>
    <?php
        include 'inc/header.php';
        include 'inc/sidebar.php';
    ?>
    <div class="pasek-wyboru">
        <a href="ustawienia?tab=ogolne" class="pasek-wyboru-link <?php if($tab=='ogolne'){ echo 'pasek-wyboru-link--active'; } ?>">Ogólne</a>
        <a href="ustawienia?tab=informacje" class="pasek-wyboru-link <?php if($tab=='informacje'){ echo 'pasek-wyboru-link--active'; } ?>">Informacje</a>
        <a href="ustawienia?tab=prywatnosc" class="pasek-wyboru-link <?php if($tab=='prywatnosc'){ echo 'pasek-wyboru-link--active'; } ?>">Prywatność</a>
        <a href="ustawienia?tab=powiadomienia" class="pasek-wyboru-link <?php if($tab=='powiadomienia'){ echo 'pasek-wyboru-link--active'; } ?>">Powiadomienia</a>
    </div>
    <div class="changing-content">
        <?php
            switch($tab){
                case 'ogolne':
                    include 'inc/settings__ogolne.php';
                    break;
                case 'informacje':
                    include 'inc/settings__informacje.php';
                    break;
            }
        ?>
    </div>
</body>
</html>