<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['login']) || !isset($_POST['haslo'])){
        header('Location: homepage');
        exit();
    }
    $idkonta = $_SESSION['idkonta'];
    $query = "SELECT * FROM users WHERE userid='$idkonta'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $konto = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
        $userhaslo = $row['haslo'];
        $userid = $konto->userid;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }


    $login = htmlentities($_POST['login'], ENT_QUOTES, 'UTF-8');
    $haslo = htmlentities($_POST['haslo'], ENT_QUOTES, 'UTF-8');


    $ok = true;
    if($login === ''){
        $ok = false;
        $message = 'Podaj adres e-mail!';
    }
    if($haslo === ''){
        $ok = false;
        $message = 'Podaj hasło!';
    }

    if($ok===true){
        if($login === $konto->email){
            if(password_verify($haslo, $userhaslo)){
                $message = '';
                $query1 = "DELETE FROM users WHERE userid='$userid'";
                $query2 = "DELETE FROM komentarze WHERE idautora='$userid'";
                $query3 = "DELETE FROM posts WHERE idautora='$userid'";
                $query4 = "DELETE FROM reakcje WHERE liker_id='$userid'";
                $query5 = "DELETE FROM zaproszenia_do_znaj WHERE zapraszajacy='$userid' OR zaproszony='$userid'";

                if(!$con->query($query1)){
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
                if(!$con->query($query2)){
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
                if(!$con->query($query3)){
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
                if(!$con->query($query4)){
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
                if(!$con->query($query5)){
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
                session_unset();
                header('Location: logowanie');
            }
            else{
                $message = 'Nieprawidłowy login lub hasło!';
            }
        }
        else{
            $message = 'Nieprawidłowy login lub hasło!';
        }
    }
   

    echo $message;