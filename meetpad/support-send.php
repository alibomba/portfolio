<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['tresc'])){
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

    if(isset($_POST['temat'])){
        $temat = $_POST['temat'];
        $tresc = $_POST['tresc'];
        $replyto = $konto->email;

        $query = "INSERT INTO support(idautora,replyto,temat,tresc) VALUES('$userid','$replyto','$temat','$tresc')";
        if($con->query($query)){
            $response = 'Wysłano wiadomość do centrum pomocy Meetpad. Odpowiedź dostaniesz na adres e-mail powiązany z Twoim kontem w przeciągu 48 godzin.';
        }
        else{
            $response = 'Błąd wysyłania zgłoszenia!';
        }
    }
    else if(!isset($_POST['temat'])){
        $tresc = $_POST['tresc'];
        
        $query = "INSERT INTO opinie(idautora,tresc) VALUES('$userid','$tresc')";
        if($con->query($query)){
            $response = 'Pomyślnie wysłano Twoją opinię. Dziękujemy za pomoc w rozwijaniu naszej platformy.';
        }
        else{
            $response = 'Błąd wysyłania opinii!';
        }
    }

    echo $response;