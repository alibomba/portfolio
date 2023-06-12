<header class="header">
        <a href="homepage"><img class="header__logo" src="img/text_logo.svg" alt="meetpad logo"></a>
        <div class="header__search-bar--container">
            <input class="header__search-bar" type="text" name="search" placeholder="Wyszukaj" autocomplete="off" id="search-bar">
            <label for="search-bar"><img class="search-icon" src="img/icons/search-icon.png" alt="search icon"></label>
        </div>
        <nav class="header__nav">
            <a href="events">
                <img class="header__nav-link" src="img/icons/events-icon.svg" alt="events icon">
            </a>
            <a href="messages">
                <img class="header__nav-link" src="img/icons/messages-icon.svg" alt="messages icon">
            </a>
            <a href="powiadomienia">
                <img class="header__nav-link" src="img/icons/notifications-icon.svg" alt="notifications icon">
            </a>
            <div class="unread-notifications"><?php
                $unread = $konto->unread_notis;
                if($unread==0){
                    echo '';
                }
                else if($unread>0 && $unread<10){
                    echo $unread;
                }
                else if($unread>9){
                    echo '9+';
                }
            ?></div>
        </nav>
        <div class="header__pfp--container">
            <img class="header__pfp pfp" src="<?php echo $konto->profilowe; ?>" alt="user's profile picture">
            <div class="account-settings-tooltip">
                <svg class="account-settings-tooltip__close" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                <div class="account-settings-tooltip__top">
                    <p class="settings-link">Ciemny tryb</p>
                    <div class="account-settings-tooltip__top__right">
                        <p class="settings-link darkmode-toggle-text">Wył.</p>
                        <img class="darkmode-toggle" src="img/icons/darkmode-off-icon.png" alt="darkmode toggle icon">
                    </div>
                </div>
                <div class="account-settings-tooltip__bottom">
                        <a href="ustawienia" class="settings-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.496 1.261l3.77 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.77-3.771c-.172.585-.254 1.189-.254 1.793 0 1.602.603 3.202 1.826 4.426 1.351 1.351 3.164 1.957 4.931 1.821.933-.072 1.852.269 2.514.931l7.621 7.611c.577.578 1.337.915 2.096.915 1.661 0 3.047-1.411 3.012-3.077-.016-.737-.352-1.47-.914-2.033l-7.621-7.612c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.834-4.427-1.834-.603 0-1.207.09-1.791.261zm15.459 18.692c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z"/></svg> Ustawienia</a>
    
                        
                        <a href="bezpieczenstwo" class="settings-link"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12.804 9c1.038-1.793 2.977-3 5.196-3 3.311 0 6 2.689 6 6s-2.689 6-6 6c-2.219 0-4.158-1.207-5.196-3h-3.804l-1.506-1.503-1.494 1.503-1.48-1.503-1.52 1.503-3-3.032 2.53-2.968h10.274zm7.696 1.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg> Bezpieczeństwo</a>
    
                        
                        <a href="wsparcie" class="settings-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18.8c-4.853 0-8.8 3.947-8.8 8.8s3.947 8.8 8.8 8.8 8.8-3.947 8.8-8.8-3.947-8.8-8.8-8.8zm0 15.05c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.432-3.468.572-.544 1.024-.975.962-1.821-.058-.805-.73-1.226-1.364-1.226-.709 0-1.538.527-1.538 2.013h-2.011c0-2.4 1.41-3.95 3.59-3.95 1.036 0 1.942.339 2.551.955.57.578.865 1.372.854 2.298-.018 1.383-.859 2.291-1.536 3.021z"/></svg> Pomoc i wsparcie</a>
    
                        
                        <a href="logout.php" class="settings-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm6-7c-1.787 0-3.46.474-4.911 1.295l.228.2 1.395 1.221c1.004-.456 2.115-.716 3.288-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.284-.26-3.288-.715l-1.395 1.221-.228.2c1.451.82 3.124 1.294 4.911 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"/></svg> Wyloguj się</a>
                </div>
            </div>
        </div>
    </header>