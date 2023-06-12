<?php
    require_once 'inc/connection.php';
    include 'inc/account-class.php';
    session_start();
    if(!isset($_POST['sprawdzenie']) || $_POST['sprawdzenie']!=true){
        header('Location: homepage');
        exit();
    }
    $idkonta = $_SESSION['idkonta'];

    $query = "SELECT idpowiadomienia FROM powiadomienia WHERE odbiorca='$idkonta'";
    if($result = $con->query($query)){
        $response = $result->num_rows;
        echo $response;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }