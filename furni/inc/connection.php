<?php
    $con = new mysqli('localhost', 'root', '', 'furni');
    if($con->connect_errno!=0){
        exit();
    }
?>