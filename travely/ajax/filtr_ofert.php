<?php
    if(!isset($_POST['miasto']) || !isset($_POST['poczatek']) || !isset($_POST['koniec']) || !isset($_POST['osob']) || !isset($_POST['maks_cena'])){
        exit();
    }
    $miasto = htmlentities($_POST['miasto'], ENT_QUOTES, 'UTF-8');
    $poczatek = htmlentities($_POST['poczatek'], ENT_QUOTES, 'UTF-8');
    $koniec = htmlentities($_POST['koniec'], ENT_QUOTES, 'UTF-8');
    $osob = htmlentities($_POST['osob'], ENT_QUOTES, 'UTF-8');
    $maks_cena = htmlentities($_POST['maks_cena'], ENT_QUOTES, 'UTF-8');

    require_once '../inc/connection.php';
    $query = "INSERT INTO filtr(miasto,poczatek,koniec,osob,maks_cena) VALUES('$miasto', '$poczatek','$koniec','$osob','$maks_cena')";
    if($con->query($query)){
        echo 'fine';
    }
    else{
        echo 'error';
        exit();
    }