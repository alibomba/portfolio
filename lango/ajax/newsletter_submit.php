<?php
    if(!isset($_POST['email'])){
        exit();
    }
    $email = htmlentities($_POST['email'], ENT_QUOTES);
    if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
        echo '{
            "type":"bad",
            "message":"Podaj poprawny adres e-mail"
        }';
        exit();
    }
    require_once '../inc/connection.php';
    $query = "SELECT id FROM newsletter WHERE email='$email'";
    if($result = $con->query($query)){
        if($result->num_rows>0){
            echo '{
                "type":"bad",
                "message":"W bazie istnieje już podany adres e-mail"
            }';
        }
        else{
            $query = "INSERT INTO newsletter(email) VALUES('$email')";
            if($con->query($query)){
                echo '{
                    "type":"good",
                    "message":"Adres e-mail został dodany do bazy"
                }';
            }
            else{
                exit();
            }
        }
    }
    else{
        exit();
    }
