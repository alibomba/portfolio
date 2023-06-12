<?php
    session_start();
    if(!isset($_SESSION['row'])){
        header('Location: logowanie');
        exit();
    }
    $row = $_SESSION['row'];
    require_once 'inc/connection.php';
    $userid = $row['userid'];
    $query = "SELECT kod_z_maila FROM users WHERE userid='$userid'";
    if($result = $con->query($query)){
        $localrow = $result->fetch_assoc();
        $kod_z_maila = $localrow['kod_z_maila'];
    }
    else{

    }
    if(isset($_POST['submit'])){
        $kod = $_POST['kod'];
        $ok = true;

        if($kod === ''){
            $ok = false;
            $e_kod = 'Wprowadź kod!';
        }
        if($ok===true){
            if($kod_z_maila == $kod){
                $_SESSION['zalogowano'] = true;
                $_SESSION['idkonta'] = $row['userid'];
                header('Location: homepage');
                unset($_SESSION['row']);
            }
            else{
                $e_kod = 'Nieprawidłowy kod!';
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
    <title>Dwuetapowa weryfikacja logowania</title>
    <link rel="icon" href="img/logo.svg">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/ekran-logowania.css">
</head>
<body>
    <!-- bg image -->
    <img class="background-image" src="img/login_bg.jpg" alt="background image">
    <!-- bg image -->
    <form action="<?php $_SERVER['PHP_SELF'] ?>" method="post">
        <div class="container--2el">
            <input class="field" type="text" name="kod" placeholder="Wprowadz kod">
            <?php
                if(isset($e_kod)){
                    echo '<span class="error">'.$e_kod.'</span>';
                    unset($e_kod);
                }
            ?>
            <input class="reg-link" type="submit" name="submit" value="Zaloguj się">
        </div>
    </form>
</body>
</html>