<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    $idkonta = $_SESSION['idkonta'];
        $query = "SELECT * FROM users WHERE userid='$idkonta'";
        if($result = $con->query($query)){
            $row = $result->fetch_assoc();
            $konto = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }

    if(isset($_POST['hearted_id']) && isset($_POST['hearter_id'])){
        $hearted_id = $_POST['hearted_id'];
        $hearter_id = $_POST['hearter_id'];
        $query = "SELECT * FROM reakcje WHERE typ='serce' AND liked_id = '$hearted_id' AND liker_id = '$hearter_id'";
        if($result = $con->query($query)){
            $hearted = $result->num_rows>0 ? true : false;
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
    
    
        if($hearted===false){
            $query = "SELECT lajki,serca FROM posts WHERE postid = '$hearted_id'";
    
            if($result = $con->query($query)){
                $oldarray = $result->fetch_assoc();
                $newhearts = $oldarray['serca']+1;
                $newreactions = $newhearts + $oldarray['lajki'];
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
    
            $query = "INSERT INTO reakcje(typ,liked_id,liker_id) VALUES('serce','$hearted_id', '$hearter_id')";
    
            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }

            $query = "SELECT idautora FROM posts WHERE postid='$hearted_id'";
            if($result = $con->query($query)){
                $result = $result->fetch_assoc();
                $odbiorca = $result['idautora'];
                $profilowe = $konto->profilowe;
                $full_name = $konto->full_name();
                if($odbiorca!==$konto->userid){
                    $query = "INSERT INTO powiadomienia(odbiorca, profilowe, full_name, tresc,jaki_post_poserduszkowano) VALUES('$odbiorca', '$profilowe', '$full_name', 'dodał/a serce do Twojego posta','$hearted_id')";
                    if(!$con->query($query)){
                        echo 'Błąd bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                    $query = "SELECT unread_notis FROM users WHERE userid='$odbiorca'";
                    if($result = $con->query($query)){
                        $result = $result->fetch_assoc();
                        $new_unread = $row['unread_notis']+1;
                        $query = "UPDATE users SET unread_notis='$new_unread' WHERE userid='$odbiorca'";
                        if(!$con->query($query)){
                            echo 'Błąd bazy danych nr '.$con->connect_errno;
                            exit();
                        }
                    }
                    else{
                        echo 'Błąd bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                }
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }


            $query = "SELECT * FROM reakcje WHERE typ='lajk' AND liked_id = '$hearted_id' AND liker_id = '$hearter_id'";
            if($result = $con->query($query)){
                if($result->num_rows>0){
                    $query = "DELETE FROM reakcje WHERE typ='lajk' AND liked_id = '$hearted_id' AND liker_id = '$hearter_id'";
                    if(!$con->query($query)){
                        echo 'Błąd bazy danych nr '.$con->connect_errno;
                        exit();
                    }
                    
                    $query = "SELECT lajki FROM posts WHERE postid = '$hearted_id'";
                    if($result = $con->query($query)){
                        $row = $result->fetch_assoc();
                        $oldlikes = $row['lajki'];
                        $newlikes = $oldlikes-1;
                        $newreactions = $newlikes + $newhearts;
                        $query = "UPDATE posts SET lajki='$newlikes' WHERE postid='$hearted_id'";
                        if(!$con->query($query)){
                            echo 'Błąd bazy danych nr '.$con->connect_errno;
                            exit();
                        }
                    }
                    else{
                        echo 'Błąd bazy danych nr '.$con->connect_errno;
                        exit();
                    }

                }
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
        }
        else{
            $query = "SELECT lajki,serca FROM posts WHERE postid = '$hearted_id'";
    
            if($result = $con->query($query)){
                $oldarray = $result->fetch_assoc();
                $newhearts = $oldarray['serca']-1;
                $newreactions = $newhearts + $oldarray['lajki'];
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
    
            $query = "DELETE FROM reakcje WHERE typ='serce' AND liked_id='$hearted_id' AND liker_id = '$hearter_id'";
            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
        }
    
            $query = "UPDATE posts SET serca = '$newhearts' WHERE postid='$hearted_id'";
    
            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
    
        $response = 
        '
        {
            "newhearts":"'.$newhearts.'",
            "newlikes":"'.@$newlikes.'",
            "newreactions":"'.$newreactions.'"
        }
        ';
    
        echo $response;
    
    }