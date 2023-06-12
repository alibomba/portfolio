<div class="profile__zdjecia">
            <?php
                $profileid = $profile->userid;
                $query="SELECT obrazek FROM posts WHERE idautora='$profileid'";
                if($result = $con->query($query)){
                    $obrazki = $result->fetch_all(MYSQLI_ASSOC);
                    foreach($obrazki as $obrazek){
                        if($obrazek['obrazek']!==''){
                            echo '<img class="profile__zdjecie" src="'.$obrazek['obrazek'].'" alt="post image">';
                        }
                    }
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
            ?>
</div>