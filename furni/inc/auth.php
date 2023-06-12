<?php
    function authorize_user($userid,$phpsessid,$token,$con){
        $query = "SELECT * FROM sessions WHERE user_id='$userid'";
        if($result = $con->query($query)){
            $row = $result->fetch_assoc();
            $ok = true;
            if(!password_verify($phpsessid,$row['phpsessid'])){
                $ok = false;
            }
            if($token!==$row['token']){
                $ok = false;
            }
            $now = new DateTime('now');
            if($now->format('Y-m-d H:i:s')>$row['data_wygasniecia']){
                $ok = false;
            }
            if($ok){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            exit();
        }
    }
?>