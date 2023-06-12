<?php
    if(!isset($_POST['sprawdzanie']) || $_POST['sprawdzanie']!=true){
        exit();
    }
    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';
    if(isset($_SESSION['userid'])){
        if(authorize_user($_SESSION['userid'],$_SESSION['PHPSESSID'],$_SESSION['token'],$con)){
            echo 'zalogowano';
        }
        else{
            echo 'nie zalogowano';
        }
    }
    else{
        echo 'nie zalogowano';
    }
?>