<?php
    if(!isset($_GET['znajomi'])){
        $wyborznajomi = 'wszyscy';
    }
    else{
        $wyborznajomi = $_GET['znajomi'];
    }
?>
<div class="pasek-wyboru pasek-wyboru--znajomi">
    <a <?php if($wyborznajomi=='wszyscy'){ echo 'class="wybrana-opcja"'; } ?> href="profile?user=<?php echo $profile->userid; ?>&wybor=znajomi&znajomi=wszyscy">Wszyscy znajomi</a>
    <a <?php if($wyborznajomi=='wspolni'){ echo 'class="wybrana-opcja"'; } ?> href="profile?user=<?php echo $profile->userid; ?>&wybor=znajomi&znajomi=wspolni">Wspólni znajomi</a>
    <a <?php if($wyborznajomi=='latest'){ echo 'class="wybrana-opcja"'; } ?> href="profile?user=<?php echo $profile->userid; ?>&wybor=znajomi&znajomi=latest">Ostatni dodani</a>
</div>
<div class="profile__znajomi">
            <?php
                $userid = $profile->userid;

                switch($wyborznajomi){
                    case 'wszyscy':
                        $query = "SELECT zapraszajacy FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zaproszony='$userid'";
                        if($result = $con->query($query)){
                            $array = $result->fetch_all(MYSQLI_ASSOC);
                            $zapraszajacy = [];
                            foreach($array as $element){
                                $zapraszajacy[] = $element['zapraszajacy'];
                            }
                        }
                        else{
                            echo 'Błąd bazy danych nr '.$con->connect_errno;
                            exit();
                        }
    
                        $query = "SELECT zaproszony FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zapraszajacy='$userid'";
                        if($result = $con->query($query)){
                            $array = $result->fetch_all(MYSQLI_ASSOC);
                            $zaproszeni = [];
                            foreach($array as $element){
                                $zaproszeni[] = $element['zaproszony'];
                            }
                        }
                        $znajomi = array_merge($zapraszajacy,$zaproszeni);
    
                        $rows = [];
                        foreach($znajomi as $idznajomego){
                            $query = "SELECT * FROM users WHERE userid='$idznajomego'";
                            if($result = $con->query($query)){
                                $rows[] = $result->fetch_assoc();
                            }
                            else{
                                echo 'Błąd bazy danych nr '.$con->connect_errno;
                                exit();
                            }
                        }
                        break;
                    case 'wspolni':
                        $rows = [];
                        $wspolni = $profile->wspolni_znajomi($konto,$con);
                        if(count($wspolni)>0){
                            foreach($wspolni as $value){
                                $query = "SELECT * FROM users WHERE userid='$value'";
                                if($result = $con->query($query)){
                                    $rows[] = $result->fetch_assoc();
                                }
                                else{
                                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                                    exit();
                                }
    
                            }
                        }
                        else{
                            echo 'Brak wspólnych znajomych';
                        }
                        break;
                    case 'latest':
                        $query = "SELECT zapraszajacy FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zaproszony='$userid' ORDER BY data_zaproszenia DESC LIMIT 5";
                        if($result = $con->query($query)){
                            $array = $result->fetch_all(MYSQLI_ASSOC);
                            $zapraszajacy = [];
                            foreach($array as $element){
                                $zapraszajacy[] = $element['zapraszajacy'];
                            }
                        }
                        else{
                            echo 'Błąd bazy danych nr '.$con->connect_errno;
                            exit();
                        }
    
                        $query = "SELECT zaproszony FROM zaproszenia_do_znaj WHERE stan='zaakceptowane' AND zapraszajacy='$userid' ORDER BY data_zaproszenia DESC LIMIT 5";
                        if($result = $con->query($query)){
                            $array = $result->fetch_all(MYSQLI_ASSOC);
                            $zaproszeni = [];
                            foreach($array as $element){
                                $zaproszeni[] = $element['zaproszony'];
                            }
                        }
                        $znajomi = array_merge($zapraszajacy,$zaproszeni);
    
                        $rows = [];
                        foreach($znajomi as $idznajomego){
                            $query = "SELECT * FROM users WHERE userid='$idznajomego'";
                            if($result = $con->query($query)){
                                $rows[] = $result->fetch_assoc();
                            }
                            else{
                                echo 'Błąd bazy danych nr '.$con->connect_errno;
                                exit();
                            }
                        }
                        break;
                }
                
                if(count($rows)>0){
                    $any = true;
                    foreach($rows as $index=>$row){
                        $znajobjs[$index] = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'], $row['profilowe'], $row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'], $row['kod_z_maila'],$row['unread_notis']);
                    }
                }
                else{
                    $any = false;
                }
                
                if($any===true){
                    foreach($znajobjs as $znajobj){
                        include 'inc/friend-component.php';
                    }
                } 
            ?>
</div>