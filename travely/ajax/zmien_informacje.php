<?php
    if(!isset($_POST['imie']) || !isset($_POST['nazwisko']) || !isset($_POST['email'])){
        header('Location: homepage');
        exit();
    }
    session_start();
    $userid = $_SESSION['userid'];
    require_once '../inc/connection.php';
    $imie = $_POST['imie'];
    $nazwisko = $_POST['nazwisko'];
    $email = htmlentities($_POST['email'],ENT_QUOTES);
    $query = "SELECT id FROM users WHERE email='$email'";
    if($result = $con->query($query)){
        $liczba = $result->num_rows;
    }
    else{
        exit();
    }

    $query = "SELECT imie,nazwisko,email FROM users WHERE id='$userid'";
    if($result = $con->query($query)){
        $result = $result->fetch_assoc();
        $current_imie = $result['imie'];
        $current_nazwisko = $result['nazwisko'];
        $current_email = $result['email'];
    }
    else{
        exit();
    }

    if(strlen($imie)<3 || strlen($imie)>15){
        echo '{
            "typ":"bad",
            "info":"Imię musi posiadać od 3 do 15 znaków"
        }';
    }
    else if(strlen($nazwisko)<3 || strlen($nazwisko)>15){
        echo '{
            "typ":"bad",
            "info":"Nazwisko musi posiadać od 3 do 15 znaków"
        }';
    }
    else if(filter_var($email, FILTER_VALIDATE_EMAIL)===false){
        echo '{
            "typ":"bad",
            "info":"Podaj poprawny adres e-mail"
        }';
    }
    else if($liczba>0 && $email!==$current_email){
        echo '{
            "typ":"bad",
            "info":"Podany adres e-mail już jest użyty"
        }';
    }
    else if($imie===$current_imie && $nazwisko===$current_nazwisko && $email===$current_email){
        exit();
    }
    else{
        $imie = htmlentities($_POST['imie'], ENT_QUOTES);
        $nazwisko = htmlentities($_POST['nazwisko'], ENT_QUOTES);
        $query = "UPDATE users SET imie='$imie',nazwisko='$nazwisko',email='$email'";
        if($con->query($query)){
            echo '{
                "typ":"good",
                "info":"Pomyślnie zmieniono ustawienia konta"
            }';
        }
        else{
            exit();
        }
    }
    