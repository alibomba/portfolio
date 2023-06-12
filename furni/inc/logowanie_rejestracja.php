<div class="input-container">
    <label for="imie">Imię</label>
    <input <?php if(isset($_POST['imie'])){echo 'value="'.$_POST['imie'].'"';} ?> name="imie" type="text" id="imie" class="field">
</div>
<p class="error">
    <?php
        if(isset($e_imie)){
            echo $e_imie;
            unset($e_imie);
        }
    ?>
</p>
<div class="input-container">
    <label for="nazwisko">Nazwisko</label>
    <input <?php if(isset($_POST['nazwisko'])){echo 'value="'.$_POST['nazwisko'].'"';} ?> name="nazwisko" type="text" id="nazwisko" class="field">
</div>
<p class="error">
    <?php
        if(isset($e_nazwisko)){
            echo $e_nazwisko;
            unset($e_nazwisko);
        }
    ?>
</p>
<div class="input-container">
    <label for="email">Adres e-mail</label>
    <input <?php if(isset($_POST['email'])){echo 'value="'.$_POST['email'].'"';} ?> name="email" type="text" id="email" class="field">
</div>
<p class="error">
    <?php
        if(isset($e_email)){
            echo $e_email;
            unset($e_email);
        }
    ?>
</p>
<div class="input-container">
    <label for="nr_tel">Nr telefonu</label>
    <input <?php if(isset($_POST['nr_tel'])){echo 'value="'.$_POST['nr_tel'].'"';} ?> name="nr_tel" type="text" id="nr_tel" class="field">
</div>
<p class="error">
    <?php
        if(isset($e_nr_tel)){
            echo $e_nr_tel;
            unset($e_nr_tel);
        }
    ?>
</p>
<div class="input-container haslo-container">
    <label for="haslo">Hasło</label>
    <input name="haslo" type="password" id="haslo" class="field haslo-input">
    <img src="img/icons/hidden-password-icon.svg" alt="oko" class="haslo-eye">
</div>
<p class="error">
    <?php
        if(isset($e_haslo)){
            echo $e_haslo;
            unset($e_haslo);
        }
    ?>
</p>
<div class="input-container haslo-container">
    <label for="haslo_confirm">Powtórz hasło</label>
    <input name="haslo_confirm" type="password" id="haslo_confirm" class="field haslo-input">
    <img src="img/icons/hidden-password-icon.svg" alt="oko" class="haslo-eye">
</div>
<input type="submit" name="submit" value="Zarejestruj się" class="button">