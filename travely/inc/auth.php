<?php
    function authorize_user($userid,$phpsessid,$token,$con){
        $query = "SELECT * FROM sessions WHERE user_id='$userid'";
        if($result = $con->query($query)){
            $fine = true;
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                $phpsessid_hash = $row['phpsessid'];
                $token_db = $row['token'];
                $data_wygasniecia = new DateTime($row['data_wygasniecia']);
                $now = new DateTime('now');
                if(!password_verify($phpsessid,$phpsessid_hash)){
                    $fine = false;
                }
                if($token_db !== $token){
                    $fine = false;
                }
                if($data_wygasniecia<$now){
                    $fine = false;
                    $query = "DELETE FROM sessions WHERE user_id='$userid' AND token='$token'";
                    if(!$con->query($query)){
                        exit();
                    }
                }
                if($fine){
                    return true;
                }
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