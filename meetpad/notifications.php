<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_SESSION['zalogowano']) || $_SESSION['zalogowano'] !== true){
        header('Location: homepage');
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
    $query = "UPDATE users SET unread_notis=0 WHERE userid='$idkonta'";
    if($con->query($query)){
        $konto->unread_notis = 0;
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
    <title>Meetpad - Powiadomienia</title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Portal społecznościowy inspirowany Facebookiem. Znajdź swoich znajomych i komunikuj sie z nimi za pomocą naszego serwisu. Możesz również poznawać nowe osoby dzięki naszym algorytmom. Publikuj posty dla swoich znajomych. Załóż darmowe konto już teraz!">
    <meta name="keywords" content="facebook, social media, social, media, portal, spolecznosciowy, portal spolecznosciowy, instagram, twitter">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/notifications.css">
    <script src="scripts/switch_sidebar.js" defer></script>
    <script src="scripts/light_or_dark_mode.js" defer></script>
    <script src="scripts/account_settings_tooltip.js" defer></script>
    <script src="scripts/notifications.js" defer></script>
</head>
<body>
    <?php
        include 'inc/header.php';
        include 'inc/sidebar.php';
    ?>
    <div class="notifications-container">
        <?php
            $query = "SELECT * FROM powiadomienia WHERE odbiorca='$idkonta' ORDER BY data_powiadomienia DESC";
            if($result = $con->query($query)){
                $all = $result->fetch_all(MYSQLI_ASSOC);
                if(count($all)>0){
                    foreach($all as $powiadomienie){
                        switch($powiadomienie['tresc']){
                            case 'wysłał/a Ci zaproszenie do grona znajomych':
                                $kto = $powiadomienie['kto_zaprosil'];
                                $redirection = 'profile?user='.$kto.'';
                                break;
                            case 'dodał/a komentarz do Twojego posta':
                                $jaki = $powiadomienie['jaki_post_skomentowano'];
                                $redirection = 'post?postid='.$jaki.'';
                                break;
                            case 'polubił/a Twój komentarz':
                                $jaki = $powiadomienie['pod_jakim_postem_polubiono_komentarz'];
                                $redirection = 'post?postid='.$jaki.'';
                                break;
                            case 'polubił/a Twój post':
                                $jaki = $powiadomienie['jaki_post_polubiono'];
                                $redirection = 'post?postid='.$jaki.'';
                                break;
                            case 'dodał/a serce do Twojego posta':
                                $jaki = $powiadomienie['jaki_post_poserduszkowano'];
                                $redirection = 'post?postid='.$jaki.'';
                                break;
                            case 'oznaczył/a Cię w poście':
                                $kto = $powiadomienie['kto_oznaczyl'];
                                $redirection = 'profile?user='.$kto.'';
                                break;
                            case 'oznaczył/a Cię w komentarzu':
                                $jaki = $powiadomienie['pod_jakim_postem_kom_oznaczono'];
                                $redirection = 'post?postid='.$jaki.'';
                                break;
                        }
                        $date = new DateTime($powiadomienie['data_powiadomienia']);
                        echo '<a href="'.$redirection.'">';
                        echo '<div class="notification-element">';
                        echo    '<img src="'.$powiadomienie['profilowe'].'" alt="'.$powiadomienie['full_name'].'\'s profile picture" class="pfp pfp--notification">';
                        echo    '<div class="notification-element__info">';
                        echo        '<span class="bold notification-element__content">'.$powiadomienie['full_name'].' '.$powiadomienie['tresc'].'</span>';
                        echo        '<span class="notification-element__ago">'.usuwacz_zer($date->format('d')).' '.tlumacz_miesiecy($date->format('M')).' '.$date->format('Y').' '.$date->format('H:i').'</span>';
                        echo'    </div>
                        </div>';
                        echo '</a>';
                    }
                }
                else{
                    echo 'Brak powiadomień';
                }
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
        ?>
    </div>
    <?php
        function tlumacz_miesiecy($miesiac){
            switch($miesiac){
                case 'Jan':
                    $tlumaczenie = 'stycznia';
                    break;
                case 'Feb':
                    $tlumaczenie = 'lutego';
                    break;
                case 'Mar':
                    $tlumaczenie = 'marca';
                    break;
                case 'Apr':
                    $tlumaczenie = 'kwietnia';
                    break;
                case 'May':
                    $tlumaczenie = 'maja';
                    break;
                case 'Jun':
                    $tlumaczenie = 'czerwca';
                    break;
                case 'Jul':
                    $tlumaczenie = 'lipca';
                    break;
                case 'Aug':
                    $tlumaczenie = 'sierpnia';
                    break;
                case 'Sep':
                    $tlumaczenie = 'września';
                    break;
                case 'Oct':
                    $tlumaczenie = 'października';
                    break;
                case 'Nov':
                    $tlumaczenie = 'listopada';
                    break;
                case 'Dec':
                    $tlumaczenie = 'grudnia';
                    break;
            }
            return $tlumaczenie;
        }

        function usuwacz_zer($dzien){
            switch($dzien){
                case '01':
                    $przetworzone = '1';
                    break;
                case '02':
                    $przetworzone = '2';
                    break;
                case '03':
                    $przetworzone = '3';
                    break;
                case '04':
                    $przetworzone = '4';
                    break;
                case '05':
                    $przetworzone = '5';
                    break;
                case '06':
                    $przetworzone = '6';
                    break;
                case '07':
                    $przetworzone = '7';
                    break;
                case '08':
                    $przetworzone = '8';
                    break;
                case '09':
                    $przetworzone = '9';
                    break;
                default:
                    $przetworzone = $dzien;
                    break;
            }
            return $przetworzone;
        }
    ?>
</body>
</html>
    
