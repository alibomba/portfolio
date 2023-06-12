<?php
    if(!isset($_POST['koszyk']) || !isset($_POST['adres']) || !isset($_POST['nr_tel'])){
        header('Location: homepage');
        exit();
    }

    $koszyk = json_decode($_POST['koszyk']);
    $adres = $_POST['adres'];
    $nr_tel = $_POST['nr_tel'];

    $lista = '';
    $cena = 0;

    foreach($koszyk as $produkt){
        $lista.=$produkt->nazwa.' - '.$produkt->ilosc.', ';
        $cena += $produkt->cena*$produkt->ilosc;
    }
    $cena += 5.99;

    require_once 'connection.php';
    $query = "INSERT INTO zamowienie(produkty,cena,adres,nr_tel) VALUES('$lista', '$cena', '$adres', '$nr_tel')";
    if($con->query($query)){
        echo 'Zamówiono';
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }


