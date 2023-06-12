<?php
    if(!isset($_POST['email'])){
        exit();
    }
    require_once '../inc/connection.php';
    $email = htmlentities($_POST['email'],ENT_QUOTES);
    $query = "SELECT id FROM newsletter WHERE email='$email'";
    if($result = $con->query($query)){
        $liczba = $result->num_rows;
    }
    else{
        exit();
    }
    if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
       echo 'invalid email';
    }
    else if($liczba>0){
        echo 'istnieje';
    }
    else{
        $query = "INSERT INTO newsletter(email) VALUES('$email')";
        if($con->query($query)){
            echo 'fine';
        }
        else{
            exit();
        }
    }
?>