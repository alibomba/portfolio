<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $zalogowano = true;
        }
        else{
            $zalogowano = false;
        }
    }
    else{
        $zalogowano = false;
    }
    if(!isset($_GET['id'])){
        header('Location: homepage');
        exit();
    }

    $id_produktu = htmlentities($_GET['id'],ENT_QUOTES);
    $query = "SELECT * FROM produkty WHERE id='$id_produktu'";
    if($result = $con->query($query)){
        if($result->num_rows>0){
            $produkt = $result->fetch_assoc();
        }
        else{
            exit();
        }
    }
    else{
        exit();
    }

?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $produkt['nazwa']; ?></title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/product.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/product.js" defer></script>
</head>
<body>
    <?php include 'inc/header_form.php'; ?>
    <main>
        <section class="mebel">
            <img src="img/products/<?php echo $produkt['kategoria']; ?>/<?php echo $produkt['nazwa']; ?>.png" alt="<?php echo $produkt['nazwa']; ?>" class="mebel__img">
            <div class="mebel__right">
                <div class="mebel__right__top">
                    <h1 class="mebel__nazwa"><?php echo $produkt['nazwa']; ?></h1>
                    <p class="mebel__kategoria">Kategoria: <img src="img/products/kategorie/<?php echo $produkt['kategoria']; ?>.png" alt="<?php echo $produkt['kategoria']; ?>" class="mebel__kategoria__img"></p>
                </div>
                <div class="mebel__right__stars">
                    <div class="mebel__stars">
                        <?php
                            $query = "SELECT AVG(liczba_gwiazdek) as srednia FROM komentarze WHERE id_produktu='$id_produktu'";
                            if($result = $con->query($query)){
                                $result = $result->fetch_assoc();
                                if(!is_null($result['srednia'])){
                                    $srednia = round($result['srednia']);
                                    $gwiazdki = [
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="mebel__stars__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="mebel__stars__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="mebel__stars__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="mebel__stars__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="mebel__stars__star">'
                                    ];
                                    for($i=0;$i<=$srednia-1;$i++){
                                        $gwiazdki[$i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="mebel__stars__star">';
                                    }
                                    $query = "SELECT id FROM komentarze WHERE id_produktu='$id_produktu'";
                                    if($result = $con->query($query)){
                                        $ile_ocen = $result->num_rows;
                                    }
                                    else{
                                        exit();
                                    }
                                    foreach($gwiazdki as $gwiazdka){
                                        echo $gwiazdka;
                                    }
                                    echo '<p class="mebel__right__stars__liczba">('.$ile_ocen.')</p>';
                                }
                                else{
                                    echo '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="mebel__stars__star">';
                                    echo '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="mebel__stars__star">';
                                    echo '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="mebel__stars__star">';
                                    echo '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="mebel__stars__star">';
                                    echo '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="mebel__stars__star">';
                                    echo '<p class="mebel__right__stars__liczba">(0)</p>';
                                }
                            }
                            else{
                                exit();
                            }
                        ?>
                        
                    </div>
                </div>
                <p class="mebel__cena"><?php 
                    echo $produkt['cena'].' zł';
                    if(!is_null($produkt['poprzednia_cena'])){
                        echo '<span class="mebel__cena__previous">'.$produkt['poprzednia_cena'].' zł</span>';
                    }
                ?></p>
                <div class="mebel__buttons">
                    <button onclick="dodajProduktDoKoszyka(event,<?php echo $produkt['id']; ?>)" class="mebel__button mebel__button--koszyk">
                        <?php
                            if($zalogowano){
                                $user_id = $_SESSION['user_id'];
                                $query = "SELECT id FROM koszyki WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    if($result->num_rows>0){
                                        echo 'Usuń z koszyka';
                                    }
                                    else{
                                        echo 'Dodaj do koszyka';
                                    }
                                }
                                else{
                                    exit();
                                }
                            }
                            else{
                                echo 'Dodaj do koszyka';
                            }
                        ?>
                    </button>
                    <button onclick="dodajProduktDoUlubionych(event,<?php echo $produkt['id']; ?>)" class="mebel__button mebel__button--ulubione">
                        <?php
                            if($zalogowano){
                                $user_id = $_SESSION['user_id'];
                                $query = "SELECT id FROM ulubione WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    if($result->num_rows>0){
                                        echo 'Usuń z ulubionych';
                                    }
                                    else{
                                        echo 'Dodaj do ulubionych';
                                    }
                                }
                                else{
                                    exit();
                                }
                            }
                            else{
                                echo 'Dodaj do ulubionych';
                            }
                        ?>
                    </button>
                </div>
            </div>
        </section>
        <section class="opis">
            <h2 class="opis__heading">Opis:</h2>
            <p class="opis__text"><?php echo $produkt['opis']; ?></p>
        </section>
        <form class="napisz">
            <input required maxlength="200" type="text" class="napisz__input" placeholder="Napisz komentarz">
            <div class="napisz__bottom">
                <div class="napisz__bottom__left">
                    <p class="napisz__bottom__left__ocen">Oceń produkt</p>
                    <div class="napisz__bottom__left__stars">
                        <img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="napisz__star">
                        <img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">
                        <img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">
                        <img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">
                        <img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="napisz__star">
                    </div>
                </div>
                <input type="submit" value="Opublikuj" class="napisz__button">
            </div>
        </form>
        <section class="komentarze">
            <h2 class="komentarze__heading">Komentarze</h2>
            <?php
                $query = "SELECT * FROM komentarze WHERE id_produktu='$id_produktu' ORDER BY data_dodania";
                if($result = $con->query($query)){
                    $komentarze = $result->fetch_all(MYSQLI_ASSOC);
                    if($result->num_rows>0){
                        foreach($komentarze as $komentarz){
                            // autor
                            $id_autora = $komentarz['id_autora'];
                            $query = "SELECT imie,nazwisko FROM users WHERE id='$id_autora'";
                            if($result = $con->query($query)){
                                $result = $result->fetch_assoc();
                                $autor = $result['imie'].' '.$result['nazwisko'];
                            }
                            else{
                                exit();
                            }

                            // gwiazdki
                            $gwiazdki = [
                                '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                                '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                                '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                                '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">',
                                '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="komentarz__star">'
                            ];
                            for($i=0;$i<=$komentarz['liczba_gwiazdek']-1;$i++){
                                $gwiazdki[$i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="mebel__stars__star">';
                            }

                            // data
                            $data_dodania = new DateTime($komentarz['data_dodania']);
                            $data_formatted = $data_dodania->format('d.m.Y');

                            $id_komentarza = $komentarz['id'];
                            // lajki
                            $query = "SELECT id FROM reakcje WHERE id_komentarza='$id_komentarza' AND typ='like'";
                            if($result = $con->query($query)){
                                $lajki = $result->num_rows;
                            }
                            else{
                                exit();
                            }
                            if($zalogowano){
                                $user_id = $_SESSION['user_id'];
                                $query = "SELECT id FROM reakcje WHERE id_komentarza='$id_komentarza' AND id_reagujacego='$user_id' AND typ='like'";
                                if($result = $con->query($query)){
                                    if($result->num_rows>0){
                                        $like_button = 'filled-like-icon';
                                    }
                                    else{
                                        $like_button = 'like-icon';
                                    }
                                }
                                else{
                                    exit();
                                }
                            }
                            else{
                                $like_button = 'like-icon';
                            }
                            

                            // dislajki
                            $query = "SELECT id FROM reakcje WHERE id_komentarza='$id_komentarza' AND typ='dislike'";
                            if($result = $con->query($query)){
                                $dislajki = $result->num_rows;
                            }
                            else{
                                exit();
                            }
                            if($zalogowano){
                                $user_id = $_SESSION['user_id'];
                                $query = "SELECT id FROM reakcje WHERE id_reagujacego='$user_id' AND id_komentarza='$id_komentarza' AND typ='dislike'";
                                if($result = $con->query($query)){
                                    if($result->num_rows>0){
                                        $dislike_button = 'filled-dislike-icon';
                                    }   
                                    else{
                                        $dislike_button = 'dislike-icon';
                                    }
                                }
                                else{
                                    exit();
                                }
                            }
                            else{
                                $dislike_button = 'dislike-icon';
                            }

                            // usuniecie
                            if($zalogowano&&$komentarz['id_autora']===$_SESSION['user_id']){
                                $delete = '<img src="img/icons/comment-delete-icon.png" alt="kosz" class="komentarz__delete" onclick="usunKomentarz(event,'.$komentarz['id'].')">';
                            }
                            else{
                                $delete = '';
                            }
                            echo '<article class="komentarze__komentarz">';
                            echo    '<div class="komentarz__top">';
                            echo        '<div class="komentarz__top__left">';
                            echo            '<p class="komentarz__autor">'.$autor.'</p>';
                            echo            '<div class="komentarz__top__left__stars">';
                                                foreach($gwiazdki as $gwiazdka){
                                                    echo $gwiazdka;
                                                }
                            echo            '</div>';
                            echo        '</div>';
                            echo        '<div class="komentarz__top__right">';
                            echo            '<p class="komentarz__data">'.$data_formatted.'</p>';
                            echo            $delete;
                            echo        '</div>';
                            echo    '</div>';
                            echo    '<p class="komentarz__tresc">'.$komentarz['tresc'].'</p>';
                            echo    '<div class="komentarz__bottom">';
                            echo        '<div class="komentarz__bottom__element">';
                            echo            '<img onclick="dodajLike(event,'.$komentarz['id'].')" src="img/icons/'.$like_button.'.png" alt="like" class="komentarz__bottom__like">';
                            echo            '<p class="komentarz__bottom__number">'.$lajki.'</p>';
                            echo        '</div>';
                            echo        '<div class="komentarz__bottom__element">';
                            echo            '<img onclick="dodajDislike(event,'.$komentarz['id'].')" src="img/icons/'.$dislike_button.'.png" alt="dislike" class="komentarz__bottom__dislike">';
                            echo            '<p class="komentarz__bottom__number">'.$dislajki.'</p>';
                            echo        '</div>';
                            echo    '</div>';
                            echo'</article>';
                        }
                    }
                    else{
                        echo '<div class="brak-komentarzy">Brak komentarzy</div>';
                    }
                }
                else{
                    exit();
                }
            ?>
        </section>
    </main>    
    <footer class="footer">
        <div class="footer__top">
            <a href="homepage"><img src="img/logo.png" alt="logo furni" class="footer__logo"></a>
            <nav class="footer__nav">
                <a href="#" class="footer__nav-link">Polityka prywatności</a>
                <a href="#" class="footer__nav-link">Kontakt</a>
                <a href="#" class="footer__nav-link">Regulamin strony</a>
                <a href="o-nas" class="footer__nav-link">O nas</a>
            </nav>
        </div>
        <p class="footer__bottom">Furni &copy; 2022 Wszelkie prawa zastrzeżone</p>
    </footer>
    <div class="id_produktu" hidden><?php echo $produkt['id']; ?></div>
</body>
</html>