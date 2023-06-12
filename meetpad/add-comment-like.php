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



    if(isset($_POST['liked_id']) && isset($_POST['liker_id'])){
        $liked_id = $_POST['liked_id'];
        $liker_id = $_POST['liker_id'];

        $query = "SELECT * FROM reakcje WHERE typ='comment-like' AND liked_id = '$liked_id' AND liker_id = '$liker_id'";

        if($result = $con->query($query)){
            $liked = $result->num_rows>0 ? true : false;
        }
        else{
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }


        if($liked === false){
            $query = "SELECT lajki FROM komentarze WHERE komid = '$liked_id'";

            if($result = $con->query($query)){
                $oldarray = $result->fetch_assoc();
                $newlikes = $oldarray['lajki']+1;
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }

            $query = "INSERT INTO reakcje(typ,liked_id,liker_id) VALUES('comment-like','$liked_id', '$liker_id')";

            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }

            $query = "SELECT parentid FROM komentarze WHERE komid='$liked_id'";
            if($result = $con->query($query)){
                $result = $result->fetch_assoc();
                $parentid = $result['parentid'];
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }

            $query = "SELECT users.userid FROM users,komentarze,posts WHERE komentarze.komid='$liked_id' AND posts.postid=komentarze.parentid AND users.userid=posts.idautora";
            if($result = $con->query($query)){
                $result = $result->fetch_assoc();
                $odbiorca = $result['userid'];
                $profilowe = $konto->profilowe;
                $full_name = $konto->full_name();
                if($odbiorca!==$konto->userid){
                    $query = "INSERT INTO powiadomienia(odbiorca,profilowe,full_name,tresc,pod_jakim_postem_polubiono_komentarz) VALUES('$odbiorca', '$profilowe', '$full_name', 'polubił/a Twój komentarz','$parentid')";
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
        }
        else{
            $query = "SELECT lajki FROM komentarze WHERE komid = '$liked_id'";

            if($result = $con->query($query)){
                $oldarray = $result->fetch_assoc();
                $newlikes = $oldarray['lajki']-1;
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }

            $query = "DELETE FROM reakcje WHERE typ='comment-like' AND liked_id='$liked_id' AND liker_id = '$liker_id'";

            if(!$con->query($query)){
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
        }

        $query = "UPDATE komentarze SET lajki = '$newlikes' WHERE komid='$liked_id'";

        if(!$con->query($query)){
            echo 'Błąd bazy danych nr '.$con->connect_errno;
            exit();
        }
        

        echo $newlikes;

    }
