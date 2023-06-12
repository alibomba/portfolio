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


if(isset($_POST['content']) && isset($_POST['parentid'])){
    $content = $_POST['content'];
    $autor = $konto->full_name();
    $parentid = $_POST['parentid'];
    $profilowe = $konto->profilowe;
    $idautora = $konto->userid;

    //checking for mentions
    $query = "SELECT * FROM users";
    if($result = $con->query($query)){
        $accounts = $result->fetch_all(MYSQLI_ASSOC);
        $mentioned_ids = [];
        foreach($accounts as $account){
            $mention = '@'.$account['imie'].' '.$account['nazwisko'];
            $position = strpos($content, $mention);
            if($position !== false){
                $mentioned_ids[] = $account['userid'];
            }
        }
        if(count($mentioned_ids)!==0){
            foreach($mentioned_ids as $mention){
                if($mention!==$konto->userid){
                    $query = "INSERT INTO powiadomienia(odbiorca,profilowe,full_name,tresc,pod_jakim_postem_kom_oznaczono) VALUES('$mention', '$profilowe', '$autor', 'oznaczył/a Cię w komentarzu','$parentid')";
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
    $content = htmlentities($content, ENT_QUOTES, 'utf-8');


    $query = "INSERT INTO komentarze(parentid,idautora,autor_komentarza, prof_autora, tresc_komentarza) VALUES('$parentid','$idautora','$autor', '$profilowe', '$content')";
    
    if(!$con->query($query)){
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    $query = "SELECT idautora FROM posts WHERE postid='$parentid'";
    if($result = $con->query($query)){
        $result = $result->fetch_assoc();
        $odbiorca = $result['idautora'];
        if($odbiorca !== $konto->userid){
            $query = "INSERT INTO powiadomienia (odbiorca, profilowe, full_name, tresc,jaki_post_skomentowano) VALUES('$odbiorca', '$profilowe', '$autor', 'dodał/a komentarz do Twojego posta','$parentid')";
            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
            $query = "SELECT unread_notis FROM users WHERE userid='$odbiorca'";
            if($result = $con->query($query)){
                $result = $result->fetch_assoc();
                $new_unread = $row['unread_notis']+1;
                $query = "UPDATE users SET unread_notis='$new_unread' WHERE userid='$odbiorca'";
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
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    $query = "SELECT * FROM komentarze WHERE parentid = '$parentid'";
    if($result = $con->query($query)){
        $newcomments = $result->num_rows;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    $query = "SELECT * FROM posts WHERE postid='$parentid'";
    if($result = $con->query($query)){
        $result = $result->fetch_assoc();
        $comments = $result['komentarze'];
        $comments++;
        $query = "UPDATE posts SET komentarze='$comments' WHERE postid='$parentid'";
        if(!$con->query($query)){
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    $nowobj = new DateTime('now');
    $now = $nowobj->format('Y-m-d H:i:s'); 

    $query = "SELECT * FROM komentarze WHERE data_wstawienia='$now'";
    if($result = $con->query($query)){
        $result = $result->fetch_assoc();
        $komid = $result['komid'];
        $content = $result['tresc_komentarza'];
        $response = 
        '
        {
            "komid":"'.$komid.'",
            "autor":"'.$autor.'",
            "profilowe":"'.$profilowe.'",
            "content":"'.$content.'",
            "newcomments":"'.$newcomments.'",
            "data":"Przed chwilą"
        }
        ';
        echo $response;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
}