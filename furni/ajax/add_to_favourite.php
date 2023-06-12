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
            $id_produktu = htmlentities($_POST['id_produktu'],ENT_QUOTES);
            $user_id = $_SESSION['user_id'];
            $query = "SELECT id FROM ulubione WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
            if($result = $con->query($query)){
                if($result->num_rows===0){
                    $query = "INSERT INTO ulubione(user_id,id_produktu) VALUES('$user_id','$id_produktu')";
                    if($con->query($query)){
                        echo 'dodano';
                    }
                    else{
                        exit();
                    }
                }
                else{
                    $result = $result->fetch_assoc();
                    $id_pozycji = $result['id'];
                    $query = "DELETE FROM ulubione WHERE id='$id_pozycji'";
                    if($con->query($query)){
                        echo 'usunieto';
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
            echo 'nie zalogowano';
        }
    }
    else{
        echo 'nie zalogowano';
    }