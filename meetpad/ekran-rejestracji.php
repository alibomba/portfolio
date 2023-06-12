<?php
        if(isset($_POST['submit'])){
            $name = $_POST['name'];
            $surname = $_POST['surname'];
            $email = $_POST['email'];
            $haslo1 = $_POST['haslo1'];
            $haslo2 = $_POST['haslo2'];
            $dob = $_POST['date'];
            @$regulamin = $_POST['checkbox'];
        
            require_once 'inc/connection.php';
            // validating the form
            $ok = true;
            // name
            if(strlen(@$name) < 3 || strlen(@$name) > 15){
                $name_error = 'Imię może posiadać od 3 do 15 znaków!';
                $ok = false;
            }
            if(empty(@$name)){
                $name_error = 'Podaj imię!';
                $ok = false;
            }
            //surname
            if(strlen(@$surname) < 3 || strlen(@$surname) > 15){
                $surname_error = 'Nazwisko musi posiadać od 3 do 15 znaków!';
                $ok = false;
            }
            if(empty(@$surname)){
                $surname_error = 'Podaj nazwisko!';
                $ok = false;
            }
            //e-mail
            $query_emails = "SELECT userid FROM users WHERE email='$email'";
            if($result = $con->query($query_emails)){
                if($result->num_rows > 0){
                    $email_error = 'Istnieje już użytkownik o tym adresie e-mail!';
                    $ok = false;
                }
            }
            else{
                echo 'Błąd bazy danych nr'.$con->connect_errno;
                exit();
            }
            if(!filter_var(@$email, FILTER_VALIDATE_EMAIL)){
                $email_error = 'Podaj poprawny adres e-mail!';
                $ok = false;
            }
            if(empty(@$email)){
                $email_error = 'Podaj adres e-mail!';
                $ok = false;
            }
            // haslo
            if(strlen(@$haslo1) < 8 || strlen(@$haslo1) > 20){
                $haslo_error = 'Hasło musi posiadać od 8 do 20 znaków!';
                $ok = false;
            }
            if(@$haslo1 != @$haslo2){
                $haslo_error = 'Podane hasła muszą być identyczne!';
                $ok = false;
            }        
            if(empty(@$haslo2)){
                $haslo_error = 'Powtórz hasło!';
                $ok = false;
            }
            if(empty(@$haslo1)){
                $haslo_error = 'Podaj hasło!';
                $ok = false;
            }
            // data
            $dob_object = new DateTime(@$dob);
            $now = new DateTime('now');
            $diff = @$dob_object->diff($now);
            if(@$diff->y < 13){
                $dob_error = 'Musisz mieć ukończone 13 lat!';
                $ok = false;
            }
            if(empty(@$dob)){
                $dob_error = 'Podaj datę urodzenia!';
                $ok = false;
            }
            // regulamin
            if(!isset($regulamin)){
                $regulamin_error = 'Musisz zaakceptować regulamin!';
                $ok = false;
            }

            if($ok===true){
                $name_safe = htmlentities($name,ENT_QUOTES, 'UTF-8');
                $surname_safe = htmlentities($surname, ENT_QUOTES, 'utf-8');
                $email_safe = htmlentities($email, ENT_QUOTES, 'UTF-8');
                $haslo_safe = password_hash(htmlentities($haslo1, ENT_QUOTES, 'UTF-8'), PASSWORD_DEFAULT);


                
                $query = "INSERT INTO users(imie,nazwisko,email,haslo,dob) VALUES('$name_safe','$surname_safe','$email_safe','$haslo_safe','$dob')";
                if($con->query($query)){
                    $udana_rejestracja = 'Pomyślnie zarejestrowano';
                }
                else{
                    echo 'Błąd bazy danych nr'.$con->connect_errno;
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
    <title>Meetpad - Rejestracja</title>
    <meta name="description" content="Utwórz konto w serwisie Meetpad i pozostawaj w kontakcie ze znajomymi, rodziną i innymi osobami, które znasz! Udostępniaj zdjęcia i filmy lub przeglądaj posty innych!">
    <link rel="icon" href="img/logo.svg">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/ekran-rejestracji.css">
    <script src="scripts/switch_password_visibility.js" defer></script>
</head>
<body>
    <!-- bg image -->
    <img class="background-image" src="img/signin_bg.jpg" alt="background image">
    <!-- bg image -->
    
    <form action="<?php $_SERVER['PHP_SELF'] ?>" method="post">
    <div class="container">
        <div class="container__top">
            <div class="input-container">
                <label for="name">Imię:</label>
                <input class="field" id="name" type="text" name="name" placeholder="Wpisz imię">
                <?php
                    if(isset($name_error)){
                        echo '<span class="error">'.$name_error.'</span>';
                        unset($name_error);
                    }
                ?>
            </div>
            <div class="input-container">
                <label for="surname">Nazwisko:</label>
                <input class="field" id="surname" type="text" name="surname" placeholder="Wpisz nazwisko">
                <?php
                    if(isset($surname_error)){
                        echo '<span class="error">'.$surname_error.'</span>';
                        unset($surname_error);
                    }
                ?>
            </div>
            <div class="input-container">
                <label for="email">Adres e-mail:</label>
                <input class="field" id="email" type="text" name="email" placeholder="Wpisz adres e-mail">
                <?php
                    if(isset($email_error)){
                        echo '<span class="error">'.$email_error.'</span>';
                        unset($email_error);
                    }
                ?>
            </div>
            <div class="input-container">
                <label for="haslo1">Hasło:</label>
                <input class="field haslo-input" id="haslo1" type="password" name="haslo1" placeholder="Wpisz hasło">
                <?php
                    if(isset($haslo_error)){
                        echo '<span class="error">'.$haslo_error.'</span>';
                        unset($haslo_error);
                    }
                ?>
                <svg class="eye-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z" fill-rule="nonzero"/></svg>
            </div>
            <div class="input-container">
                <label for="haslo2">Powtórz hasło:</label>
                <input class="field haslo-input" id="haslo2" type="password" name="haslo2" placeholder="Powtórz hasło">
                <svg class="eye-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z" fill-rule="nonzero"/></svg>
            </div>
            <div class="input-container">
                <label for="date">Data urodzenia:</label>
                <input class="field" id="date" type="date" name="date">
                <?php
                    if(isset($dob_error)){
                        echo '<span class="error">'.$dob_error.'</span>';
                        unset($dob_error);
                    }
                ?>
            </div>
            <div class="agreement-container">
                <label for="checkbox">Zaakceptuj regulamin</label>
                <input id="checkbox" type="checkbox" name="checkbox">
            </div>
            <?php
                if(isset($regulamin_error)){
                    echo '<span class="error">'.$regulamin_error.'</span>';
                    unset($regulamin_error);
                }
                if(isset($udana_rejestracja)){
                    echo '<span class="user-added">'.$udana_rejestracja.'</span>';
                    unset($udana_rejestracja);
                }
            ?>
        </div>
        <div class="container__bottom">
            <input name="submit" class="reg-in" type="submit" value="Zarejestruj się">
            <a class="log-link" href="logowanie">Logowanie</a>
        </div>
    </div>
    </form>
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
</body>
</html>