<div class="settings__element">
            <span class="bold">Data urodzenia</span>
            <div class="settings__element__right">
                <span class="settings__value"><?php echo usuwacz_zer($konto->dob->format('d')).' '.tlumacz_miesiecy($konto->dob->format('M')).' '.$konto->dob->format('Y') ?></span>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <div class="settings__element">
            <span class="bold">Opis profilu</span>
            <div class="settings__element__right">
                <span class="settings__value settings__bio"><?php 
                    if($konto->opis !== ''){
                        echo $konto->opis;
                    }
                    else{
                        echo 'Nie ustawiono';
                    }
                ?></span>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <div class="settings__element">
            <span class="bold long-label">Numer telefonu (wyświetlany w profilu)</span>
            <div class="settings__element__right">
                <span class="settings__value"><?php
                    if($konto->nr_tel !== ''){
                        echo $konto->nr_tel;
                    }
                    else{
                        echo 'Nie ustawiono';
                    }
                ?></span>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <div class="settings__element">
            <span class="bold long-label">Adres e-mail (wyświetlany w profilu)</span>
            <div class="settings__element__right">
                <span class="settings__value"><?php
                    if($konto->kontakt_email !== ''){
                        echo $konto->kontakt_email;
                    }
                    else{
                        echo 'Nie ustawiono';
                    }
                ?></span>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <div class="settings__element">
            <span class="bold long-label">Miejsce zamieszkania</span>
            <div class="settings__element__right">
                <div class="settings__location-inputs">
                <?php
                    if($konto->miasto_zamieszkania !== '' && $konto->kraj_zamieszkania !== ''){
                        echo '<span class="settings__value">'.$konto->miasto_zamieszkania.'</span>';
                        echo '<span class="settings__value">'.$konto->kraj_zamieszkania.'</span>';
                    }
                    else{
                        echo '<span class="settings__value">Nie ustawiono</span>';
                    }
                ?>
                </div>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <div class="settings__element">
            <span class="bold">Szkoła</span>
            <div class="settings__element__right">
                <span class="settings__value"><?php
                    if($konto->szkola !== ''){
                        echo $konto->szkola;
                    }
                    else{
                        echo 'Nie ustawiono';
                    }
                ?></span>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <div class="settings__element">
            <span class="bold">Praca</span>
            <div class="settings__element__right">
                <span class="settings__value"><?php
                    if($konto->praca !== ''){
                        echo $konto->praca;
                    }
                    else{
                        echo 'Nie ustawiono';
                    }
                ?></span>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <div class="settings__element">
            <span class="bold long-label">Miejsce urodzenia</span>
            <div class="settings__element__right">
                <div class="settings__location-inputs">
                <?php
                    if($konto->miasto_urodzenia !== '' && $konto->kraj_urodzenia !== ''){
                        echo '<span class="settings__value">'.$konto->miasto_urodzenia.'</span>';
                        echo '<span class="settings__value">'.$konto->kraj_urodzenia.'</span>';
                    }
                    else{
                        echo '<span class="settings__value">Nie ustawiono</span>';
                    }
                ?>
                </div>
                <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z"/></svg>
                <svg class="submit-setting" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                <svg class="close-edit-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </div>
        <?php
            function tlumacz_miesiecy($miesiac){
                switch($miesiac){
                    case 'Jan':
                        $tlumaczenie = 'stycznia';
                        break;
                    case 'Feb':
                        $tlumaczenie = 'lutego';
                        break;
                    case 'Mar':
                        $tlumaczenie = 'marca';
                        break;
                    case 'Apr':
                        $tlumaczenie = 'kwietnia';
                        break;
                    case 'May':
                        $tlumaczenie = 'maja';
                        break;
                    case 'Jun':
                        $tlumaczenie = 'czerwca';
                        break;
                    case 'Jul':
                        $tlumaczenie = 'lipca';
                        break;
                    case 'Aug':
                        $tlumaczenie = 'sierpnia';
                        break;
                    case 'Sep':
                        $tlumaczenie = 'września';
                        break;
                    case 'Oct':
                        $tlumaczenie = 'października';
                        break;
                    case 'Nov':
                        $tlumaczenie = 'listopada';
                        break;
                    case 'Dec':
                        $tlumaczenie = 'grudnia';
                        break;
                }
                return $tlumaczenie;
            }

            function usuwacz_zer($dzien){
                switch($dzien){
                    case '01':
                        $przetworzone = '1';
                        break;
                    case '02':
                        $przetworzone = '2';
                        break;
                    case '03':
                        $przetworzone = '3';
                        break;
                    case '04':
                        $przetworzone = '4';
                        break;
                    case '05':
                        $przetworzone = '5';
                        break;
                    case '06':
                        $przetworzone = '6';
                        break;
                    case '07':
                        $przetworzone = '7';
                        break;
                    case '08':
                        $przetworzone = '8';
                        break;
                    case '09':
                        $przetworzone = '9';
                        break;
                    default:
                        $przetworzone = $dzien;
                        break;
                }
                return $przetworzone;
            }
        ?>