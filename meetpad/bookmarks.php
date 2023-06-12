<?php
    include 'inc/account-class.php';
    include 'inc/post-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_SESSION['zalogowano']) || $_SESSION['zalogowano'] !== true){
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
    <title>Meetpad - Zapisane posty</title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Portal społecznościowy inspirowany Facebookiem. Znajdź swoich znajomych i komunikuj sie z nimi za pomocą naszego serwisu. Możesz również poznawać nowe osoby dzięki naszym algorytmom. Publikuj posty dla swoich znajomych. Załóż darmowe konto już teraz!">
    <meta name="keywords" content="facebook, social media, social, media, portal, spolecznosciowy, portal spolecznosciowy, instagram, twitter">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/feed.css">
    <script src="scripts/switch_sidebar.js" defer></script>
    <script src="scripts/light_or_dark_mode.js" defer></script>
    <script src="scripts/like_button_ajax.js" defer></script>
    <script src="scripts/post_tooltips.js" defer></script>
    <script src="scripts/comment_upload_ajax.js" defer></script>
    <script src="scripts/comment_like_ajax.js" defer></script>
    <script src="scripts/account_settings_tooltip.js" defer></script>
    <script src="scripts/wzmianki.js" defer></script>
    <script src="scripts/notifications.js" defer></script>
</head>
<body>
    <?php 
        include 'inc/header.php';
        include 'inc/sidebar.php'; 
    ?>
    <section class="posts">
        <?php
            $query = "SELECT posts.* FROM posts,bookmarks WHERE bookmarks.idzapisujacego='$idkonta' AND posts.widocznosc='public' AND posts.postid=bookmarks.idposta ORDER BY bookmarks.data_zapisania DESC";
            if($result = $con->query($query)){
                $ile_postow = $result->num_rows;
                $posts = $result->fetch_all(MYSQLI_ASSOC);
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
            if($ile_postow>0){
                foreach($posts as $index=>$post){
                    $postobj[$index] = new Post($post['postid'],$post['idautora'],$post['autor_posta'],$post['prof_autora'],$post['data_wstawienia'], $post['widocznosc'], $post['lokalizacja'],$post['tresc_posta'],$post['lajki'],$post['serca'],$post['komentarze'],$post['obrazek']);
                    include 'inc/post.php';
                }
            } 
        ?>     
    </section>
</body>
</html>
