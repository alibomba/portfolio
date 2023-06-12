<?php
    if(!isset($_POST['imie'])&&!isset($_POST['kraj'])&&!isset($_POST['nowe_haslo'])){
        header('Location: homepage');
        exit();
    }
    session_start();
    require_once '../inc/connection.php';
    $user_id = $_SESSION['user_id'];

    if(isset($_POST['imie'])){
        $imie = htmlentities($_POST['imie'],ENT_QUOTES);
        $nazwisko = htmlentities($_POST['nazwisko'],ENT_QUOTES);
        $nr_tel = htmlentities($_POST['nr_tel'],ENT_QUOTES);
        $email = htmlentities($_POST['email'],ENT_QUOTES);
        if($imie!==''&&$nazwisko!==''&&$nr_tel!==''&&$email!==''){
            $ok = true;
            if(strlen($_POST['imie'])<3||strlen($_POST['imie'])>15){
                $ok = false;
                $message = 'Imię musi posiadać od 3 do 15 znaków';
                $typ = 'bad';
            }
            if(strlen($_POST['nazwisko'])<3||strlen($_POST['nazwisko'])>15){
                $ok = false;
                $message = 'Nazwisko musi posiadać od 3 do 15 znaków';
                $typ = 'bad';
            }
            if(preg_match('(\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*)',$_POST['nr_tel'])==0){
                $ok = false;
                $message = 'Podaj poprawny numer telefonu';
                $typ = 'bad';
            }
            if(filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)===false){
                $ok = false;
                $message = 'Podaj poprawny adres e-mail';
                $typ = 'bad';
            }
            $query = "SELECT id FROM users WHERE email='$email'";
            if($result = $con->query($query)){
                if($result->num_rows>0){
                    $result = $result->fetch_assoc();
                    $id = $result['id'];
                    if($id!=$user_id){
                        $ok = false;
                        $message = 'Podany adres jest już w użyciu';
                        $typ = 'bad';
                    }
                }
            }
            else{
                exit();
            }
            if($ok){
                $query = "UPDATE users SET imie='$imie',nazwisko='$nazwisko',nr_telefonu='$nr_tel',email='$email' WHERE id='$user_id'";
                if($con->query($query)){
                    $message = 'Pomyślnie zmieniono ustawienia';
                    $typ = 'good';
                }
                else{
                    exit();
                }
            }
            echo '{
                "message":"'.$message.'",
                "typ":"'.$typ.'"
            }';
        }
        else{
            echo '{
                "typ":"bad",
                "message":"Wszystkie pola są wymagane"
            }';
        }
    }
    else if(isset($_POST['kraj'])){
        $kraj = htmlentities($_POST['kraj'],ENT_QUOTES);
        $miasto = htmlentities($_POST['miasto'],ENT_QUOTES);
        $kod_pocztowy = htmlentities($_POST['kod_pocztowy'],ENT_QUOTES);
        $adres = htmlentities($_POST['adres'],ENT_QUOTES);

        if($kraj!==''||$miasto!==''||$kod_pocztowy!==''||$adres!==''){
            if($kraj!==''&&$miasto!==''&&$kod_pocztowy!==''&&$adres!==''){
                $query = "UPDATE users SET kraj='$kraj', miasto='$miasto',kod_pocztowy='$kod_pocztowy',adres='$adres' WHERE id='$user_id'";
                if($con->query($query)){
                    $message = 'Pomyślnie zmieniono ustawienia';
                    $typ = 'good';
                }
                else{
                    exit();
                }
            }
            else{
                $message = "Wszystkie pola są wymagane";
                $typ = 'bad';
            }
        }
        else{
            exit();
        }
        echo '{
            "message":"'.$message.'",
            "typ":"'.$typ.'"
        }';
    }
    else if(isset($_POST['nowe_haslo'])){
        $nowe = htmlentities($_POST['nowe_haslo'],ENT_QUOTES);
        $confirm = htmlentities($_POST['nowe_haslo_confirm'],ENT_QUOTES);
        $current = htmlentities($_POST['current_haslo'],ENT_QUOTES);

        if($nowe!==''||$confirm!==''||$current!==''){
            if($nowe!==''&&$confirm!==''&&$current!==''){
                $ok = true;
                if(strlen($nowe)<8||strlen($nowe)>20){
                    $ok = false;
                    $message = "Hasło musi posiadać od 8 do 20 znaków";
                    $typ = 'bad';
                }
                if($nowe!==$confirm){
                    $ok = false;
                    $message = "Hasła muszą być identyczne";
                    $typ = 'bad';
                }
                $query = "SELECT haslo FROM users WHERE id='$user_id'";
                if($result = $con->query($query)){
                    $result = $result->fetch_assoc();
                    $old_hash = $result['haslo'];
                    if(!password_verify($current,$old_hash)){
                        $ok = false;
                        $message = "Niepoprawne hasło";
                        $typ = 'bad';
                    }
                }
                else{
                    exit();
                }
                if($ok){
                    $new_hash = password_hash($nowe,PASSWORD_DEFAULT);
                    $query = "UPDATE users SET haslo='$new_hash' WHERE id='$user_id'";
                    if($con->query($query)){
                        $message = "Pomyślnie zmieniono hasło";
                        $typ = 'good';
                    }
                    else{
                        exit();
                    }
                }
            }
            else{
                $message = "Wszystkie pola są wymagane";
                $typ = 'bad';
            }
            echo '{
                "message":"'.$message.'",
                "typ":"'.$typ.'"
            }';
        }
        else{
            exit();
        }
    }