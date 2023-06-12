<?php
    if(!isset($_POST['mail'])){
        header('Location: homepage');
        exit();
    }

    $mail = $_POST['mail'];
    if(filter_var($mail,FILTER_VALIDATE_EMAIL)){
        require_once 'inc/connection.php';
        $mail = htmlentities($mail,ENT_QUOTES,'UTF-8');
        $query = "INSERT INTO newsletter(email) VALUES('$mail')";
        if($con->query($query)){
            echo 'git';
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    }
    else{
        echo 'nie git';
    }