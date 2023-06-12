<?php
    if(!isset($_POST['id_komentarza'])||!isset($_POST['typ'])){
        header('Location: homepage');
        exit();
    }

    $id_komentarza = htmlentities($_POST['id_komentarza'],ENT_QUOTES);
    $typ = htmlentities($_POST['typ'], ENT_QUOTES);
    if($typ!=='like'&&$typ!=='dislike'){
        exit();
    }

    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $query = "SELECT id FROM komentarze WHERE id='$id_komentarza'";
            if($result = $con->query($query)){
                if($result->num_rows>0){
                    $user_id = $_SESSION['user_id'];
                    $query = "SELECT typ FROM reakcje WHERE id_reagujacego='$user_id' AND id_komentarza='$id_komentarza'";
                    if($result = $con->query($query)){
                        if($result->num_rows>0){
                            $result = $result->fetch_assoc();
                            if($result['typ']===$typ){
                                $query = "DELETE FROM reakcje WHERE id_reagujacego='$user_id' AND id_komentarza='$id_komentarza'";
                                if($con->query($query)){
                                    echo 'usunieto';
                                }
                                else{
                                    exit();
                                }
                            }
                            else{
                                $query_delete = "DELETE FROM reakcje WHERE id_reagujacego='$user_id' AND id_komentarza='$id_komentarza'";
                                $query_add = "INSERT INTO reakcje(id_reagujacego,id_komentarza,typ) VALUES('$user_id','$id_komentarza','$typ')";
                                if($con->query($query_delete)&&$con->query($query_add)){
                                    echo 'usunieto i dodano';
                                }
                                else{
                                    exit();
                                }
                            }
                        }
                        else{
                            $query = "INSERT INTO reakcje(id_reagujacego,id_komentarza,typ) VALUES('$user_id', '$id_komentarza', '$typ')";
                            if($con->query($query)){
                                echo 'dodano';
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
                    exit();
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
    