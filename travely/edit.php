<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['userid'])){
        if(authorize_user($_SESSION['userid'],$_SESSION['PHPSESSID'],$_SESSION['token'],$con)){
            $zalogowano = true;
        }
        else{
            header('Location: homepage');
            exit();
        }
    }
    else{
        header('Location: homepage');
        exit();
    }

    if(!isset($_GET['tab'])){
        header('Location: homepage');
        exit();
    }
    $tab = htmlentities($_GET['tab'], ENT_QUOTES);
    $userid = $_SESSION['userid'];
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edytuj profil</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/edit.css">
    <script src="scripts/generic.js"></script>
    <script src="scripts/edit.js" defer></script>
</head>
<body>
    <?php include 'inc/header.php'; ?>
    <main class="root">
        <aside class="sidebar">
            <h1>Edytuj profil</h1>
            <div class="sidebar__element">
                <img src="img/icons/profile-icon.svg" alt="profile" class="sidebar__element__icon">
                <a href="konto?tab=informacje" class="sidebar-link">Informacje</a>
                <?php if($tab==='informacje'){echo '<div class="active-circle"></div>';} ?>
            </div>
            <div class="sidebar__element">
                <img src="img/icons/payments-icon.png" alt="payments" class="sidebar__element__icon">
                <a href="konto?tab=platnosci" class="sidebar-link">Płatności</a>
                <?php if($tab==='platnosci'){echo '<div class="active-circle"></div>';} ?>
            </div>
            <div class="sidebar__element">
                <img src="img/icons/security-icon.png" alt="security" class="sidebar__element__icon">
                <a href="konto?tab=bezpieczenstwo" class="sidebar-link">Bezpieczeństwo</a>
                <?php if($tab==='bezpieczenstwo'){echo '<div class="active-circle"></div>';} ?>
            </div>
            <div class="sidebar__element">
                <img src="img/icons/zamowienia-icon.png" alt="zamówienia" class="sidebar__element__icon">
                <a href="konto?tab=zamowienia" class="sidebar-link">Zamówienia</a>
                <?php if($tab==='zamowienia'){echo '<div class="active-circle"></div>';} ?>
            </div>
        </aside>
        <?php
            switch($tab){
                case 'informacje':
                    include 'inc/profile_informacje.php';
                    break;
                case 'zamowienia':
                    include 'inc/profile_zamowienia.php';
                    break;
            }
        ?>
    </main>
    <?php include 'inc/footer.php'; ?>
</body>
</html>