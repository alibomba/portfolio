<header>
<div class="contact-bar">
            <div class="contact-bar__left">
                <div class="contact-bar__left__row">
                    <svg class="contact-bar__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg>
                    <p class="phone__text">+48 123 457 981</p>
                </div>
                <div class="contact-bar__left__row">
                    <svg class="contact-bar__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
                    <div class="mail__text">kontakt@travely.com</div>
                </div>
            </div>
            <a class="contact-bar__login" href="<?php if($zalogowano){echo 'logout.php';}else{echo 'logowanie';} ?>">
                <svg class="login__icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/></svg>
                <p class="login__text"><?php if($zalogowano){echo 'Wyloguj się';}else{echo 'Zaloguj się';} ?></p>
            </a>
    </div>
        <nav class="header header--normal">
                <a href="homepage"><img class="logo" src="img/logo.png" alt="logo"></a>
                <a href="homepage" class="header__nav-link header__nav-link--a">Strona główna</a>
                <a href="pakiety" class="header__nav-link header__nav-link--a">Pakiety</a>
                <a href="rezerwuj" class="header__nav-link header__nav-link--a">Rezerwuj</a>

                <div class="header__nav-link header__dropdown-button">O nas
                <svg class="header__dropdown-button__arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="45" height="45" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
                    <div class="header__dropdown-content header__dropdown-content--nas">
                        <a href="kontakt" class="header__nav-link header__nav-link--a">Kontakt</a>
                        <a href="opinie" class="header__nav-link header__nav-link--a">Opinie</a>
                        <a href="#" class="header__nav-link header__nav-link--a">O nas</a>
                    </div>
                </div>

                <?php
                    if($zalogowano){
                        echo '
                        <div class="header__nav-link header__dropdown-button">Konto
                            <svg class="header__dropdown-button__arrow" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="45" height="45" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
                            <div class="header__dropdown-content header__dropdown-content--konto">
                                <a href="konto?tab=informacje" class="header__nav-link header__nav-link--a">Edytuj profil</a>
                                <a href="logout.php" class="header__nav-link header__nav-link--a">Wyloguj się</a>
                            </div>
                        </div>
                        ';
                    }
                ?>
        </nav>
</header>