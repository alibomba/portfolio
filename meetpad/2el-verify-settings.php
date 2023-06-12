<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['haslo']) || !isset($_POST['kod_z_maila']) || !isset($_POST['on_or_off'])){
        header('Location: homepage');
        exit();
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



    $haslo = htmlentities($_POST['haslo'], ENT_QUOTES, 'UTF-8');
    $inputkod = htmlentities($_POST['kod_z_maila'], ENT_QUOTES, 'UTF-8');
    $on_or_off = $_POST['on_or_off'];


    $ok = true;
    if($haslo === ''){
        $ok = false;
        $message = 'Wprowadź hasło!';
        $type = 'bad';
    }
    if($inputkod === ''){
        $ok = false;
        $message = 'Wprowadź kod!';
        $type = 'bad';
    }


    if($ok===true){
        if(password_verify($haslo,$userhaslo)){
            if($inputkod == $konto->kod_z_maila){
                if($on_or_off === 'verify--off'){
                    $query = "UPDATE users SET dwuetapowa=1 WHERE userid='$userid'";
                    if($con->query($query)){
                        $message = 'Pomyślnie włączono weryfikację dwuetapową.';
                        $type = 'good';
                        $button_content = 'Wyłącz';
                    }
                    else{
                        echo 'Błąd bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                }
                else if($on_or_off === 'verify--on'){
                    $query = "UPDATE users SET dwuetapowa=0 WHERE userid='$userid'";
                    if($con->query($query)){
                        $message = 'Pomyślnie wyłączono weryfikację dwuetapową.';
                        $type = 'good';
                        $button_content = 'Włącz';
                    }
                    else{
                        echo 'Błąd bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                }
            }
            else{
                $message = 'Nieprawidłowy kod!';
                $type = 'bad';
            }
        }
        else{
            $message = 'Nieprawidłowe hasło!';
            $type = 'bad';
        }
    }



    $response = 
    '
    {
        "message":"'.$message.'",
        "type":"'.$type.'",
        "button_content":"'.@$button_content.'"
    }
    ';
    
    echo $response;