<?php
    if(!isset($_POST['id_produktu'])){
        header('Location: homepage');
        exit();   
    }
    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $id_produktu = htmlentities($_POST['id_produktu'], ENT_QUOTES);
            $user_id = $_SESSION['user_id'];
            $query = "SELECT id FROM koszyki WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
            if($result = $con->query($query)){
                $koszyk = $result->num_rows===0 ? 'false' : 'true';
            }
            else{
                exit();
            }
            $query = "SELECT id FROM ulubione WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
            if($result = $con->query($query)){
                $ulubione = $result->num_rows===0 ? 'false' : 'true';
            }
            else{
                exit();
            }
            echo '{
                "koszyk":"'.$koszyk.'",
                "ulubione":"'.$ulubione.'"
            }';
        }
        else{
            echo '{
                "koszyk":"false",
                "ulubione":"false"
            }';
        }
    }
    else{
        echo '{
            "koszyk":"false",
            "ulubione":"false"
        }';
    }