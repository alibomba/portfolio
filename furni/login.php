<?php
    if(isset($_GET['tab'])){
        $tab = htmlentities($_GET['tab'],ENT_QUOTES);
    }
    else{
        $tab = 'logowanie';
    }
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            header('Location: homepage');
            exit();
        }
    }

    if(isset($_POST)&&isset($_POST['submit'])){
        switch($tab){
            case 'logowanie':
                    $email = htmlentities($_POST['email'],ENT_QUOTES);
                    $haslo = htmlentities($_POST['haslo'],ENT_QUOTES);
                    $query = "SELECT id FROM users WHERE email='$email'";
                    if($result = $con->query($query)){
                        if($result->num_rows>0){
                            $query = "SELECT * FROM users WHERE email='$email'";
                            if($result = $con->query($query)){
                                $row = $result->fetch_assoc();
                                $hash = $row['haslo'];
                                if(password_verify($haslo,$hash)){
                                    session_regenerate_id();
                                    $userid = $row['id'];
                                    $session_id_hash = password_hash(session_id(),PASSWORD_DEFAULT);
                                    $token = bin2hex(openssl_random_pseudo_bytes(16));
                                    $data_wygasniecia = date('Y-m-d H:i:s',time() + 86400*30);
                                    $query = "INSERT INTO sessions(user_id,phpsessid,token,data_wygasniecia) VALUES('$userid','$session_id_hash','$token','$data_wygasniecia')";
                                    if($con->query($query)){
                                        $_SESSION['user_id'] = $userid;
                                        setcookie('PHPSESSID', session_id(), time()+86400*30);
                                        setcookie('token', $token, time()+86400*30);
                                        header('Location: homepage');
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
                                exit();
                            }
                        }
                        else{
                            $error = 'Nieprawidłowy login lub hasło';
                        }
                    }
                    else{
                        exit();
                    }
                break;
            case 'rejestracja':
                $imie = $_POST['imie'];
                $nazwisko = $_POST['nazwisko'];
                $email = $_POST['email'];
                $nr_tel = $_POST['nr_tel'];
                $haslo = $_POST['imie'];
                $haslo_confirm = $_POST['imie'];

                $ok = true;

                if(strlen($imie)<3 || strlen($imie)>15){
                    $e_imie = 'Imię musi posiadać od 3 do 15 znaków';
                    $ok = false;
                }
                if(strlen($nazwisko)<3 || strlen($nazwisko)>15){
                    $e_nazwisko = 'Nazwisko musi posiadać od 3 do 15 znaków';
                    $ok = false;
                }
                if(filter_var($email, FILTER_VALIDATE_EMAIL)===false){
                    $e_email = 'Podaj poprawny adres e-mail';
                    $ok = false;
                }
                require_once 'inc/connection.php';
                $query = "SELECT id FROM users WHERE email='$email'";
                if($result = $con->query($query)){
                    if($result->num_rows>0){
                        $e_email = 'Istnieje już konto o tym adresie e-mail';
                        $ok = false;
                    }
                }
                else{
                    exit();
                }
                if(preg_match('(\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*)',$nr_tel)==0){
                    $e_nr_tel = 'Podaj poprawny numer telefonu';
                    $ok = false;
                }
                if(strlen($haslo)<8||strlen($haslo)>20){
                    $e_haslo = 'Hasło musi posiadać od 8 do 20 znaków';
                    $ok = false;
                }
                if($haslo!==$haslo_confirm){
                    $e_haslo = 'Hasła muszą być identyczne';
                    $ok = false;
                }

                if($ok===true){
                    $imie = htmlentities($_POST['imie'], ENT_QUOTES);
                    $nazwisko = htmlentities($_POST['nazwisko'], ENT_QUOTES);
                    $email = htmlentities($_POST['email'], ENT_QUOTES);
                    $nr_tel = htmlentities($_POST['nr_tel'], ENT_QUOTES);
                    $haslo = password_hash(htmlentities($_POST['haslo'],ENT_QUOTES),PASSWORD_DEFAULT);

                    $query = "INSERT INTO users(imie,nazwisko,nr_telefonu,email,haslo) VALUES('$imie','$nazwisko','$nr_tel','$email','$haslo')";
                    if($con->query($query)){
                        header('Location: logowanie?tab=logowanie');
                    }
                    else{
                        exit();
                    }
                }
                

                break;
            default:
                exit();
            break;
        }
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Furni - <?php if($tab==='logowanie'){ echo 'Zaloguj się';}else if($tab==='rejestracja'){ echo 'Zarejestruj się';} ?></title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="scripts/haslo.js" defer></script>
</head>
<body>
    <div class="img <?php if($tab==='logowanie'){ echo 'img--logowanie';}else if($tab==='rejestracja'){ echo 'img--rejestracja';} ?>"></div>
    <main class="main">
        <div class="pasek">
            <a href="logowanie?tab=logowanie" class="link <?php if($tab==='logowanie'){ echo 'link--active';} ?>">Logowanie</a>
            <a href="logowanie?tab=rejestracja" class="link <?php if($tab==='rejestracja'){ echo 'link--active';} ?>">Rejestracja</a>
        </div>
        <form method="post" action="logowanie?tab=<?php echo $tab; ?>" class="column <?php if($tab==='logowanie'){ echo 'column--logowanie';}else if($tab==='rejestracja'){ echo 'column--rejestracja';} ?>">
            <?php
                switch($tab){
                    case 'logowanie':
                        include 'inc/logowanie_logowanie.php';
                        break;
                    case 'rejestracja':
                        include 'inc/logowanie_rejestracja.php';
                        break;
                    default:
                        exit();
                        break;
                }
            ?>
        </form>
    </main>
</body>
</html>