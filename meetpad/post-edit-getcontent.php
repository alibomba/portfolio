<?php
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['postid'])){
        header('Location: homepage');
        exit();
    }
    $postid = $_POST['postid'];

    $query = "SELECT tresc_posta FROM posts WHERE postid='$postid'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $tresc = $row['tresc_posta'];
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    echo $tresc;