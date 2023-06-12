<?php
    if(!isset($_POST['tresc']) || !isset($_POST['liczba_gwiazdek'])){
        header('Location: homepage');
        exit();
    }
    session_start();

    $tresc = htmlentities($_POST['tresc'], ENT_QUOTES);
    $liczba_gwiazdek = intval($_POST['liczba_gwiazdek']);
    $userid = $_SESSION['userid'];
    require_once '../inc/connection.php';
    $query = "INSERT INTO opinie(user_id,liczba_gwiazdek,tresc) VALUES('$userid','$liczba_gwiazdek', '$tresc')";
    if($con->query($query)){
        $id = $con->insert_id;
        $query = "SELECT opinie.*,users.imie,users.nazwisko FROM users,opinie WHERE opinie.id='$id' AND users.id=opinie.user_id";
        if($result=$con->query($query)){
            $result = $result->fetch_assoc();
            $json = json_encode($result);
            echo $json;
        }
        else{
            exit();
        }
    }
    else{
        exit();
    }
