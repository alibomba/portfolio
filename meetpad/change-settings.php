<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['setting_name'])){
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
    $setting_name = $_POST['setting_name'];
    if($setting_name === 'Imię' || $setting_name === 'Nazwisko' || $setting_name === 'E-mail (login)' || $setting_name === 'Data urodzenia' || $setting_name === 'Opis profilu' || $setting_name === 'Numer telefonu (wyświetlany w profilu)' || $setting_name === 'Adres e-mail (wyświetlany w profilu)' || $setting_name === 'Szkoła' || $setting_name === 'Praca'){
        $setting = $_POST['setting'];
    }
    else{
        $miasto = $_POST['miasto'];
        $kraj = $_POST['kraj'];
    }
    switch($setting_name){
        case 'Imię':
            $query = "UPDATE users SET imie='$setting' WHERE userid='$userid'";
            break;
        case 'Nazwisko':
            $query = "UPDATE users SET nazwisko='$setting' WHERE userid='$userid'";
            break;
        case 'E-mail (login)':
            $query = "UPDATE users SET email='$setting' WHERE userid='$userid'";
            break;
        case 'Data urodzenia':
            $query = "UPDATE users SET dob='$setting' WHERE userid='$userid'";
            break;
        case 'Opis profilu':
            $query = "UPDATE users SET opis='$setting' WHERE userid='$userid'";
            break;
        case 'Numer telefonu (wyświetlany w profilu)':
            $query = "UPDATE users SET nr_tel='$setting' WHERE userid='$userid'";
            break;
        case 'Adres e-mail (wyświetlany w profilu)':
            $query = "UPDATE users SET kontakt_email='$setting' WHERE userid='$userid'";
            break;
        case 'Miejsce zamieszkania':
            $query = "UPDATE users SET miasto_zamieszkania='$miasto',kraj_zamieszkania='$kraj' WHERE userid='$userid'";
            break;
        case 'Szkoła':
            $query = "UPDATE users SET szkola='$setting' WHERE userid='$userid'";
            break;
        case 'Praca':
            $query = "UPDATE users SET praca='$setting' WHERE userid='$userid'";
            break;
        case 'Miejsce urodzenia':
            $query = "UPDATE users SET miasto_urodzenia='$miasto',kraj_urodzenia='$kraj' WHERE userid='$userid'";
            break;
    }



    if($con->query($query)){
        if($setting_name === 'Imię' || $setting_name === 'Nazwisko' || $setting_name === 'E-mail (login)' || $setting_name === 'Opis profilu' || $setting_name === 'Numer telefonu (wyświetlany w profilu)' || $setting_name === 'Adres e-mail (wyświetlany w profilu)' || $setting_name === 'Szkoła' || $setting_name === 'Praca'){
            $response = $setting;
        }
        else if($setting_name === 'Data urodzenia'){
            $response = strtotime($setting);
        }
        else{
            $response = 
            '
            {
                "miasto":"'.$miasto.'",
                "kraj":"'.$kraj.'"
            }
            ';
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }


    echo $response;