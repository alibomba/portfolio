<?php
    require_once 'inc/connection.php';
    include 'inc/account-class.php';
    session_start();
    if(!isset($_POST['userid'])){
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

    $zaproszony = $_POST['userid'];
    $userid = $konto->userid;

    $query = "SELECT idzaproszenia FROM zaproszenia_do_znaj WHERE ((zaproszony='$zaproszony' AND zapraszajacy='$userid') OR (zaproszony='$userid' AND zapraszajacy='$zaproszony')) AND stan='oczekujace'";
    if($result = $con->query($query)){
        if($result->num_rows>0){
            $wyslano = true;
            $row = $result->fetch_assoc();
            $idzaproszenia = $row['idzaproszenia'];
        }
        else{
            $wyslano = false;
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }


    $query = "SELECT idzaproszenia FROM zaproszenia_do_znaj WHERE ((zaproszony='$zaproszony' AND zapraszajacy='$userid') OR (zaproszony='$userid' AND zapraszajacy='$zaproszony')) AND stan='zaakceptowane'";
    if($result = $con->query($query)){
        if($result->num_rows>0){
            $znajomi = true;
            $row = $result->fetch_assoc();
            $idzaproszenia = $row['idzaproszenia'];
        }
        else{
            $znajomi = false;
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }



    if($wyslano === true){
        $query = "DELETE FROM zaproszenia_do_znaj WHERE idzaproszenia='$idzaproszenia'";
        if($con->query($query)){
            $newclass = "add-friend-button--add";
            $newimg = "img/icons/add-friend-icon.png";
            $newcontent = "Dodaj do znajomych";
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }
    else if($znajomi === true){
        $query = "DELETE FROM zaproszenia_do_znaj WHERE idzaproszenia='$idzaproszenia'";
        if($con->query($query)){
            $newclass = "add-friend-button--add";
            $newimg = "img/icons/add-friend-icon.png";
            $newcontent = "Dodaj do znajomych";
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }
    else{
        $query = "INSERT INTO zaproszenia_do_znaj(zapraszajacy,zaproszony) VALUES('$userid', '$zaproszony')";
        if($con->query($query)){
            $newclass = "add-friend-button--cancel";
            $newimg = "img/icons/cancel-friend-invite-icon.png";
            $newcontent = "Anuluj zaproszenie";
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
        $profilowe = $konto->profilowe;
        $full_name = $konto->full_name();
        $query = "INSERT INTO powiadomienia(odbiorca,profilowe,full_name,tresc,kto_zaprosil) VALUES('$zaproszony', '$profilowe', '$full_name', 'wysłał/a Ci zaproszenie do grona znajomych','$idkonta')";
        if(!$con->query($query)){
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
        $query = "SELECT unread_notis FROM users WHERE userid='$zaproszony'";
        if($result = $con->query($query)){
            $result = $result->fetch_assoc();
            $new_unread = $row['unread_notis']+1;
            $query = "UPDATE users SET unread_notis='$new_unread' WHERE userid='$zaproszony'";
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

    $response = '
    {
        "newclass":"'.$newclass.'",
        "newimg":"'.$newimg.'",
        "newcontent":"'.$newcontent.'"
    }
    ';
    echo $response;