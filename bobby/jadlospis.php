<?php
    require_once 'connection.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/jadlospis.css">
    <script src="rozwijanie.js" defer></script>
    <script src="wyszukiwanie.js" defer></script>
    <script src="kontakt_dropdown.js" defer></script>
    <script src="add_to_cart.js" defer></script>
    <title>Bobby Menu</title>
</head>
<body>
    <header class="header">
        <a href="homepage"><img class="header__logo" src="img/logo.png" alt="bobby restaurant logo"></a>
        <div class="search-container">
            <input type="text" class="search-bar">
        </div>
        <div class="header__nav">
            <a class="header__nav-link" href="menu">Menu</a>
            <a class="header__nav-link" href="koszyk">Koszyk</a>
            <p class="header__nav-link header__kontakt">Kontakt</p>
            <div class="kontakt-dropdown">
                <p><span class="bold">Tel:</span> +48 112 245 823</p>
                <img class="close-kontakt-dropdown" src="img/icons/close-icon.png" alt="close icon">
            </div>
        </div>
    </header>
    <h1>Menu</h1>
    <main>
        <ol class="elements">
            <li class="button--orange">Dania główne <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
            <ul>
                <li class="button--brown">Zupy <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='zupy'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Sałatki <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='sałatki'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Ryby <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='ryby'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Steki <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='steki'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Burgery <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='burgery'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Z Grilla <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='grill'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Keto <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='keto'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Wegetariańskie <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='wegetarian'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Wegańskie <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='wegan'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
            </ul>
            <li class="button--orange">Desery <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
            <ul>
            <?php
                    $query = "SELECT * FROM danie WHERE typ='desery'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
            </ul>
            <li class="button--orange">Alkohole <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
            <ul>
                <li class="button--brown">Piwo <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='piwo'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Wino <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='wino'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Drinki <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='drinki'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Wódka <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='wódka'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
            </ul>
            <li class="button--orange">Napoje <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
            <ul>
                <li class="button--brown">Ciepłe <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='ciepłe'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
                <li class="button--brown">Zimne <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
                <ol>
                <?php
                    $query = "SELECT * FROM danie WHERE typ='zimne'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__heading bold">Opis:</p>
                                    <p class="danie__details__desc">'.$danie['opis'].'</p>
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
                </ol>
            </ul>
            <li class="button--orange">Dodatki <svg class="plus-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg></li>
            <ul>
            <?php
                    $query = "SELECT * FROM danie WHERE typ='dodatki'";
                    if($result = $con->query($query)){
                        $array = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($array as $danie){
                            echo '<li class="danie">
                            <button class="button--green">'.$danie['nazwa'].' <svg class="arrow-icon"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                            <div class="danie__details">
                                <img class="danie__details__img" src="'.$danie['obraz'].'" alt="'.$danie['nazwa'].'">
                                <div class="danie__details__right">
                                    <p class="danie__details__cena"><span class="bold">Cena:</span> '.$danie['cena'].'</p>
                                    <div class="danie__details__buttons">
                                        <button class="add-to-cart" onclick="dodajDoKoszyka('.$danie['id_danie'].')">Dodaj do koszyka</button>
                                        <a href="#" class="wartosci-odzywcze">Wartości odżywcze</a>
                                    </div>
                                </div>
                            </div>
                        </li>';
                        
                        }
                    }
                    else{
                        echo 'Bład bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                ?>
            </ul>
        </ol>
        <div class="cart-popup">Dodano przedmiot do koszyka</div>
    </main>
    <footer>
        <section class="footer__footer">
            <div class="footer__top">
                <a href="homepage"><img class="footer__logo" src="img/logo.png" alt="bobby restaurant logo"></a>
                <div class="footer__links">
                    <p class="footer__links__heading">Linki</p>
                    <a href="#" class="footer-link">Regulamin</a>
                    <a href="#" class="footer-link">Newsletter</a>
                    <a href="#" class="footer-link">Współpraca</a>
                </div>
                <div class="footer__information">
                    <p class="footer__information__heading">Informacje</p>
                    <span class="footer__information__element"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg> +48 123 998 011</span>
                    <span class="footer__information__element"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg> biznes@bobby.pl</span>
                    <span class="footer__information__element"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg> 00-005 Warszawa<br>ul.Krzyżowa, 18/9</span>
                    <div class="footer__social-media">
                        <a href="#" target="_blank" class="footer__social-link">
                            <svg class="facebook-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        </a>
                        <a href="#" target="_blank" class="footer__social-link">
                            <svg class="instagram-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="#" target="_blank" class="footer__social-link">
                            <svg class="twitter-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer__bottom">
                <p class="copyright-text">Bobby. Wszystkie prawa zastrzeżone &copy;</p>
            </div>
        </section>
    </footer>
</body>
</html>