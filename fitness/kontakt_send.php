<?php
if(!isset($_POST['temat']) || !isset($_POST['email']) || !isset($_POST['tresc'])){
    header('Location: homepage');
    exit();
}

$temat = htmlentities($_POST['temat'],ENT_QUOTES,'UTF-8');
$email = htmlentities($_POST['email'],ENT_QUOTES,'UTF-8');
$tresc = htmlentities($_POST['tresc'],ENT_QUOTES,'UTF-8');

require_once 'inc/connection.php';
$query = "INSERT INTO feedback(email,temat,tresc) VALUES('$email', '$temat','$tresc')";
if($con->query($query)){
    echo 'Dziala';
}
else{
    echo 'Bład bazy danych nr '.$con->connect_errno;
    exit();
}