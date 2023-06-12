<?php
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['postid'])){
        header('Location: homepage');
        exit();
    }

    $postid = $_POST['postid'];

    $query = "SELECT widocznosc FROM posts WHERE postid='$postid'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $currentwidocznosc = $row['widocznosc'];
        if($currentwidocznosc === 'public'){
            $newwidocznosc = 'private';
        }
        else if($currentwidocznosc === 'private'){
            $newwidocznosc = 'public';
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    $query = "UPDATE posts SET widocznosc='$newwidocznosc' WHERE postid='$postid'";
    if($con->query($query)){
        echo $newwidocznosc;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }