<?php
        $query = "SELECT imie,nazwisko,email FROM users WHERE id='$userid'";
        if($result = $con->query($query)){
            $user = $result->fetch_assoc();
        }
        else{
            exit();
        }
?>
<form class="main">
            <div class="main__top">
                <div class="main__input-container">
                    <label for="imie" class="main__label">Imię</label>
                    <input id="imie" type="text" class="main__input" value="<?php echo $user['imie']; ?>">
                </div>
                <div class="main__input-container">
                    <label for="nazwisko" class="main__label">Nazwisko</label>
                    <input id="nazwisko" type="text" class="main__input" value="<?php echo $user['nazwisko']; ?>">
                </div>
            </div>
            <div class="main__input-container">
                <label for="email" class="main__label">Adres e-mail</label>
                <input value="<?php echo $user['email']; ?>" type="text" class="main__input" id="email">
            </div>
            <p class="main__error"></p>
            <input type="submit" value="Potwierdź" class="main__button">
</form>