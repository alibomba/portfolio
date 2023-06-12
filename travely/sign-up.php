<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['userid'])){
        if(authorize_user($_SESSION['userid'],$_SESSION['PHPSESSID'],$_SESSION['token'],$con)){
            header('Location: homepage');
            exit();
        }
    }

    if(isset($_POST['submit'])){
        $fine = true;
        if(strlen($_POST['imie'])<3 || strlen($_POST['imie'])>15){
            $e_imie = 'Imię musi posiadać od 3 do 15 znaków';
            $fine = false;
        }
        if(strlen($_POST['nazwisko'])<3 || strlen($_POST['nazwisko'])>15){
            $e_nazwisko = 'Nazwisko musi posiadać od 3 do 15 znaków';
            $fine = false;
        }
        if($_POST['email']===''){
            $e_email = 'Podaj adres e-mail';
            $fine = false;
        }
        if(filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)===false){
            $e_email = 'Podaj poprawny adres e-mail';
            $fine = false;
        }
        require_once 'inc/connection.php';
        $email = htmlentities($_POST['email'],ENT_QUOTES);
        $query = "SELECT id FROM users WHERE email='$email'";
        if($result = $con->query($query)){
            if($result->num_rows>0){
                $e_email = 'Adres e-mail jest już w użyciu';
                $fine = false;
            }
        }
        else{
            exit();
        }
        if(strlen($_POST['haslo'])<8 || strlen($_POST['haslo'])>20){
            $e_haslo = 'Hasło musi posiadać od 8 do 20 znaków';
            $fine = false;
        }
        if($_POST['haslo']!==$_POST['haslo_confirm']){
            $e_haslo = 'Hasła muszą być identyczne';
            $fine = false;
        }

        if($fine){
            $imie = htmlentities($_POST['imie'],ENT_QUOTES);
            $nazwisko = htmlentities($_POST['nazwisko'], ENT_QUOTES);
            $haslo = password_hash($_POST['haslo'],PASSWORD_DEFAULT);
            $query = "INSERT INTO users(imie,nazwisko,email,haslo) VALUES('$imie','$nazwisko','$email','$haslo')";
            if($con->query($query)){
                $good_alert = 'Zarejestrowano';
                unset($_POST);
            }
            else{
                exit();
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rejestracja - Travely</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="scripts/login.js" defer></script>
</head>
<body>
    <img src="img/sign-up-page.jpg" alt="2 people holding passwords" class="image">
    <form method="post" action="rejestracja" class="login">
        <h1 class="login__heading">Zarejestruj się</h1>
        <div class="login__inputs login__inputs--sign-up">
            <input type="text" class="login__inputs__input login__inputs__imie" value="<?php echo $_POST['imie'] ?? ''; ?>" name="imie" placeholder="Imię">
            <p class="login__inputs__error login__inputs__error--imie">
                <?php
                    if(isset($e_imie)){
                        echo $e_imie;
                        unset($e_imie);
                    }
                ?>
            </p>
            <input type="text" class="login__inputs__input login__inputs__nazwisko" value="<?php echo $_POST['nazwisko'] ?? ''; ?>" name="nazwisko" placeholder="Nazwisko">
            <p class="login__inputs__error login__inputs__error--nazwisko">
                <?php
                    if(isset($e_nazwisko)){
                        echo $e_nazwisko;
                        unset($e_nazwisko);
                    }
                ?>
            </p>
            <input type="text" class="login__inputs__input login__inputs__email" value="<?php echo $_POST['email'] ?? ''; ?>" name="email" placeholder="Adres e-mail">
            <p class="login__inputs__error login__inputs__error--email">
                <?php
                    if(isset($e_email)){
                        echo $e_email;
                        unset($e_email);
                    }
                ?>
            </p>
            <div class="haslo-input-container">
                <input type="password" class="login__inputs__input login__inputs__haslo" name="haslo" placeholder="Hasło">
                <img src="img/icons/pass-hidden-icon.png" alt="eye" class="haslo-toggle">
            </div>
            <p class="login__inputs__error login__inputs__error--haslo">
                <?php
                    if(isset($e_haslo)){
                        echo $e_haslo;
                        unset($e_haslo);
                    }
                ?>
            </p>
            <div class="haslo-input-container">
                <input type="password" class="login__inputs__input login__inputs__haslo-confirm" name="haslo_confirm" placeholder="Powtórz hasło">
                <img src="img/icons/pass-hidden-icon.png" alt="eye" class="haslo-toggle">              
            </div>
        </div>
        <div class="login__buttons">
            <input class="login__buttons__main" name="submit" type="submit" value="Zarejestruj się">
            <a href="logowanie" class="login__buttons__second">Logowanie</a>
        </div>
        <p class="good-alert">
            <?php
                if(isset($good_alert)){
                    echo $good_alert;
                    unset($good_alert);
                }
            ?>
        </p>
    </form>
</body>
</html>