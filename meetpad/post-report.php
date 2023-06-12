<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['postid']) || !isset($_POST['content'])){
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
    $idzglaszajacego = $idkonta;
    $query = "SELECT idautora FROM posts WHERE postid='$postid'";
    if($result = $con->query($query)){
        $result = $result->fetch_assoc();
        $idzglaszanego = $result['idautora'];
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
    $content = htmlentities($_POST['content'],ENT_QUOTES,'UTF-8');


    $query = "INSERT INTO reports(idzglaszajacego,idzglaszanego,idposta,tresc_zgloszenia) VALUES('$idzglaszajacego','$idzglaszanego','$postid','$content')";
    if($con->query($query)){
        echo 'Post został zgłoszony.';
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }