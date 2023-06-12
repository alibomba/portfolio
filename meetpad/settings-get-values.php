<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['setting']) || !isset($_POST['setting-type'])){
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
    $userid = $konto->userid;
    $setting = $_POST['setting'];


    if($_POST['setting-type'] === 'one'){
        $query = "SELECT imie,nazwisko,email,opis,nr_tel,kontakt_email,szkola,praca FROM users WHERE userid='$userid'";
        if($result = $con->query($query)){
            $row = $result->fetch_assoc();
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }

        switch($setting){
            case 'Imię':
                $response = $row['imie'];
                break;
            case 'Nazwisko':
                $response = $row['nazwisko'];
                break;
            case 'E-mail (login)':
                $response = $row['email'];
                break;
            case 'Opis profilu':
                $response = $row['opis'];
                break;
            case 'Numer telefonu (wyświetlany w profilu)':
                $response = $row['nr_tel'];
                break;
            case 'Adres e-mail (wyświetlany w profilu)':
                $response = $row['kontakt_email'];
                break;
            case 'Szkoła':
                $response = $row['szkola'];
                break;
            case 'Praca':
                $response = $row['praca'];
                break;
        }

    }
    else if($_POST['setting-type'] === 'two'){
        $query = "SELECT miasto_zamieszkania, kraj_zamieszkania,miasto_urodzenia,kraj_urodzenia FROM users WHERE userid='$userid'";
        if($result = $con->query($query)){
            $row = $result->fetch_assoc();
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }

        switch($setting){
            case 'Miejsce zamieszkania':
                $response = 
                '
                {
                    "miasto":"'.$row['miasto_zamieszkania'].'",
                    "kraj":"'.$row['kraj_zamieszkania'].'"
                }
                ';
                break;
            case 'Miejsce urodzenia':
                $response = 
                '
                {
                    "miasto":"'.$row['miasto_urodzenia'].'",
                    "kraj":"'.$row['kraj_urodzenia'].'"
                }
                ';
                break;
        }
    }
    else if($_POST['setting-type'] === 'three'){
        $query = "SELECT dob FROM users WHERE userid='$userid'";
        if($result = $con->query($query)){
            $row = $result->fetch_assoc();
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
        $response = strtotime($row['dob']);
    }


    echo $response;