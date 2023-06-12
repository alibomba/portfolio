<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['postid'])){
        header('Location: homepage');
        exit();
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

    $postid = $_POST['postid'];

    $query = "SELECT ukryty_dla FROM posts WHERE postid='$postid'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $ukryty_dla = $row['ukryty_dla'];
        $ukryty_dla = $ukryty_dla.','.$idkonta;
        $query = "UPDATE posts SET ukryty_dla='$ukryty_dla' WHERE postid='$postid'";
        if(!$con->query($query)){
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }