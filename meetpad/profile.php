<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    include 'inc/post-class.php';
    session_start();
    if(!isset($_SESSION['zalogowano']) || $_SESSION['zalogowano'] !== true){
        header('Location: logowanie');
    }
    if(!isset($_GET['user'])){
        header('Location: homepage');
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
    
    if($_GET['user']==$konto->userid){
        $myprofile = true;
        $profile = $konto;
    }
    else{
        $myprofile = false;
        $user = $_GET['user'];
        $query = "SELECT * FROM users WHERE userid = '$user'";
        if($result = $con->query($query)){
            $row = $result->fetch_assoc();
            $profile = new Account($row['userid'], $row['imie'],$row['nazwisko'], $row['email'],$row['dob'], $row['data_dolaczenia'], $row['profilowe'], $row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }
    if(!isset($_GET['wybor'])){
        $wybor = 'posty';
    }
    else{
        $wybor = $_GET['wybor'];
    }

?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil / <?php echo $profile->full_name(); ?></title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Portal społecznościowy inspirowany Facebookiem. Znajdź swoich znajomych i komunikuj sie z nimi za pomocą naszego serwisu. Możesz również poznawać nowe osoby dzięki naszym algorytmom. Publikuj posty dla swoich znajomych. Załóż darmowe konto już teraz!">
    <meta name="keywords" content="facebook, social media, social, media, portal, spolecznosciowy, portal spolecznosciowy, instagram, twitter">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/feed.css">
    <link rel="stylesheet" href="css/profil.css">
    <script src="scripts/switch_sidebar.js" defer></script>
    <script src="scripts/light_or_dark_mode.js" defer></script>
    <script src="scripts/like_button_ajax.js" defer></script>
    <script src="scripts/post_tooltips.js" defer></script>
    <script src="scripts/comment_upload_ajax.js" defer></script>
    <script src="scripts/comment_like_ajax.js" defer></script>
    <script src="scripts/account_settings_tooltip.js" defer></script>
    <script src="scripts/wzmianki.js" defer></script>
    <script src="scripts/add_friend_ajax.js" defer></script>
    <script src="scripts/notifications.js" defer></script>
</head>
<body>
<?php
    include 'inc/header.php';
    include 'inc/sidebar.php';
?>
<main class="main">
    <header class="profile__header">
            <div class="profile__header__top">
                <img class="pfp profile__pfp" src="<?php echo $profile->profilowe; ?>" alt="<?php echo $profile->full_name(); ?>'s profile picture">
                <div class="profile__header__right">
                    <p class="profile__surname"><?php echo $profile->full_name(); ?></p>
                    <div class="profile__header__buttons">
                        <?php
                            $zaproszony = $profile->userid;
                            $zapraszajacy = $konto->userid;

                            $query = "SELECT idzaproszenia FROM zaproszenia_do_znaj WHERE ((zaproszony='$zaproszony' AND zapraszajacy='$zapraszajacy') OR (zaproszony='$zapraszajacy' AND zapraszajacy='$zaproszony')) AND stan='oczekujace'";
                            if($result = $con->query($query)){
                                if($result->num_rows>0){
                                    $wyslano = true;
                                    $class = 'add-friend-button--cancel';
                                    $img = 'img/icons/cancel-friend-invite-icon.png';
                                    $content = 'Anuluj zaproszenie';
                                }
                                else{
                                    $wyslano = false;
                                }
                            }
                            else{
                                echo 'Błąd bazy danych nr '.$con->connect_errno;
                                exit();
                            }

                            $query = "SELECT idzaproszenia FROM zaproszenia_do_znaj WHERE ((zaproszony='$zaproszony' AND zapraszajacy='$zapraszajacy') OR (zaproszony='$zapraszajacy' AND zapraszajacy='$zaproszony')) AND stan='zaakceptowane'";
                            if($result = $con->query($query)){
                                if($result->num_rows>0){
                                    $znajomi = true;
                                    $class = 'add-friend-button--delete';
                                    $img = 'img/icons/delete-friend-icon.png';
                                    $content = 'Usuń znajomego';
                                }
                                else{
                                    $znajomi = false;
                                }
                            }
                            else{
                                echo 'Błąd bazy danych nr '.$con->connect_errno;
                                exit();
                            }

                            if($wyslano === false && $znajomi === false){
                                $class = 'add-friend-button--add';
                                $img = 'img/icons/add-friend-icon.png';
                                $content = 'Dodaj do znajomych';
                            }

                            if(!$myprofile){
                                echo '<button onclick="sendFriendRequest(event,'.$profile->userid.')" class="add-friend-button '.$class.' profile__add-friend"><img src="'.$img.'" alt="add friend icon"><span class="add-friend-button__content">'.$content.'</span></button>
                                <button class="message-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" class="messages-icon" d="M0 3v18h24v-18h-24zm22 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z"/></svg>Wyślij wiadomość</button>';
                            }
                            else{
                                echo '<a href="ustawienia?tab=ogolne" class="edit-profile-button">Edytuj profil</a>';
                            }
                        ?>
                    </div>
                </div>
            </div>
            <?php
                if(!$myprofile){
                    echo '<p class="profile__header__bottom">'.$profile->znajomi.' znajomych &middot; Wspólni znajomi: '.count($profile->wspolni_znajomi($konto,$con)).'</p>';
                }
            ?>
    </header>
    <section class="pasek-wyboru">
        <a <?php if($wybor=='posty'){ echo 'class="wybrana-opcja"'; } ?> href="profile?user=<?php echo $profile->userid; ?>&wybor=posty">Posty</a>
        <a <?php if($wybor=='informacje'){ echo 'class="wybrana-opcja"'; } ?> href="profile?user=<?php echo $profile->userid; ?>&wybor=informacje">Informacje</a>
        <a <?php if($wybor=='znajomi'){ echo 'class="wybrana-opcja"'; } ?> href="profile?user=<?php echo $profile->userid; ?>&wybor=znajomi">Znajomi</a>
        <a <?php if($wybor=='zdjecia'){ echo 'class="wybrana-opcja"'; } ?> href="profile?user=<?php echo $profile->userid; ?>&wybor=zdjecia">Zdjęcia</a>
    </section>
    <main class="profile__main">
        <?php
            switch($wybor){
                case 'posty':
                    include 'inc/profile__posts.php';
                break;
                case 'informacje':
                    include 'inc/profile__informacje.php';
                break;
                case 'znajomi':
                    include 'inc/profile__znajomi.php';
                break;
                case 'zdjecia':
                    include 'inc/profile__zdjecia.php';
                break;
            }
        ?>
    </main>
</main>
</body>
</html>

