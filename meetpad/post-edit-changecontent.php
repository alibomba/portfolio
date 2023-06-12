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

    $postid = $_POST['postid'];
    $content = htmlentities($_POST['changed_content'],ENT_QUOTES,'UTF-8');

    $query = "UPDATE posts SET tresc_posta='$content' WHERE postid='$postid'";
    if(!$con->query($query)){
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    // checking for mentions
    $query = "SELECT * FROM users";
    if($result = $con->query($query)){
        $accounts = $result->fetch_all(MYSQLI_ASSOC);
        $mentioned_ids = [];
        foreach($accounts as $account){
            $mention = '@'.$account['imie'].' '.$account['nazwisko'];
            $position = strpos($_POST['changed_content'], $mention);
            if($position !== false){
                $mentioned_ids[] = $account['userid'];
            }
        }
        if(count($mentioned_ids)!==0){
            $profilowe = $konto->profilowe;
            $full_name = $konto->full_name();
            foreach($mentioned_ids as $mention){
                if($mention!==$konto->userid){
                    $query = "INSERT INTO powiadomienia(odbiorca,profilowe,full_name,tresc,kto_oznaczyl) VALUES('$mention', '$profilowe', '$full_name', 'oznaczył/a Cię w poście','$idkonta')";
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