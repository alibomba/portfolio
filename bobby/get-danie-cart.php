<?php
    if(!isset($_POST['id'])){
        header('Location: homepage');
        exit();
    }
    $id = $_POST['id'];
    require_once 'connection.php';
    $query = "SELECT * FROM danie WHERE id_danie='$id'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $response = '
        {
            "obraz":"'.$row['obraz'].'",
            "nazwa":"'.$row['nazwa'].'",
            "cena":'.$row['cena'].'
        }
        ';
        echo $response;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }