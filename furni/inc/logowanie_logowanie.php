<div class="input-container">
    <label for="email">E-mail</label>
    <input <?php if(isset($_POST['email'])){echo 'value="'.$_POST['email'].'"';} ?> name="email" type="text" id="email" class="field">
</div>
<div class="input-container haslo-container">
    <label for="haslo">Hasło</label>
    <input name="haslo" type="password" id="haslo" class="field haslo-input">
    <img src="img/icons/hidden-password-icon.svg" alt="oko" class="haslo-eye">
</div>
<p class="error">
    <?php
        if(isset($error)){
            echo $error;
            unset($error);
        }
    ?>
</p>
<input name="submit" type="submit" value="Zaloguj się" class="button">
<a href="homepage" class="button">Kontynuuj bez logowania</a>