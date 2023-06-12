<?php
    if(!isset($_POST['id_komentarza'])){
        header('Location: homepage');
        exit();
    }

    $id_komentarza = htmlentities($_POST['id_komentarza'], ENT_QUOTES);
    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $query = "DELETE FROM komentarze WHERE id='$id_komentarza'";
            if($con->query($query)){
                echo 'usunieto';
            }
            else{
                exit();
            }
        }
        else{
            exit();
        }
    }
    else{
        exit();
    }