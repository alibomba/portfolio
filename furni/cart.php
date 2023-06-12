<?php
    if(isset($_GET['tab'])){
        $tab = htmlentities($_GET['tab'], ENT_QUOTES);
    }
    else{
        $tab = 'koszyk';
    }
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['user_id'])&&isset($_COOKIE['token'])){
        if(authorize_user($_SESSION['user_id'],$_COOKIE['PHPSESSID'],$_COOKIE['token'],$con)){
            $zalogowano = true;
        }
        else{
            header('Location: logowanie');
            exit();
        }
    }
    else{
        header('Location: logowanie');
        exit();
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php if($tab==='koszyk'){echo 'Koszyk';}else if($tab==='historia'){echo 'Historia zamówień';} ?></title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/cart.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/cart.js" defer></script>
</head>
<body>
    <?php include 'inc/header_form.php'; ?>
    <div class="main">
        <aside class="aside">
            <a href="koszyk?tab=koszyk" class="aside-link <?php if($tab==='koszyk'){echo 'aside-link--active';} ?>">
                <svg class="aside-link__icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg>
                Koszyk
            </a>
            <a href="koszyk?tab=historia" class="aside-link <?php if($tab==='historia'){echo 'aside-link--active';} ?>">
                <svg class="aside-link__icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z"/></svg>
                Historia zamówień
            </a>
        </aside>
        <main class="koszyk <?php if($tab==='historia'){echo 'koszyk--historia';} ?>">
            <?php
                switch($tab){
                    case 'koszyk':
                        include 'inc/koszyk_koszyk.php';
                        break;
                    case 'historia':
                        include 'inc/koszyk_historia.php';
                        break;
                    default:
                        exit();
                        break;
                }
            ?>
        </main>
    </div>
    <footer class="footer">
        <div class="footer__top">
            <a href="homepage"><img src="img/logo.png" alt="logo furni" class="footer__logo"></a>
            <nav class="footer__nav">
                <a href="#" class="footer__nav-link">Polityka prywatności</a>
                <a href="#" class="footer__nav-link">Kontakt</a>
                <a href="#" class="footer__nav-link">Regulamin strony</a>
                <a href="o-nas" class="footer__nav-link">O nas</a>
            </nav>
        </div>
        <p class="footer__bottom">Furni &copy; 2022 Wszelkie prawa zastrzeżone</p>
    </footer>
</body>
</html>