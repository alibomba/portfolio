<?php
include 'inc/account-class.php';
require_once 'inc/connection.php';
session_start();

if(!isset($_POST['postid'])){
    header('Location: homepage');
}

$idkonta = $_SESSION['idkonta'];
    $query = "SELECT * FROM users WHERE userid='$idkonta'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $konto = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

$postid = $_POST['postid'];

$query = "SELECT users.imie,users.nazwisko FROM users,posts WHERE posts.postid='$postid' AND users.userid=posts.idautora";
if($result = $con->query($query)){
    $row = $result->fetch_assoc();
    $autor = $row['imie'].' '.$row['nazwisko'];
}
else{
    echo 'Błąd bazy danych nr '.$con->connect_errno;
    exit();
}


$query = "SELECT users.* FROM users,posts WHERE posts.postid = '$postid' AND posts.idautora=users.userid";

if($result = $con->query($query)){
    $row = $result->fetch_assoc();
    $user = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
}
else{
    echo 'Błąd bazy danych nr '.$con->connect_errno;
    exit();
}

$znajomi = $user->znajomi($con);
$wspolniznajomi = $user->wspolni_znajomi($konto,$con);
shuffle($znajomi);
shuffle($wspolniznajomi);

$tempznajomi = [];
foreach($znajomi as $znajomy){
    $query = "SELECT imie,nazwisko FROM users WHERE userid='$znajomy'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $tempznajomi[] = $row['imie'].' '.$row['nazwisko'];
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
}


$tempwspolniznajomi = [];
foreach($wspolniznajomi as $znajomy){
    $query = "SELECT imie, nazwisko FROM users WHERE userid='$znajomy'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $tempwspolniznajomi[] = $row['imie'].' '.$row['nazwisko'];
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit(); 
    }
}




if(count($znajomi) == 0){
    $znajomi = 'Brak znajomych';
}
else if(count($znajomi) == 1){
    $znajomi = 'Znajomi: '.$tempznajomi[0];
}
else if(count($znajomi) == 2){
    $znajomi = 'Znajomi: '.$tempznajomi[0].', '.$tempznajomi[1];
}
else if(count($znajomi) == 3){
    $znajomi = 'Znajomi: '.$tempznajomi[0].', '.$tempznajomi[1].', '.$tempznajomi[2];
}
else if(count($znajomi) > 3){
    $znajomi = 'Znajomi: '.$tempznajomi[0].', '.$tempznajomi[1].', '.$tempznajomi[2].' i inni';
}



if(count($wspolniznajomi) == 0){
    $wspolniznajomi = 'Brak wspólnych znajomych';
}
else if(count($wspolniznajomi) == 1){
    $wspolniznajomi = 'Wspólni znajomi: '.$tempwspolniznajomi[0];
}
else if(count($wspolniznajomi) == 2){
    $wspolniznajomi = 'Wspólni znajomi: '.$tempwspolniznajomi[0].' i '.$tempwspolniznajomi[1];
}
else if(count($wspolniznajomi) == 3){
    $wspolniznajomi = 'Wspólni znajomi: '.$tempwspolniznajomi[0].', '.$tempwspolniznajomi[1].' i '.$tempwspolniznajomi[2];
}
else if(count($wspolniznajomi) > 3){
    $wspolniznajomi = count($wspolniznajomi).' wspólnych znajomych w tym: '.$tempwspolniznajomi[0].', '.$tempwspolniznajomi[1].' i '.$tempwspolniznajomi[2];
}



$response = 
'
{
    "autor":"'.$autor.'",
    "znajomi":"'.$znajomi.'",
    "wspolniznajomi":"'.$wspolniznajomi.'"
}
';

echo $response;