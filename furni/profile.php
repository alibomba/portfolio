<?php
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
    $user_id = $_SESSION['user_id'];
    $query = "SELECT * FROM users WHERE id='$user_id'";
    if($result = $con->query($query)){
        $user = $result->fetch_assoc();
    }
    else{
        exit();
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ustawienia konta</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/profile.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/haslo.js" defer></script>
    <script src="scripts/profile.js" defer></script>
</head>
<body>
<?php include 'inc/header_form.php'; ?>
    <main>
        <h1>Ustawienia konta</h1>
        <form class="informacje">
            <div class="section__grid">
                <div class="setting">
                    <label for="imie" class="setting__label">Imię</label>
                    <input value="<?php echo $user['imie'] ?>" id="imie" type="text" class="setting__input" placeholder="Adam">
                </div>
                <div class="setting">
                    <label for="nazwisko" class="setting__label">Nazwisko</label>
                    <input value="<?php echo $user['nazwisko'] ?>" placeholder="Nowak" id="nazwisko" type="text" class="setting__input">
                </div>
                <div class="setting">
                    <label for="nr_tel" class="setting__label">Nr telefonu</label>
                    <input value="<?php echo $user['nr_telefonu'] ?>" id="nr_tel" placeholder="123123123" type="text" class="setting__input">
                </div>
                <div class="setting">
                    <label for="email" class="setting__label">Adres e-mail</label>
                    <input value="<?php echo $user['email'] ?>" id="email" placeholder="example@gmail.com" type="text" class="setting__input">
                </div>
            </div>
            <input type="submit" value="Zapisz" class="section__button">
            <p class="section__error"></p>
        </form>
        <form class="adres">
            <div class="section__grid">
                <div class="setting">
                    <label for="kraj" class="setting__label">Kraj</label>
                    <input <?php if(!is_null($user['kraj'])){echo 'value="'.$user['kraj'].'"';} ?> id="kraj" placeholder="Polska" type="text" class="setting__input">
                </div>
                <div class="setting">
                    <label for="miasto" class="setting__label">Miasto</label>
                    <input <?php if(!is_null($user['miasto'])){echo 'value="'.$user['miasto'].'"';} ?> id="miasto" placeholder="Kraków" type="text" class="setting__input">
                </div>
                <div class="setting">
                    <label for="kod" class="setting__label">Kod pocztowy</label>
                    <input <?php if(!is_null($user['kod_pocztowy'])){echo 'value="'.$user['kod_pocztowy'].'"';} ?> id="kod" placeholder="00-001" type="text" class="setting__input">
                </div>
                <div class="setting">
                    <label for="adres" class="setting__label">Adres</label>
                    <input <?php if(!is_null($user['adres'])){echo 'value="'.$user['adres'].'"';} ?> id="adres" placeholder="ul.Długa, 73A" type="text" class="setting__input">
                </div>
            </div>
            <input type="submit" value="Zapisz" class="section__button">
            <p class="section__error"></p>
        </form>
        <form class="haslo">
            <div class="haslo__row">
                <div class="setting haslo-container">
                    <label for="new" class="setting__label">Nowe hasło</label>
                    <input id="new" type="password" class="setting__input haslo-input">
                    <img src="img/icons/hidden-password-icon.svg" alt="oko" class="setting__eye haslo-eye">
                </div>
                <div class="setting haslo-container">
                    <label for="confirm" class="setting__label">Powtórz nowe hasło</label>
                    <input id="confirm" type="password" class="setting__input haslo-input">
                    <img src="img/icons/hidden-password-icon.svg" alt="oko" class="setting__eye haslo-eye">
                </div>
                <div class="setting haslo-container">
                    <label for="current" class="setting__label">Aktualne hasło</label>
                    <input id="current" type="password" class="setting__input haslo-input">
                    <img src="img/icons/hidden-password-icon.svg" alt="oko" class="setting__eye haslo-eye">
                </div>
            </div>
            <input type="submit" value="Zapisz" class="section__button">
            <p class="section__error"></p>
        </form>
    </main>
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