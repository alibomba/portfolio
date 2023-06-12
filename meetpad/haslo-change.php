<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['current_haslo']) || !isset($_POST['new_haslo']) || !isset($_POST['powtorz_haslo'])){
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


    $current_haslo = htmlentities($_POST['current_haslo'], ENT_QUOTES, 'UTF-8');
    $new_haslo = $_POST['new_haslo'];
    $powtorz_haslo = $_POST['powtorz_haslo'];


    $ok = true;
    if(strlen($new_haslo)<8 || strlen($new_haslo)>20){
        $message = 'Hasło musi posiadać od 8 do 20 znaków!';
        $type = 'bad';
        $ok = false;
    }
    if($new_haslo != $powtorz_haslo){
        $message = 'Podane hasła muszą być identyczne!';
        $type = 'bad';
        $ok = false;
    }        
    if(empty($powtorz_haslo)){
        $message = 'Powtórz hasło!';
        $type = 'bad';
        $ok = false;
    }
    if(empty($new_haslo)){
        $message = 'Podaj hasło!';
        $type = 'bad';
        $ok = false;
    }

    if($ok === true){
        $new_haslo = password_hash(htmlentities($_POST['new_haslo'],ENT_QUOTES,'UTF-8'),PASSWORD_DEFAULT);
        if(password_verify($current_haslo,$userhaslo)){
            $query = "UPDATE users SET haslo='$new_haslo' WHERE userid='$userid'";
            if($con->query($query)){
                $message = 'Hasło zostało zmienione.';
                $type = 'good';
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
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