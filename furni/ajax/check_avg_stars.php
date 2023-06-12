<?php
    if(!isset($_POST['id_produktu'])){
        header('Location: homepage');
        exit();
    }
    $id_produktu = htmlentities($_POST['id_produktu'],ENT_QUOTES);
    require_once '../inc/connection.php';
    $query = "SELECT AVG(liczba_gwiazdek) as srednia FROM komentarze WHERE id_produktu='$id_produktu'";
    if($result = $con->query($query)){
        $result = $result->fetch_assoc();
        if(is_null($result['srednia'])){
            echo 'Brak ocen';
        }
        else{
            echo round($result['srednia']);
        }
    }
    else{
        exit();
    }