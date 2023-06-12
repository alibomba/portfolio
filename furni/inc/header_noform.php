<div class="popup"></div>
<header class="header">
        <a href="homepage"><img class="header__logo" src="img/logo.png" alt="logo furni"></a>
        <form class="header__search">
            <input type="text" class="header__search__input" placeholder="Szukaj...">
            <svg class="header__search__icon header__search__icon--niehomepage" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" fill-rule="nonzero"/></svg>
        </form>
        <nav class="header__nav">
            <a class="header__nav-link" href="sklep">
                <svg class="header__nav-link__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M10 9v-1.098l1.047-4.902h1.905l1.048 4.9v1.098c0 1.067-.933 2.002-2 2.002s-2-.933-2-2zm5 0c0 1.067.934 2 2.001 2s1.999-.833 1.999-1.9v-1.098l-2.996-5.002h-1.943l.939 4.902v1.098zm-10 .068c0 1.067.933 1.932 2 1.932s2-.865 2-1.932v-1.097l.939-4.971h-1.943l-2.996 4.971v1.097zm-4 2.932h22v12h-22v-12zm2 8h18v-6h-18v6zm1-10.932v-1.097l2.887-4.971h-2.014l-4.873 4.971v1.098c0 1.066.933 1.931 2 1.931s2-.865 2-1.932zm15.127-6.068h-2.014l2.887 4.902v1.098c0 1.067.933 2 2 2s2-.865 2-1.932v-1.097l-4.873-4.971zm-.127-3h-14v2h14v-2z"/></svg>
                Sklep
            </a>
            <p class="header__nav-link header__dropdown-button">
                <svg class="header__nav-link__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z"/></svg>
                Konto
            </p>
            <div class="header__dropdown header__dropdown--konto <?php if($zalogowano){ echo 'header__dropdown--konto-zalogowano';} ?>">
                <?php
                    if($zalogowano){
                        echo <<< END
                            <a class="header__dropdown__link" href="konto">Ustawienia</a>
                            <br>
                            <a class="header__dropdown__link" href="logout.php">Wyloguj się</a>
                        END;
                    }
                    else{
                        echo '<a class="header__dropdown__link" href="logowanie">Zaloguj się</a>';
                    }
                ?>
            </div>
            <p class="header__nav-link header__dropdown-button">
                <svg class="header__nav-link__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"/></svg>
                Ulubione
            </p>
            <div class="header__dropdown header__dropdown--produkty header__dropdown--ulubione<?php if(!$zalogowano){echo '-wylogowano';} ?>">
                <?php
                    if($zalogowano){
                            echo '<div class="header__dropdown__produkty">';
                        $user_id = $_SESSION['user_id'];
                        $query = "SELECT produkty.id,produkty.nazwa,produkty.kategoria,produkty.cena FROM produkty,ulubione WHERE ulubione.user_id='$user_id' AND ulubione.id_produktu=produkty.id ORDER BY ulubione.data_dodania LIMIT 5";
                        if($result = $con->query($query)){
                            $pozycje = $result->fetch_all(MYSQLI_ASSOC);
                            if($result->num_rows>0){
                                foreach($pozycje as $pozycja){
                                    echo '<a href="produkt?id='.$pozycja['id'].'" class="header__dropdown__produkt">';
                                    echo    '<img src="img/products/'.$pozycja['kategoria'].'/'.$pozycja['nazwa'].'.png" alt="'.$pozycja['nazwa'].'" class="dropdown__produkt__img">';
                                    echo    '<div class="dropdown__produkt__right">';
                                    echo        '<p class="dropdown__produkt__text">'.$pozycja['nazwa'].'</p>';
                                    echo        '<p class="dropdown__produkt__text bold">'.$pozycja['cena'].' zł</p>';
                                    echo    '</div>';
                                    echo '</a>';
                                }
                            }
                            else{
                                echo '<div class="brak-produktow">Brak produktów</div>';
                            }
                            echo '</div>';
                            echo '<a class="header__dropdown__link" href="ulubione">Wszystkie</a>';
                        }
                        else{
                            exit();
                        }
                    }
                    else{
                        echo '<a class="header__dropdown__link" href="logowanie">Zaloguj się</a>';
                    }
                ?>
            </div>
            <p class="header__nav-link header__dropdown-button">
                <svg class="header__nav-link__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg>
                Koszyk
            </p>
            <div class="header__dropdown header__dropdown--produkty header__dropdown--koszyk<?php if(!$zalogowano){echo '-wylogowano';} ?>">
                <?php
                    if($zalogowano){
                        echo '<div class="header__dropdown__produkty">';
                        $user_id = $_SESSION['user_id'];
                        $query = "SELECT produkty.id,produkty.nazwa,produkty.kategoria,produkty.cena FROM produkty,koszyki WHERE koszyki.user_id='$user_id' AND koszyki.id_produktu=produkty.id ORDER BY koszyki.data_dodania LIMIT 5";
                        if($result = $con->query($query)){
                            $pozycje = $result->fetch_all(MYSQLI_ASSOC);
                            if($result->num_rows>0){
                                foreach($pozycje as $pozycja){
                                    echo '<a href="produkt?id='.$pozycja['id'].'" class="header__dropdown__produkt">';
                                    echo    '<img src="img/products/'.$pozycja['kategoria'].'/'.$pozycja['nazwa'].'.png" alt="'.$pozycja['nazwa'].'" class="dropdown__produkt__img">';
                                    echo    '<div class="dropdown__produkt__right">';
                                    echo        '<p class="dropdown__produkt__text">'.$pozycja['nazwa'].'</p>';
                                    echo        '<p class="dropdown__produkt__text bold">'.$pozycja['cena'].' zł</p>';
                                    echo    '</div>';
                                    echo '</a>';
                                }
                            }
                            else{
                                echo '<div class="brak-produktow">Brak produktów</div>';
                            }
                            echo '</div>';
                            echo '<a class="header__dropdown__link" href="koszyk">Wszystkie</a>';
                        }
                        else{
                            exit();
                        }
                    }
                    else{
                        echo '<a class="header__dropdown__link" href="logowanie">Zaloguj się</a>';
                    }
                ?>
            </div>
            <a href="o-nas" class="header__nav-link">
                <svg class="header__nav-link__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z"/></svg>
                O nas
            </a>
        </nav>
    </header>