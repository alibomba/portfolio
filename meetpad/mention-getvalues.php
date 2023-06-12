<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    session_start();
    if(!isset($_POST['mention'])){
        header('Location: homepage');
        exit();
    }
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


    switch($_POST['mention']){
        case 'start':
            $znajomi = $konto->znajomi($con);
            $ile_znajomych = count($znajomi);
            if($ile_znajomych>=5){
                $ile = 5;
            }
            else{
                $ile = $ile_znajomych;
            }
            shuffle($znajomi);
            $znajomidetails = [];
            for($i=0;$i<$ile;$i++){
                $znajomy = $znajomi[$i];
                $query = "SELECT * FROM users WHERE userid='$znajomy'";
                if($result = $con->query($query)){
                    $row = $result->fetch_assoc();
                    $user = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila']);
                    $forarray = [
                        'profilowe' => $user->profilowe,
                        'full_name' => $user->full_name(),
                        'wspolni_znajomi' => count($user->wspolni_znajomi($konto,$con))===0 ? 'Brak' : count($user->wspolni_znajomi($konto,$con))
                    ];
                    $znajomidetails[] = $forarray;
                }
            }
            $ile = count($znajomidetails);
            $string = '';
            for($i=0;$i<$ile;$i++){
               $string .= '{
                "profilowe":"'.$znajomidetails[$i]['profilowe'].'",
                "full_name":"'.$znajomidetails[$i]['full_name'].'",
                "wspolni_znajomi":"'.$znajomidetails[$i]['wspolni_znajomi'].'"
               },';
            }
            $string = substr($string,0,-1);
            $response = '
            {
                "znajomi":[
                    '.$string.'
                ]
            }
            ';
            break;
        case 'change':
            $znajomi = $konto->znajomi($con);
            $mention_string = $_POST['mention_string'];
            $znajomidetails = [];
            foreach($znajomi as $znajomy){
                $query = "SELECT imie,nazwisko FROM users WHERE userid='$znajomy'";
                if($result = $con->query($query)){
                    $row = $result->fetch_assoc();
                    $full_name = $row['imie'].' '.$row['nazwisko'];
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }

                $query = "SELECT * FROM users WHERE userid='$znajomy' AND (imie LIKE '$mention_string%' OR nazwisko LIKE '$mention_string%' OR '$full_name' LIKE '$mention_string%')";
                if($result = $con->query($query)){
                    if($result->num_rows>0){
                        $row = $result->fetch_assoc();
                        $user = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila']);
                        $forarray = [
                        'profilowe' => $user->profilowe,
                        'full_name' => $user->full_name(),
                        'wspolni_znajomi' => count($user->wspolni_znajomi($konto,$con))===0 ? 'Brak' : count($user->wspolni_znajomi($konto,$con))
                        ];
                        $znajomidetails[] = $forarray;
                    }
                    else{
                        $znajomidetails = $znajomidetails;
                    }
                }
                else{
                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                    exit();
                }
            }
            $ile = count($znajomidetails);
            $string = '';
            for($i=0;$i<$ile;$i++){
               $string .= '{
                "profilowe":"'.$znajomidetails[$i]['profilowe'].'",
                "full_name":"'.$znajomidetails[$i]['full_name'].'",
                "wspolni_znajomi":"'.$znajomidetails[$i]['wspolni_znajomi'].'"
               },';
            }
            $string = substr($string,0,-1);
            $response = '
            {
                "znajomi":[
                    '.$string.'
                ]
            }
            ';
            break;
    }

    echo $response;