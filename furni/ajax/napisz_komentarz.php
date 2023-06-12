<?php
    if(!isset($_POST['tresc'])||!isset($_POST['ile_gwiazdek'])||!isset($_POST['id_produktu'])){
        header('Location: homepage');
        exit();
    }
    $tresc = $_POST['tresc'];
    $ile_gwiazdek = $_POST['ile_gwiazdek'];
    $id_produktu = $_POST['id_produktu'];

    session_start();
    require_once '../inc/connection.php';
    include '../inc/auth.php';

    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $ok = true;
            if($tresc===''||strlen($tresc)<0||strlen($tresc)>200){
                $ok = false;
                echo '{
                    "error":"Błąd w treści komentarza"
                }';
                exit();
            }
            if(!is_numeric($ile_gwiazdek)){
                $ok = false;
                echo '{
                    "error":"Błąd oceny produktu"
                }';
                exit();
            }
            if(!is_numeric($id_produktu)){
                $ok = false;
                echo '{
                    "error":"Błąd z identyfikacją produktu"
                }';
            }
            if($ok){
                $tresc = htmlentities($tresc,ENT_QUOTES);
                $ile_gwiazdek = htmlentities($ile_gwiazdek,ENT_QUOTES);
                $id_produktu = htmlentities($id_produktu,ENT_QUOTES);
                $user_id = $_SESSION['user_id'];
                $query = "INSERT INTO komentarze(id_produktu,id_autora,liczba_gwiazdek,tresc) VALUES('$id_produktu','$user_id','$ile_gwiazdek','$tresc')";
                if($con->query($query)){
                    $id_komentarza = $con->insert_id;
                    $query = "SELECT imie,nazwisko FROM users WHERE id='$user_id'";
                    if($result = $con->query($query)){
                        $result = $result->fetch_assoc();
                        $autor = $result['imie'].' '.$result['nazwisko'];
                    }
                    else{
                        exit();
                    }
                    $now = new DateTime('now');
                    $now = $now->format('d.m.Y');
                    echo '{
                        "error":"",
                        "data_dodania":"'.$now.'",
                        "autor":"'.$autor.'",
                        "ile_gwiazdek":"'.$ile_gwiazdek.'",
                        "tresc":"'.$tresc.'",
                        "id_komentarza":"'.$id_komentarza.'"
                    }';
                }
                else{
                    exit();
                }
            }
        }
        else{
            echo '{
                "error":"Musisz być zalogowany"
            }';
        }
    }
    else{
        echo '{
            "error":"Musisz być zalogowany"
        }';
    }