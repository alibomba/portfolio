<?php
include 'inc/account-class.php';
require_once 'inc/connection.php';
session_start();
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

$autor = $konto->full_name();
$profilowe = $konto->profilowe;
$idautora = $konto->userid;

// file sanitization
if(isset($_FILES['file']) && $_FILES['file']['size'] > 0){
    $file_ok = true;
    if($_FILES['file']['size'] > 10000000){
        $file_error = 'Plik jest za duży!';
        $file_ok = false;
    }
    if($_FILES['file']['type'] != 'image/jpeg'){
        $file_error = 'Niedozwolony typ pliku!';
        $file_ok = false;
    }
    if($file_ok === true){
        $pname = rand(1000,10000).'-'.htmlentities($_FILES['file']['name'], ENT_QUOTES);
        $tname = $_FILES['file']['tmp_name'];
        $file_path = 'img/posts-img/'.$pname;
        move_uploaded_file($tname,$file_path);
    }
}


// checking for mentions
$query = "SELECT * FROM users";
if($result = $con->query($query)){
    $accounts = $result->fetch_all(MYSQLI_ASSOC);
    $mentioned_ids = [];
    foreach($accounts as $account){
        $mention = '@'.$account['imie'].' '.$account['nazwisko'];
        $position = strpos($_POST['content'], $mention);
        if($position !== false){
            $mentioned_ids[] = $account['userid'];
        }
    }
    if(count($mentioned_ids)!==0){
        $profilowe = $konto->profilowe;
        $full_name = $konto->full_name();
        foreach($mentioned_ids as $mention){
            if($mention!==$konto->userid){
                $query = "INSERT INTO powiadomienia(odbiorca,profilowe,full_name,tresc,kto_oznaczyl) VALUES('$mention', '$profilowe', '$full_name', 'oznaczył/a Cię w poście','$idautora')";
                if(!$con->query($query)){
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
                $query = "SELECT unread_notis FROM users WHERE userid='$mention'";
                if($result = $con->query($query)){
                    $result = $result->fetch_assoc();
                    $new_unread = $row['unread_notis']+1;
                    $query = "UPDATE users SET unread_notis='$new_unread' WHERE userid='$mention'";
                    if(!$con->query($query)){
                        echo 'Błąd bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
            }
        }
    }
}
else{
    echo 'Błąd bazy danych nr '.$con->connect_errno;
    exit();
}

// content sanitization
$content = htmlentities($_POST['content'], ENT_QUOTES);

// location sanitization
if(isset($_POST['location'])){
    $location = htmlentities($_POST['location']);
}

// privacy sanitization
$privacy = htmlentities($_POST['privacy'], ENT_QUOTES);


// add to the database
if(!isset($file_error)){
    if(isset($file_path) && $location != 'undefined'){
        $query = "INSERT INTO posts(idautora,autor_posta,prof_autora,widocznosc,lokalizacja,tresc_posta,obrazek) VALUES ('$idautora','$autor','$profilowe', '$privacy','$location','$content','$file_path')";
    }
    else if(isset($file_path) && $location === 'undefined'){
        $query = "INSERT INTO posts(idautora,autor_posta,prof_autora,widocznosc,tresc_posta,obrazek) VALUES ('$idautora','$autor','$profilowe', '$privacy','$content','$file_path')";
    }
    else if(!isset($file_path) && $location != 'undefined'){
        $query = "INSERT INTO posts(autor_posta,prof_autora,widocznosc,lokalizacja,tresc_posta) VALUES ('$autor','$profilowe', '$privacy','$location','$content')";
    }
    else if(!isset($file_path) && $location === 'undefined'){
        $query = "INSERT INTO posts(idautora,autor_posta,prof_autora,widocznosc,tresc_posta) VALUES ('$idautora','$autor', '$profilowe','$privacy','$content')";
    }

    require_once 'inc/connection.php';

    if($con->query($query)){
        $udany_upload_posta = 'Post został opublikowany.';
    }
    else{
        $db_error = 'Błąd bazy danych nr '.$con->connect_errno;
    }
    $now = new DateTime('now');
    $now_format = $now->format('Y-m-d H:i:s');
    $query = "SELECT * FROM posts WHERE data_wstawienia = '$now_format'";
    if($result = $con->query($query)){
        $uploaded = $result->fetch_assoc();
    }
    else{
        $db_error = 'Błąd bazy danych nr '.$con->connect_errno;
    }
}

$response = 
'   {
        "file_error": "'.@$file_error.'",
        "udany_upload_posta": "'.@$udany_upload_posta.'",
        "db_error": "'.@$db_error.'",
        "uploaded_id":"'.@$uploaded['postid'].'",
        "uploaded_autor":"'.@$uploaded['autor_posta'].'",
        "uploaded_prof_autora": "'.@$uploaded['prof_autora'].'",
        "uploaded_data_wstawienia":"'.@$uploaded['data_wstawienia'].'",
        "uploaded_widocznosc": "'.@$uploaded['widocznosc'].'",
        "uploaded_lokalizacja":"'.@$uploaded['lokalizacja'].'",
        "uploaded_tresc_posta": "'.@$uploaded['tresc_posta'].'",
        "uploaded_lajki":"'.@$uploaded['lajki'].'",
        "uploaded_serca":"'.@$uploaded['serca'].'",
        "uploaded_komentarze":"'.@$uploaded['komentarze'].'",
        "uploaded_obrazek":"'.@$uploaded['obrazek'].'"
    }    
';
echo $response;


