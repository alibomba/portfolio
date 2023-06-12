<?php
    $host = "localhost";
    $uzytkownik = "root";
    $db_haslo = "";
    $db_nazwa = "bobby";

    $con = @new mysqli($host, $uzytkownik, $db_haslo, $db_nazwa);
    if($con->connect_errno!=0)
    {
        echo "Błąd bazy danych nr ".$con->connect_errno;
        exit();
    }
    $query = "SET NAMES utf8mb4";
    $con->query($query);
?>