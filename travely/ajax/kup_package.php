<?php
    if(!isset($_POST['id_produktu'])){
        exit();
    }
    session_start();
    $id_produktu = $_POST['id_produktu'];
    $userid = $_SESSION['userid'];
    
    require_once '../inc/connection.php';
    $query = "INSERT INTO zamowienia(user_id,id_produktu) VALUES('$userid','$id_produktu')";
    if($con->query($query)){
        echo 'kupiono';
    }
    else{
        exit();
    }
?>