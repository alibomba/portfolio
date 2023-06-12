<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $userid = $_SESSION['user_id'];
            $query = "SELECT id FROM sessions WHERE user_id='$userid'";
            if($result = $con->query($query)){
                $result = $result->fetch_assoc();
                $id = $result['id'];
            }
            else{
                exit();
            }
            $query = "DELETE FROM sessions WHERE id='$id'";
            if($con->query($query)){
                setcookie("PHPSESSID", "", time() - 3600);
                setcookie("token", "", time() - 3600);
                session_destroy();
                header('Location: logowanie');
                exit();
            }
            else{
                exit();
            }
        }
        else{
            header('Location: homepage');
            exit();
        }
    }
    else{
        header('Location: homepage');
        exit();
    }
?>