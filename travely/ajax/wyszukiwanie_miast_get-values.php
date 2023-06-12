<?php
if(!isset($_POST['fraza'])){
    echo 'Brak';
    exit();
}
$fraza = htmlentities($_POST['fraza'],ENT_QUOTES,'UTF-8');


require_once '../inc/connection.php';
$query = "SELECT miasto FROM pakiety WHERE miasto LIKE '$fraza%' LIMIT 5";
if($result = $con->query($query)){
    $result = $result->fetch_all(MYSQLI_ASSOC);
    $json = json_encode($result);
    echo $json;
}
else{
    echo 'Brak';
}