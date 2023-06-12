<?php
    $host = "localhost";
    $uzytkownik = "root";
    $db_haslo = "";
    $db_nazwa = "meetpad";

    $con = @new mysqli($host, $uzytkownik, $db_haslo, $db_nazwa);
    if($con->connect_errno!=0)
    {
        echo "Błąd bazy danych nr ".$con->connect_errno;
        exit();
    }
?>