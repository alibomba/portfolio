<?php
    $con = new mysqli('localhost', 'root', '', 'lango');
    if ($con -> connect_errno) {
        echo "Błąd połączenia z bazą danych: " . $con -> connect_error;
        exit();
    }
?>