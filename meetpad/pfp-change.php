<?php
    require_once 'inc/connection.php';
    include 'inc/account-class.php';
    session_start();
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

    if(isset($_FILES['pfp']) && $_FILES['pfp']['size']!==0){
        $ok = true;
        if($_FILES['pfp']['type']!== 'image/jpeg'){
            $error = 'Nieprawidłowy typ pliku!';
            $ok = false;
        }
        if($_FILES['pfp']['size']>8000000){
            $error = 'Plik jest za duży';
            $ok = false;
        }
        if($ok===true){
            $pname = rand(1000,10000).'-'.htmlentities($_FILES['pfp']['name'], ENT_QUOTES);
            $tname = $_FILES['pfp']['tmp_name'];
            $file_path = 'img/pfp/'.$pname;
            move_uploaded_file($tname,$file_path);


            $query = "UPDATE users SET profilowe='$file_path' WHERE userid='$userid'";
            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
        }
    }
    else{
        $error = 'Nie przesłano pliku!';
    }


    $response = 
    '
    {
        "path":"'.@$file_path.'",
        "error":"'.@$error.'"
    }
    ';

    echo $response;

    