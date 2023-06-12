<?php
if(!isset($_POST['wiek']) || !isset($_POST['liczba_treningow']) || !isset($_POST['waga']) || !isset($_POST['wzrost']) || !isset($_POST['email']) || !isset($_POST['poziom']) || !isset($_POST['cel'])){
    header('Location: homepage');
    exit();
}

$wiek = htmlentities($_POST['wiek'], ENT_QUOTES, 'UTF-8');
$liczba_treningow = htmlentities($_POST['liczba_treningow'], ENT_QUOTES, 'UTF-8');
$waga = htmlentities($_POST['waga'], ENT_QUOTES, 'UTF-8');
$wzrost = htmlentities($_POST['wzrost'], ENT_QUOTES, 'UTF-8');
$email = htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8');
$poziom = htmlentities($_POST['poziom'], ENT_QUOTES, 'UTF-8');
$cel = htmlentities($_POST['cel'], ENT_QUOTES, 'UTF-8');


require_once 'inc/connection.php';

$query = "INSERT INTO plany(wiek,liczba_treningow,waga,wzrost,email,poziom_zaawansowania,cel) VALUES('$wiek','$liczba_treningow','$waga','$wzrost','$email','$poziom', '$cel')";
if($con->query($query)){
    echo 'Udane';
}
else{
    echo 'Błąd bazy danych nr '.$con->connect_errno;
    exit();
}