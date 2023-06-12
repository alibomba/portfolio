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

    $idzapisujacego = $konto->userid;
    $postid = $_POST['postid'];

    $query = "SELECT bookmarkid FROM bookmarks WHERE idzapisujacego='$idkonta' AND idposta='$postid'";
    if(!$result = $con->query($query)){
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    if($result->num_rows>0){
        $query = "DELETE FROM bookmarks WHERE idzapisujacego='$idkonta' AND idposta='$postid'";
        if($con->query($query)){
            $message = 'Post został usunięty z zapisanych.';
            $button_content = 'Zapisz post';
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }
    else{
        $query = "SELECT idautora FROM posts WHERE postid='$postid'";
        if($result = $con->query($query)){
            $row = $result->fetch_assoc();
            $idautora = $row['idautora'];
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }

        $query = "INSERT INTO bookmarks(idposta,idautora,idzapisujacego) VALUES('$postid','$idautora','$idzapisujacego')";
        if($con->query($query)){
            $message = 'Post został zapisany.';
            $button_content = 'Usuń z zapisanych';
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }

    $response = 
    '
    {
        "message":"'.$message.'",
        "button_content":"'.$button_content.'"
    }
    ';

    echo $response;