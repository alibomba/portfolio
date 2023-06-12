<?php
    include 'inc/account-class.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
    session_start();
    if(isset($_SESSION['zalogowano']) && $_SESSION['zalogowano'] === true){
        header('Location: homepage');
    }

    if(isset($_POST['submit'])){
        $login = htmlentities($_POST['login'], ENT_QUOTES, 'UTF-8');
        $haslo = htmlentities($_POST['haslo'], ENT_QUOTES, 'UTF-8');
        require_once 'inc/connection.php';
        
        $query = "SELECT * FROM users WHERE email='$login'";
        if($result = $con->query($query)){
            if($result->num_rows > 0){
                $row = $result->fetch_assoc();
                if(password_verify($haslo, $row['haslo'])){
                    if($row['dwuetapowa'] == false){
                        $_SESSION['zalogowano'] = true;
                        $_SESSION['idkonta'] = $row['userid'];
                        header('Location: homepage');
                    }
                    else if($row['dwuetapowa'] == true){
                        $_SESSION['row'] = $row;
                        $userid = $row['userid'];




                        $kod = rand(111111,999999);
                        $query = "UPDATE users SET kod_z_maila='$kod' WHERE userid='$userid'";
                        if(!$con->query($query)){
                            echo 'Błąd bazy danych nr '.$con->connect_errno;
                            exit();
                        }
                        try{
                            $mail = new PHPMailer();
                    
                            $mail->isSMTP();
                            $mail->Host = 'smtp.gmail.com';
                            $mail->Port = 465;
                            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                            $mail->SMTPAuth = true;
                            $mail->Username = 'wojci.bro@gmail.com';
                            $mail->Password = 'byxbyrlzuvzvwszd';
                            $mail->CharSet = 'UTF-8';
                            $mail->setFrom('no-reply@meetpad.com', 'Meetpad');
                            $mail->addAddress($row['email']);
                            $mail->addReplyTo('biuro@meetpad.com', 'Biuro');
                    
                            $mail->isHTML(false);
                            $mail->Subject = 'Twój kod weryfikacyjny Meetpad.';
                    
                            $message = 'Twój kod weryfikacyjny do włączenia lub wyłączenia wieloskładnikowego uwierzytelniania na Twoim koncie w serwisie Meetpad jest następujący: '.$kod.'';
                    
                            $mail->Body = $message;
                    
                            $mail->send();
                            $message = 'Mail został wysłany.';
                        }catch(Exception $e){
                            echo "Błąd wysyłania maila: {$mail->ErrorInfo}";
                            $message = 'Błąd wysyłania maila!';
                        }
                        header('Location: dwuetapowe');
                    }
                }
                else{
                    $login_error = 'Nieprawidłowy login lub hasło!';
                }
            }
            else{
                $login_error = 'Nieprawidłowy login lub hasło!';
            }
        }
        else{
            echo 'Błąd bazy danych nr'.$con->connect_errno;
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
    <title>Meetpad - Logowanie</title>
    <link rel="icon" href="img/logo.svg">
    <meta name="description" content="Zaloguj się w serwisie Meetpad i pozostawaj w kontakcie ze znajomymi, rodziną i innymi osobami, które znasz! Udostępniaj zdjęcia i filmy lub przeglądaj posty innych!">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/ekran-logowania.css">
    <script src="scripts/switch_password_visibility.js" defer></script>
</head>
<body>
    <!-- bg image -->
    <img class="background-image" src="img/login_bg.jpg" alt="background image">
    <!-- bg image -->

    <img class="logo" src="img/text_logo.svg" alt="meetpad logo">
    <form action="<?php $_SERVER['PHP_SELF'] ?>" method="post">
    <div class="container">
        <div class="container__top">
            <div class="input-container">
                <label for="login">Login:</label>
                <input class="field" type="text" id="login" name="login" placeholder="Wpisz adres e-mail">
            </div>
            <div class="input-container">
                <label for="haslo">Hasło:</label>
                <input class="field haslo-input" type="password" id="haslo" name="haslo" placeholder="Wpisz hasło">
                <svg class="eye-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z" fill-rule="nonzero"/></svg>
            </div>
            <?php
                if(isset($login_error)){
                    echo '<span class="error">'.$login_error.'</span>';
                    unset($login_error);
                }
            ?>
        </div>
        <div class="container__bottom">
            <input class="log-in" type="submit" name="submit" value="Zaloguj się">
            <a class="reg-link" href="rejestracja">Rejestracja</a>
        </div>
    </div>
    </form>
</body>
</html>