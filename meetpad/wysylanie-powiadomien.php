<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['current'])){
      header('Location: homepage');
      exit();
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

    $current = $_POST['current'];
    $query = "SELECT idpowiadomienia FROM powiadomienia WHERE odbiorca = '$idkonta'";
    if($result = $con->query($query)){
        if($result->num_rows>$current){
            $roznica = $result->num_rows - $current;
            $newcurrentpowiadomienia = $current + $roznica;
            $query = "SELECT profilowe,full_name,tresc FROM powiadomienia WHERE odbiorca='$idkonta' ORDER BY data_powiadomienia DESC LIMIT 1";
            if($result = $con->query($query)){
                $row = $result->fetch_assoc();
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
            $response = 
            '
            {
                "nowe":"true",
                "newcurrentpowiadomienia":"'.$newcurrentpowiadomienia.'",
                "powiadomienie":
                {
                    "name":"'.$row['full_name'].'",
                    "profilowe":"'.$row['profilowe'].'",
                    "tresc":"'.$row['tresc'].'"
                }
            }
            ';
            echo $response;
        }
        else{
            echo 
            '
            {
                "nowe":"false",
                "newcurrentpowiadomienia":"'.$current.'"
            }
            ';
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }