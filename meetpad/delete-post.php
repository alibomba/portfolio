<?php
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['postid'])){
        header('Location: homepage');
        exit();
    }

    $postid = $_POST['postid'];

    $query = "DELETE FROM posts WHERE postid='$postid'";
    if(!$con->query($query)){
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }