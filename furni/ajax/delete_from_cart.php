<?php
    if(!isset($_POST['id_koszyka'])){
        header('Location: homepage');
        exit();
    }
    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';

    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $id_koszyka = htmlentities($_POST['id_koszyka'], ENT_QUOTES);
            if(is_numeric($id_koszyka)){
                $query = "DELETE FROM koszyki WHERE id='$id_koszyka'";
                if($con->query($query)){
                    echo 'fine';
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
    }
    else{
        header('Location: homepage');
        exit();
    }