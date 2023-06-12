<?php
    if(!isset($_POST['usluga']) || !isset($_POST['imie']) || !isset($_POST['nazwisko']) || !isset($_POST['email']) || !isset($_POST['nr_tel']) || !isset($_POST['firma']) || !isset($_POST['tresc'])){
        exit();
    }
    $usluga = htmlentities($_POST['usluga'], ENT_QUOTES);
    $imie = htmlentities($_POST['imie'], ENT_QUOTES);
    $nazwisko = htmlentities($_POST['nazwisko'], ENT_QUOTES);
    $email = htmlentities($_POST['email'], ENT_QUOTES);
    $nr_tel = htmlentities($_POST['nr_tel'], ENT_QUOTES);
    $firma = htmlentities($_POST['firma'], ENT_QUOTES);
    $tresc = htmlentities($_POST['tresc'], ENT_QUOTES);
    require_once '../inc/connection.php';
    if(($usluga === '' || $imie === '' || $nazwisko === '' || $email === '' || $nr_tel === '' || $firma === '' || $tresc === '') || filter_var($email, FILTER_VALIDATE_EMAIL) == false || strlen($_POST['tresc']) > 300 || (strlen($imie) > 25 || strlen($nazwisko) > 25 || strlen($email) > 25 || strlen($nr_tel) > 25 || strlen($firma) > 25)){
        echo '{
            "type":"bad",
            "message":"Wprowadź poprawne dane"
        }';
    }
    $query = "INSERT INTO zamowienia(usluga,imie,nazwisko,email,nr_tel,firma,tresc) VALUES('$usluga', '$imie', '$nazwisko', '$email', '$nr_tel', '$firma', '$tresc')";
    if($con->query($query)){
        echo '{
            "type":"good",
            "message":"Pomyślnie wysłano zamówienie"
        }';
    }
    else{
        exit();
    }