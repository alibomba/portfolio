<?php
    require_once 'inc/connection.php';
    include 'inc/account-class.php';
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
    <title>Meetpad - Znajomi</title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Portal społecznościowy inspirowany Facebookiem. Znajdź swoich znajomych i komunikuj sie z nimi za pomocą naszego serwisu. Możesz również poznawać nowe osoby dzięki naszym algorytmom. Publikuj posty dla swoich znajomych. Załóż darmowe konto już teraz!">
    <meta name="keywords" content="facebook, social media, social, media, portal, spolecznosciowy, portal spolecznosciowy, instagram, twitter">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/friends.css">
    <script src="scripts/switch_sidebar.js" defer></script>
    <script src="scripts/light_or_dark_mode.js" defer></script>
    <script src="scripts/account_settings_tooltip.js" defer></script>
    <script src="scripts/notifications.js" defer></script>
</head>
<body>
    <?php include 'inc/header.php'; ?>
    <?php include 'inc/sidebar.php'; ?>
    <main class="main">
        <?php
            $znajomi = [];
            foreach($konto->znajomi($con) as $znajomy){
                $query = "SELECT * FROM users WHERE userid='$znajomy'";
                if($result = $con->query($query)){
                    $row = $result->fetch_assoc();
                    $znajomi[] = $row;
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
            }
            if(count($znajomi)!==0){
                foreach($znajomi as $row){
                    $znajobj = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
                    include 'inc/friend-component.php';
                }
            }
        ?>
    </main>
</body>
</html>