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
        $email = htmlentities($_POST['email'],ENT_QUOTES);
        $haslo = htmlentities($_POST['haslo'], ENT_QUOTES);
        $query = "SELECT * FROM users WHERE email='$email'";
        require_once 'inc/connection.php';
        if($result = $con->query($query)){
            if($result->num_rows>0){
                $row = $result->fetch_assoc();
                if(password_verify($haslo, $row['haslo'])){
                    session_regenerate_id();
                    $userid = $row['id'];
                    $sessionid_hashed = password_hash(session_id(),PASSWORD_DEFAULT);
                    $token = bin2hex(openssl_random_pseudo_bytes(16));
                    $date = date('Y-m-d H:i:s',time() + 86400*30);
                    $query = "INSERT INTO sessions(user_id,phpsessid,token,data_wygasniecia) VALUES('$userid','$sessionid_hashed','$token','$date')";
                    if($con->query($query)){
                        $_SESSION['userid'] = $userid;
                        $_SESSION['token'] = $token;
                        $_SESSION['PHPSESSID'] = session_id();
                        header('Location:homepage');
                        exit();
                    }
                    else{
                        exit();
                    }
                }
                else{
                    $error = 'Nieprawidłowy login lub hasło';
                }
            }
            else{
                $error = 'Nieprawidłowy login lub hasło';
            }
        }
        else{
            exit();
        }
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travely - Logowanie</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="scripts/login.js" defer></script>
</head>
<body>
    <img src="img/login-page.jpg" alt="macchu picchu" class="image">
    <form method="post" action="logowanie" class="login">
        <h1 class="login__heading">Zaloguj się</h1>
        <div class="login__inputs">
            <input type="text" class="login__inputs__input login__inputs__email" value="<?php echo $_POST['email'] ?? ''; ?>" name="email" placeholder="E-mail">
            <div class="haslo-input-container">
                <input type="password" class="login__inputs__input login__inputs__password" name="haslo" placeholder="Hasło">
                <img src="img/icons/pass-hidden-icon.png" alt="eye icon" class="haslo-toggle">
                <p class="login__inputs__error">
                    <?php
                        if(isset($error)){
                            echo $error;
                            unset($error);
                        }
                    ?>
                </p>
            </div>
        </div>
        <div class="login__buttons">
            <input class="login__buttons__main" name="submit" type="submit" value="Zaloguj się">
            <a href="rejestracja" class="login__buttons__second">Rejestracja</a>
        </div>
        <div class="login__links">
            <a href="#" class="login__links__link">Zapomniałeś hasła?</a>
            <a href="homepage" class="login__links__link">Kontynuuj bez logowania</a>
        </div>
    </form>
</body>
</html>