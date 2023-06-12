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

    if(isset($_GET['kat'])&&$_GET['kat']!==''){
        $kat = htmlentities($_GET['kat'],ENT_QUOTES);
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sklep Furni</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/store.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/store.js" defer></script>
</head>
<body>
    <div class="kat" hidden><?php 
        if(isset($_GET['kat'])){
            echo $_GET['kat'];
        } 
    ?></div>
    <div class="fraza" hidden><?php
        if(isset($_GET['fraza'])){
            echo $_GET['fraza'];
        }
    ?></div>
<?php include 'inc/header_noform.php';?>
    <div class="pasek-wyboru">
        <a href="sklep?kat=fotele" class="pasek__link <?php if($kat==='fotele'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/fotele.png" alt="fotel" class="pasek__link__img">
            <p class="pasek__link__text">Fotele</p>
        </a>
        <a href="sklep?kat=sofy" class="pasek__link <?php if($kat==='sofy'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/sofy.png" alt="sofa" class="pasek__link__img">
            <p class="pasek__link__text">Sofy</p>
        </a>
        <a href="sklep?kat=mebloscianki" class="pasek__link <?php if($kat==='mebloscianki'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/mebloscianki.png" alt="mebloscianka" class="pasek__link__img">
            <p class="pasek__link__text">Meblościanki</p>
        </a>
        <a href="sklep?kat=komody" class="pasek__link <?php if($kat==='komody'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/komody.png" alt="komoda" class="pasek__link__img">
            <p class="pasek__link__text">Komody</p>
        </a>
        <a href="sklep?kat=biurka" class="pasek__link <?php if($kat==='biurka'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/biurka.png" alt="biurko" class="pasek__link__img">
            <p class="pasek__link__text">Biurka</p>
        </a>
        <a href="sklep?kat=kanapy" class="pasek__link <?php if($kat==='kanapy'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/kanapy.png" alt="kanapa" class="pasek__link__img">
            <p class="pasek__link__text">Kanapy</p>
        </a>
        <a href="sklep?kat=krzesla" class="pasek__link <?php if($kat==='krzesla'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/krzesla.png" alt="krzesło" class="pasek__link__img">
            <p class="pasek__link__text">Krzesła</p>
        </a>
        <a href="sklep?kat=lampy" class="pasek__link <?php if($kat==='lampy'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/lampy.png" alt="lampa" class="pasek__link__img">
            <p class="pasek__link__text">Lampy</p>
        </a>
        <a href="sklep?kat=lustra" class="pasek__link <?php if($kat==='lustra'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/lustra.png" alt="lustro" class="pasek__link__img">
            <p class="pasek__link__text">Lustra</p>
        </a>
        <a href="sklep?kat=lozka" class="pasek__link <?php if($kat==='lozka'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/lozka.png" alt="łóżko" class="pasek__link__img">
            <p class="pasek__link__text">Łożka</p>
        </a>
        <a href="sklep?kat=regaly" class="pasek__link <?php if($kat==='regaly'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/regaly.png" alt="regał" class="pasek__link__img">
            <p class="pasek__link__text">Regały</p>
        </a>
        <a href="sklep?kat=stoly" class="pasek__link <?php if($kat==='stoly'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/stoly.png" alt="stół" class="pasek__link__img">
            <p class="pasek__link__text">Stoły</p>
        </a>
        <a href="sklep?kat=szafy" class="pasek__link <?php if($kat==='szafy'){echo 'pasek__link--active';} ?>">
            <img src="img/products/kategorie/szafy.png" alt="szafa" class="pasek__link__img">
            <p class="pasek__link__text">Szafy</p>
        </a>
    </div>
    <div class="main">
        <aside class="aside">
            <div class="cena">
                <p class="cena__heading">Cena</p>
                <input min="0" type="number" class="cena__input" placeholder="Od">
                <input min="0" type="number" class="cena__input" placeholder="Do">
            </div>
            <label for="sortuj" class="sortuj-label">Sortuj <img src="img/icons/filtr-icon.png" alt="sortuj" class="sortuj-label__icon"></label>
            <select id="sortuj" class="sortuj">
                <option value="0" selected>Brak filtra</option>
                <option value="alfa">Alfabetycznie</option>
                <option value="tanio">Od najtańszego</option>
                <option value="drogo">Od najdroższego</option>
            </select>
        </aside>
        <main class="produkty">
            <?php
                if(isset($_GET['fraza'])&&!isset($_GET['kat'])&&$_GET['fraza']!==''){
                    $fraza = htmlentities($_GET['fraza'], ENT_QUOTES);
                    $query = "SELECT * FROM produkty WHERE nazwa LIKE '%$fraza%'";
                    if($result = $con->query($query)){
                        if($result->num_rows>0){
                            $wyniki = $result->fetch_all(MYSQLI_ASSOC);
                            shuffle($wyniki);
                            foreach($wyniki as $produkt){
                                if($zalogowano){
                                    $id_produktu = $produkt['id'];
                                    $user_id = $_SESSION['user_id'];
                                    $query = "SELECT id FROM koszyki WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
                                    if($result = $con->query($query)){
                                        if($result->num_rows===0){
                                            $koszyk = 'add-to-cart-icon.png';
                                        }
                                        else{
                                            $koszyk = 'delete-from-cart-icon.png';
                                        }
                                    }
                                    else{
                                        exit();
                                    }
                                }else{
                                    $koszyk = 'add-to-cart-icon.png';
                                }
                                $query = "SELECT AVG(liczba_gwiazdek) as srednia FROM komentarze WHERE id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    $result = $result->fetch_assoc();
                                    if(is_null($result['srednia'])){
                                        $gwiazdki_string = 'Brak ocen';
                                    }
                                    else{
                                        $gwiazdki = [
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">'
                                        ];
                                        for($i=0;$i<=round($result['srednia'])-1;$i++){
                                            $gwiazdki[$i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">';
                                        }
                                        $gwiazdki_string = '';
                                        foreach($gwiazdki as $gwiazdka){
                                            $gwiazdki_string.=$gwiazdka;
                                        }
                                    }
                                }
                                else{
                                    exit();
                                }
                                echo '<div class="produkt">';
                                echo    '<div class="produkt__top">';
                                echo        '<img src="img/products/'.$produkt['kategoria'].'/'.$produkt['nazwa'].'.png" alt="'.$produkt['nazwa'].'" class="produkt__img">';
                                echo        '<a href="produkt?id='.$produkt['id'].'" class="produkt__nazwa">'.$produkt['nazwa'].'</a>';
                                            if(!is_null($produkt['poprzednia_cena'])){
                                                echo '<p class="produkt__cena"><span class="produkt__cena__previous">'.$produkt['poprzednia_cena'].' zł</span>'.$produkt['cena'].' zł</p>';
                                            }
                                            else{
                                                echo '<p class="produkt__cena">'.$produkt['cena'].' zł</p>';
                                            }
                                echo        '<div class="produkt__gwiazdki">';
                                echo            $gwiazdki_string;
                                echo        '</div>';
                                echo    '</div>';
                                echo    '<div class="produkt__bottom">';
                                echo        '<img onclick="dodajDoKoszyka(event,'.$produkt['id'].')" src="img/icons/'.$koszyk.'" alt="dodaj do koszyka" class="produkt__bottom__icon">';
                                echo        '<img onclick="dodajDoUlubionych(event,'.$produkt['id'].')" src="img/icons/heart-icon.png" alt="serce" class="produkt__bottom__icon">';
                                echo    '</div>';
                                echo '</div>';
                            }
                        }
                        else{
                            echo '<div class="brak-wynikow">Nie znaleziono produktów</div>';
                        }
                    }
                    else{
                        exit();
                    }
                }
                else if(!isset($_GET['fraza'])&&isset($_GET['kat'])&&$_GET['kat']!==''){
                    $query = "SELECT * FROM produkty WHERE kategoria='$kat'";
                    if($result = $con->query($query)){
                        if($result->num_rows>0){
                            $wyniki = $result->fetch_all(MYSQLI_ASSOC);
                            shuffle($wyniki);
                            foreach($wyniki as $produkt){
                                $id_produktu = $produkt['id'];
                                $query = "SELECT AVG(liczba_gwiazdek) as srednia FROM komentarze WHERE id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    $result = $result->fetch_assoc();
                                    if(is_null($result['srednia'])){
                                        $gwiazdki_string = 'Brak ocen';
                                    }
                                    else{
                                        $gwiazdki = [
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">'
                                        ];
                                        for($i=0;$i<=round($result['srednia'])-1;$i++){
                                            $gwiazdki[$i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">';
                                        }
                                        $gwiazdki_string = '';
                                        foreach($gwiazdki as $gwiazdka){
                                            $gwiazdki_string.=$gwiazdka;
                                        }
                                    }
                                }
                                else{
                                    exit();
                                }
                                echo '<div class="produkt">';
                                echo    '<div class="produkt__top">';
                                echo        '<img src="img/products/'.$produkt['kategoria'].'/'.$produkt['nazwa'].'.png" alt="'.$produkt['nazwa'].'" class="produkt__img">';
                                echo        '<a href="produkt?id='.$produkt['id'].'" class="produkt__nazwa">'.$produkt['nazwa'].'</a>';
                                            if(!is_null($produkt['poprzednia_cena'])){
                                                echo '<p class="produkt__cena"><span class="produkt__cena__previous">'.$produkt['poprzednia_cena'].' zł</span>'.$produkt['cena'].' zł</p>';
                                            }
                                            else{
                                                echo '<p class="produkt__cena">'.$produkt['cena'].' zł</p>';
                                            }
                                echo        '<div class="produkt__gwiazdki">';
                                echo            $gwiazdki_string;
                                echo        '</div>';
                                echo    '</div>';
                                echo    '<div class="produkt__bottom">';
                                echo        '<img onclick="dodajDoKoszyka(event,'.$produkt['id'].')" src="img/icons/add-to-cart-icon.png" alt="dodaj do koszyka" class="produkt__bottom__icon">';
                                echo        '<img onclick="dodajDoUlubionych(event,'.$produkt['id'].')" src="img/icons/heart-icon.png" alt="serce" class="produkt__bottom__icon">';
                                echo    '</div>';
                                echo '</div>';
                            }
                        }
                        else{
                            exit();
                        }
                    }
                    else{
                        exit();
                    }
                }
                else if((!isset($_GET['fraza'])||$_GET['fraza']==='')&&(!isset($_GET['kat'])||$_GET['kat']==='')){
                    $query = "SELECT * FROM produkty ORDER BY RAND() LIMIT 10";
                    if($result = $con->query($query)){
                        $wyniki = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($wyniki as $produkt){
                            $id_produktu = $produkt['id'];
                            $query = "SELECT AVG(liczba_gwiazdek) as srednia FROM komentarze WHERE id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    $result = $result->fetch_assoc();
                                    if(is_null($result['srednia'])){
                                        $gwiazdki_string = 'Brak ocen';
                                    }
                                    else{
                                        $gwiazdki = [
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">'
                                        ];
                                        for($i=0;$i<=round($result['srednia'])-1;$i++){
                                            $gwiazdki[$i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">';
                                        }
                                        $gwiazdki_string = '';
                                        foreach($gwiazdki as $gwiazdka){
                                            $gwiazdki_string.=$gwiazdka;
                                        }
                                    }
                                }
                                else{
                                    exit();
                                }
                            echo '<div class="produkt">';
                            echo    '<div class="produkt__top">';
                            echo        '<img src="img/products/'.$produkt['kategoria'].'/'.$produkt['nazwa'].'.png" alt="'.$produkt['nazwa'].'" class="produkt__img">';
                            echo        '<a href="produkt?id='.$produkt['id'].'" class="produkt__nazwa">'.$produkt['nazwa'].'</a>';
                                        if(!is_null($produkt['poprzednia_cena'])){
                                            echo '<p class="produkt__cena"><span class="produkt__cena__previous">'.$produkt['poprzednia_cena'].' zł</span>'.$produkt['cena'].' zł</p>';
                                        }
                                        else{
                                            echo '<p class="produkt__cena">'.$produkt['cena'].' zł</p>';
                                        }
                            echo        '<div class="produkt__gwiazdki">';
                            echo            $gwiazdki_string;
                            echo        '</div>';
                            echo    '</div>';
                            echo    '<div class="produkt__bottom">';
                            echo        '<img onclick="dodajDoKoszyka(event,'.$produkt['id'].')" src="img/icons/add-to-cart-icon.png" alt="dodaj do koszyka" class="produkt__bottom__icon">';
                            echo        '<img onclick="dodajDoUlubionych(event,'.$produkt['id'].')" src="img/icons/heart-icon.png" alt="serce" class="produkt__bottom__icon">';
                            echo    '</div>';
                            echo '</div>';
                        }
                    }
                    else{
                        exit();
                    }
                }
                else{
                    exit();
                }
            ?>
        </main>
    </div>
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
</body>
</html>