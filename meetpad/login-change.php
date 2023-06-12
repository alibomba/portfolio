<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['new_login']) || !isset($_POST['haslo'])){
        header('Location: homepage');
    }
    $idkonta = $_SESSION['idkonta'];
    $query = "SELECT * FROM users WHERE userid='$idkonta'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $konto = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
        $userhaslo = $row['haslo'];
        $userid = $konto->userid;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    

    $new_login = $_POST['new_login'];
    $haslo = htmlentities($_POST['haslo'], ENT_QUOTES, 'UTF-8');
    $ok = true;


    $query = "SELECT userid FROM users WHERE email='$new_login'";
    if($result = $con->query($query)){
        if($result->num_rows > 0){
            $message = 'Istnieje już użytkownik o tym adresie e-mail!';
            $type = 'bad';
            $ok = false;
        }
    }
    else{
        echo 'Błąd bazy danych nr'.$con->connect_errno;
        exit();
    }
    if(!filter_var($new_login, FILTER_VALIDATE_EMAIL)){
        $message = 'Podaj poprawny adres e-mail!';
        $type = 'bad';
        $ok = false;
    }
    if(empty($new_login)){
        $message = 'Podaj adres e-mail!';
        $type = 'bad';
        $ok = false;
    }

    if($ok === true){
        if(password_verify($haslo,$userhaslo)){
            $new_login = htmlentities($_POST['new_login'], ENT_QUOTES, 'UTF-8');
            $query = "UPDATE users SET email='$new_login' WHERE userid='$userid'";
            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
            $message = 'Login został zmieniony.';
            $type = 'good';
        }
        else{
            $message = 'Niepoprawne hasło!';
            $type = 'bad';
        }
    }

    $response = 
    '
    {
        "message":"'.$message.'",
        "type":"'.$type.'"
    }
    ';

    echo $response;