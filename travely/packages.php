<?php
    session_start();
    require_once 'inc/connection.php';
    include 'inc/auth.php';
    if(isset($_SESSION['userid'])){
        if(authorize_user($_SESSION['userid'],$_SESSION['PHPSESSID'],$_SESSION['token'],$con)){
            $zalogowano = true;
        }
        else{
            $zalogowano = false;
        }
    }
    else{
        $zalogowano = false;
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pakiety</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/packages.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/search.js" defer></script>
</head>
<body>
    <?php include 'inc/header.php'; ?>
    <div class="search">
        <div class="search__bar">
            <input type="text" class="search__bar__input" placeholder="Szukaj...">
            <button class="search__bar__button"><img class="search__bar__button__icon" src="img/icons/search-icon.svg" alt="search icon"></button>
            <div class="search__bar__proponowane"></div>
        </div>
        <div class="search__filters">
            <div class="search__filters__container">
                <button class="search__filters__button">Typ <svg class="filters__button__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                <div class="search__filters__dropdown">
                    <div class="row">
                        <input type="checkbox" id="odpoczynek" class="row__checkbox">
                        <label for="odpoczynek">Odpoczynek</label>
                    </div>
                    <div class="row">
                        <input type="checkbox" id="zwiedzanie" class="row__checkbox">
                        <label for="zwiedzanie">Zwiedzanie</label>
                    </div>
                    <div class="row">
                        <input type="checkbox" id="sport" class="row__checkbox">
                        <label for="sport">Sport</label>
                    </div>
                    <div class="row">
                        <input type="checkbox" id="przygoda" class="row__checkbox">
                        <label for="przygoda">Przygoda</label>
                    </div>
                    <button class="search__filters__dropdown__button">Potwierdź</button>
                </div>
            </div>
            <div class="search__filters__container">
                <button class="search__filters__button">Cena <svg class="filters__button__icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg></button>
                <div class="search__filters__dropdown">
                    <input type="number" class="search__filters__dropdown__input" placeholder="Min.">
                    <input type="number" class="search__filters__dropdown__input" placeholder="Max.">
                    <button class="search__filters__dropdown__button">Potwierdź</button>
                </div>
            </div>
        </div>
    </div>
    <div class="wyniki"></div>
    <div class="najczesciej">
        <h2 class="najczesciej__heading">Najczęściej wybierane pakiety</h2>
        <div class="najczesciej__grid">
            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/berlin.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle data__circle--zwiedzanie">
                        <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 9h-17v-6h17l3 3-3 3zm-6 10h-4v5h4v-5zm0-19h-4v2h4v-2zm-10 11h17v6h-17l-3-3 3-3z"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Berlin</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Niemcy</div>
                        </div>
                    </div>
                    <div class="data__right">700zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--first">Szczegóły</a>
            </div>

            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Londyn.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle data__circle--sport">
                        <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M22.856 6.912c-1.36 5.26-6.115 9.959-12.541 12.443.977 1.273 4.071 3.382 5.837 3.892 4.578-1.691 7.848-6.081 7.848-11.247 0-1.821-.418-3.542-1.144-5.088m-15.224 6.699c.119 1.538.613 2.921 1.355 4.094 6.817-2.445 11.584-7.587 12.474-13.067-.824-1.058-1.818-1.975-2.946-2.706-1.437 6.91-7.647 10.345-10.883 11.679m-2.045-1.045c-1.216-1.41-2.604-2.484-5.347-2.96-.157.774-.24 1.574-.24 2.394 0 6.628 5.372 12 12 12 .496 0 .981-.039 1.461-.097-3.253-1.323-8.032-5.669-7.874-11.337m1.78-1.022c1.209-.534 2.74-1.34 4.222-2.485-2.185-2.84-5.239-4.997-8.252-5.349-1.085 1.133-1.946 2.478-2.522 3.968 3.384.647 5.127 2.152 6.552 3.866m-2.356-9.285c1.969-1.416 4.378-2.259 6.989-2.259 1.647 0 3.216.333 4.645.934-.45 2.861-1.835 5.102-3.537 6.793-2.105-2.675-5.203-4.78-8.097-5.468"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Londyn</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Anglia</div>
                        </div>
                    </div>
                    <div class="data__right">630zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--first">Szczegóły</a>
            </div>
            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Dżakarta.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle data__circle--przygoda">
                        <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20.655 22.122v-2.197c1.907-.418 3.345-2.235 3.345-4.41 0-1.381-.292-1.662-3.536-10.041-.012 0-.16-.459-.646-.459-.488 0-.633.461-.643.461-.611 1.58-1.11 2.863-1.528 3.937.73 1.813.853 2.414.853 3.435 0 1.969-.884 3.737-2.289 4.935.59 1.085 1.59 1.883 2.771 2.142v1.744c-1.538-.339-3.53-.586-6.065-.637v-2.761c2.599-.436 4.583-2.7 4.583-5.423 0-1.687-.384-2.031-4.653-12.271-.014 0-.209-.562-.847-.562-.643 0-.833.564-.847.564-4.633 11.145-4.653 10.837-4.653 12.269 0 2.723 1.984 4.987 4.583 5.423v2.761c-2.562.051-4.571.303-6.116.648v-1.755c1.186-.263 2.187-1.077 2.769-2.186-1.375-1.198-2.236-2.946-2.236-4.891 0-.934.024-1.277.844-3.324-.424-1.088-.938-2.41-1.567-4.05-.011 0-.157-.459-.638-.459-.484 0-.627.461-.637.461-3.487 9.119-3.502 8.867-3.502 10.039 0 2.175 1.423 3.992 3.311 4.41v2.208c-2.587.852-3.311 1.882-3.311 1.882h24s-.732-1.038-3.345-1.893z"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Dżakarta</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Indonezja</div>
                        </div>
                    </div>
                    <div class="data__right">980zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--first">Szczegóły</a>
            </div>

            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Manchester.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle data__circle--sport">
                        <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M22.856 6.912c-1.36 5.26-6.115 9.959-12.541 12.443.977 1.273 4.071 3.382 5.837 3.892 4.578-1.691 7.848-6.081 7.848-11.247 0-1.821-.418-3.542-1.144-5.088m-15.224 6.699c.119 1.538.613 2.921 1.355 4.094 6.817-2.445 11.584-7.587 12.474-13.067-.824-1.058-1.818-1.975-2.946-2.706-1.437 6.91-7.647 10.345-10.883 11.679m-2.045-1.045c-1.216-1.41-2.604-2.484-5.347-2.96-.157.774-.24 1.574-.24 2.394 0 6.628 5.372 12 12 12 .496 0 .981-.039 1.461-.097-3.253-1.323-8.032-5.669-7.874-11.337m1.78-1.022c1.209-.534 2.74-1.34 4.222-2.485-2.185-2.84-5.239-4.997-8.252-5.349-1.085 1.133-1.946 2.478-2.522 3.968 3.384.647 5.127 2.152 6.552 3.866m-2.356-9.285c1.969-1.416 4.378-2.259 6.989-2.259 1.647 0 3.216.333 4.645.934-.45 2.861-1.835 5.102-3.537 6.793-2.105-2.675-5.203-4.78-8.097-5.468"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Manchester</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Anglia</div>
                        </div>
                    </div>
                    <div class="data__right">900zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--first">Szczegóły</a>
            </div>

            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Madryt.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle data__circle--zwiedzanie">
                        <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 9h-17v-6h17l3 3-3 3zm-6 10h-4v5h4v-5zm0-19h-4v2h4v-2zm-10 11h17v6h-17l-3-3 3-3z"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Madryt</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Hiszpania</div>
                        </div>
                    </div>
                    <div class="data__right">750zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--first">Szczegóły</a>
            </div>

            <div class="pakiet__component">
                <div class="pakiet__component__img" style="background-image:url('img/packages/Nowy Jork.jpg');"></div>
                <div class="pakiet__component__data">
                    <div class="data__circle data__circle--zwiedzanie">
                        <svg class="data__circle__icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 9h-17v-6h17l3 3-3 3zm-6 10h-4v5h4v-5zm0-19h-4v2h4v-2zm-10 11h17v6h-17l-3-3 3-3z"/></svg>
                    </div>
                    <div class="data__left">
                        <p class="data__left__miasto">Nowy Jork</p>
                        <div class="data__left__kontynent">
                            <svg class="data__left__kontynent__icon" width="15" height="15" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg>
                            <div class="data__left__kontynent__text">Stany zjednoczone</div>
                        </div>
                    </div>
                    <div class="data__right">2250zł</div>
                </div>
                <div class="pakiet__component__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!
                </div>
                <a href="pakiet" class="pakiet__component__button pakiet__component__button--first">Szczegóły</a>
            </div>
        </div>
    </div>
    <?php include 'inc/footer.php'; ?>
</body>
</html>