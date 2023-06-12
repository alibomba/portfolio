<?php
    if(!isset($_POST['id_koszyka'])||!isset($_POST['operacja'])){
        header('Location: homepage');
        exit();
    }
    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';

    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $id_koszyka = htmlentities($_POST['id_koszyka'],ENT_QUOTES);
            $operacja = htmlentities($_POST['operacja'], ENT_QUOTES);
            if(is_numeric($id_koszyka)){
                switch($operacja){
                    case 'minus':
                        $query = "UPDATE koszyki SET ilosc=ilosc-1 WHERE id='$id_koszyka'";
                        break;
                    case 'plus':
                        $query = "UPDATE koszyki SET ilosc=ilosc+1 WHERE id='$id_koszyka'";
                        break;
                    default:
                        header('Location: homepage');
                        exit();
                        break;
                }
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