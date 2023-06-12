<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(authorize_user($_SESSION['userid'],$_SESSION['PHPSESSID'],$_SESSION['token'],$con)){
        $userid = $_SESSION['userid'];
        $token = $_SESSION['token'];
        $query = "SELECT * FROM sessions WHERE user_id='$userid' AND token='$token'";
        if($result = $con->query($query)){
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                $row_id = $row['id'];
                $query = "DELETE FROM sessions WHERE id='$row_id'";
                if($con->query($query)){
                    session_destroy();
                    header('Location: logowanie');
                    exit();
                }
                else{
                    exit();
                }
            }
        }
        else{
            exit();
        }
    }
    else{
        header('Location: homepage');
        exit();
    }
?>