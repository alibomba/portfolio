<?php
    include 'inc/account-class.php';
    include 'inc/post-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_SESSION['zalogowano']) || $_SESSION['zalogowano'] !== true){
        header('Location: logowanie');
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
    <title>Meetpad</title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Portal społecznościowy inspirowany Facebookiem. Znajdź swoich znajomych i komunikuj sie z nimi za pomocą naszego serwisu. Możesz również poznawać nowe osoby dzięki naszym algorytmom. Publikuj posty dla swoich znajomych. Załóż darmowe konto już teraz!">
    <meta name="keywords" content="facebook, social media, social, media, portal, spolecznosciowy, portal spolecznosciowy, instagram, twitter">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/feed.css">
    <script src="scripts/switch_sidebar.js" defer></script>
    <script src="scripts/light_or_dark_mode.js" defer></script>
    <script src="scripts/post_upload_ajax.js" defer></script>
    <script src="scripts/like_button_ajax.js" defer></script>
    <script src="scripts/post_tooltips.js" defer></script>
    <script src="scripts/comment_upload_ajax.js" defer></script>
    <script src="scripts/comment_like_ajax.js" defer></script>
    <script src="scripts/account_settings_tooltip.js" defer></script>
    <script src="scripts/wzmianki.js" defer></script>
    <script src="scripts/notifications.js" defer></script>
</head>
<body>
    <?php include 'inc/header.php'; ?>
    <?php include 'inc/sidebar.php'; ?>
    <main class="main">
        <div class="udany_upload"></div>
        <div class="modal-overlay"></div>
        <form id="create-post-form">
            <div class="location-modal">
                <p class="location-modal__heading">Lokalizacja</p>
                <input type="text" class="location-input" placeholder="Podaj lokalizację">
                <span class="location-error"></span>
                <button type="button" class="location-submit">Potwierdź</button>
            </div>
            <section class="create-post">
                <div class="create-post__top">
                    <img class="pfp" src="<?php echo $konto->profilowe; ?>" alt="user's profile picture">
                    <div class="create-post__input--container">
                        <input autocomplete="off" class="create-post__input" type="text" placeholder="Co słychać, <?php echo $konto->imie; ?>?">
                        <div class="mention-dropdown mention-dropdown--post">
                        </div>
                    </div>
                </div>
                <div class="file_error"></div>
                <div class="create-post__bottom privacy-buttons">
                    <button type="button" class="public-button active | privacy-button"><img src="img/icons/public-icon.svg" alt="public icon">Publiczny</button>
                    <button type="button" class="private-button | privacy-button"><img src="img/icons/private-icon.svg" alt="private icon">Prywatny</button>
                    <button type="button" class="create-post__file-input--label post-close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>Skończ pisać post</button>
                </div>
                <div class="create-post__bottom">
                    <input id="file" type="File" class="create-post__file-input">
                    <label for="file" class="create-post__file-input--label"><img class="create-post-icon" src="img/icons/create-post-file-icon.png" alt="camera icon"> Dodaj plik</label>
                    <button type="button" class="create-post__location"><img class="create-post-icon" src="img/icons/location-icon.png" alt="location icon">Dodaj lokalizację</button>
                    <button type="submit" class="create-post__publish"><img class="create-post-icon" src="img/icons/publish-icon.png" alt="publish icon"> Opublikuj</button>
                </div>
            </section>
        </form>
        <section class="posts">
            <?php
                $query = "SELECT * FROM posts WHERE widocznosc='public' ORDER BY data_wstawienia DESC";
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
        <section class="new-friends">
            <h2>Osoby, które możesz znać</h2>
            <div class="new-friends__blocks">
                <article class="new-friends__article">
                    <img class="add-friend__img" src="img/post1_author.jpg" alt="SOMEONE's profile picture (TO CHANGE)">
                    <div class="new-friends__user-info">
                        <span class="new-friends__user-name">Sebastian Kowalczyk</span>
                        <span class="new-friends__mutual-friends">70 wspólnych znajomych</span>
                    </div>
                    <button class="add-friend-button"><img src="img/icons/add-friend-icon.png" alt="add friend icon">Dodaj do znajomych</button>
                </article>
                <article class="new-friends__article">
                    <img class="add-friend__img" src="img/post1_author.jpg" alt="SOMEONE's profile picture (TO CHANGE)">
                    <div class="new-friends__user-info">
                        <span class="new-friends__user-name">Sebastian Kowalczyk</span>
                        <span class="new-friends__mutual-friends">70 wspólnych znajomych</span>
                    </div>
                    <button class="add-friend-button"><img src="img/icons/add-friend-icon.png" alt="add friend icon">Dodaj do znajomych</button>
                </article>
                <article class="new-friends__article">
                    <img class="add-friend__img" src="img/post1_author.jpg" alt="SOMEONE's profile picture (TO CHANGE)">
                    <div class="new-friends__user-info">
                        <span class="new-friends__user-name">Sebastian Kowalczyk</span>
                        <span class="new-friends__mutual-friends">70 wspólnych znajomych</span>
                    </div>
                    <button class="add-friend-button"><img src="img/icons/add-friend-icon.png" alt="add friend icon">Dodaj do znajomych</button>
                </article>
            </div>
            <a class="new-friends__show-all" href="znajomi">Pokaż wszystkich</a>
        </section>
    </main>
</body>
</html>