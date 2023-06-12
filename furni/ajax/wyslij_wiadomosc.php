<?php
    if(!isset($_POST['imie'])||!isset($_POST['nazwisko'])||!isset($_POST['email'])||!isset($_POST['nr_tel'])||!isset($_POST['firma'])||!isset($_POST['temat'])||!isset($_POST['tresc'])){
        header('Location: homepage');
        exit();
    }

    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $user_id = $_SESSION['user_id'];
        }
        else{
            $user_id = NULL;
        }
    }
    else{
        $user_id = NULL;
    }

    $ok = true;
    $error = '';
    $info = '';
    
    if($_POST['imie']==''||$_POST['nazwisko']==''||$_POST['email']==''||$_POST['nr_tel']==''||$_POST['temat']==''||$_POST['tresc']==''){
        $ok = false;
        $error = 'Proszę wypełnić wszystkie obowiązkowe pola';
    }
    if(preg_match('(^[a-zA-Z][a-zA-Z ]{2,}$)',$_POST['imie'])==0){
        $ok = false;
        $error = 'Podaj poprawne imię';
    }
    if(preg_match('(^[a-zA-Z][a-zA-Z ]{2,}$)',$_POST['nazwisko'])==0){
        $ok = false;
        $error = 'Podaj poprawne nazwisko';
    }
    if(!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)){
        $ok = false;
        $error = 'Podaj poprawny adres e-mail';
    }
    if(preg_match('(\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*)',$_POST['nr_tel'])==0){
        $ok = false;
        $error = 'Podaj poprawny numer telefonu';
    }
    if(strlen($_POST['temat'])>30){
        $ok = false;
        $error = 'Temat jest za długi';
    }
    if(strlen($_POST['tresc'])>300){
        $ok = false;
        $error = 'Wiadomośc jest za długa';
    }
    if($_POST['firma']!==''){
        $firma = htmlentities($_POST['firma'], ENT_QUOTES);
        if(strlen($_POST['firma'])>50){
            $ok = false;
            $error = 'Nazwa firmy jest za długa';
        }
    }
    else{
        $firma = NULL;
    }

    if($ok){
        $imie = htmlentities($_POST['imie'], ENT_QUOTES);
        $nazwisko = htmlentities($_POST['nazwisko'], ENT_QUOTES);
        $email = htmlentities($_POST['email'], ENT_QUOTES);
        $nr_tel = htmlentities($_POST['nr_tel'], ENT_QUOTES);
        $temat = htmlentities($_POST['temat'], ENT_QUOTES);
        $tresc = htmlentities($_POST['tresc'], ENT_QUOTES);

        $query = "INSERT INTO wiadomosci(user_id,imie,nazwisko,email,nr_telefonu,firma,temat,tresc) VALUES('$user_id','$imie','$nazwisko','$email','$nr_tel','$firma','$temat','$tresc')";
        if($con->query($query)){
            $info = 'Pomyślnie wysłano wiadomość';
        }
        else{
            $error = 'Błąd bazy danych. Prosiny spróbować ponownie później.';
        }
    }


    echo '
        {
            "info":"'.$info.'",
            "error":"'.$error.'"
        }
    ';