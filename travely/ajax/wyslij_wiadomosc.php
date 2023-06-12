<?php
    if(!isset($_POST['temat']) || !isset($_POST['tresc'])){
        header('Location: homepage');
        exit();
    }
    session_start();
    $id = $_SESSION['userid'];
    $temat = htmlentities($_POST['temat'],ENT_QUOTES);
    $tresc = htmlentities($_POST['tresc'],ENT_QUOTES);
    $query = "INSERT INTO kontakt(user_id,temat,tresc) VALUES('$id','$temat','$tresc')";
    require_once '../inc/connection.php';
    if($con->query($query)){
        echo 'fine';
    }
    else{
        exit();
    }

?>