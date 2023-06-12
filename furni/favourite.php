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
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ulubione</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/favourite.css">
    <script src="scripts/generic.js" defer></script>
</head>
<body>
<?php include 'inc/header_noform.php'; ?>
    <main>
        <div class="ulubione">
            <?php
                if($zalogowano){
                    $user_id = $_SESSION['user_id'];
                    $query = "SELECT produkty.id,produkty.nazwa,produkty.kategoria,produkty.cena,produkty.poprzednia_cena FROM produkty,ulubione WHERE ulubione.user_id='$user_id' AND produkty.id=ulubione.id_produktu ORDER BY ulubione.data_dodania DESC";
                    if($result = $con->query($query)){
                        $ulubione = $result->fetch_all(MYSQLI_ASSOC);
                        if($result->num_rows>0){
                            foreach($ulubione as $pozycja){

                                // liczba gwiazdek
                                $id_produktu = $pozycja['id'];
                                $query = "SELECT AVG(liczba_gwiazdek) as srednia FROM komentarze WHERE id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    $result = $result->fetch_assoc();
                                    if(!is_null($result['srednia'])){
                                        $gwiazdki = [
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                            '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">'
                                        ];
                                        for($i=0;$i<=round($result['srednia'])-1;$i++){
                                            $gwiazdki[$i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">';
                                        }
                                    }
                                    else{
                                        $gwiazdki = [
                                            '<p class="brak-ocen">Brak ocen</p>'
                                        ];
                                    }
                                }
                                else{
                                    exit();
                                }

                                // czy w koszyku
                                $user_id = $_SESSION['user_id'];
                                $query = "SELECT id FROM koszyki WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    if($result->num_rows>0){
                                        $koszyk = 'delete-from-cart';
                                    }
                                    else{
                                        $koszyk = 'add-to-cart';
                                    }
                                }
                                else{
                                    exit();
                                }

                                // czy w ulubionych
                                $query = "SELECT id FROM ulubione WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
                                if($result = $con->query($query)){
                                    if($result->num_rows>0){
                                        $serce = 'filled-heart';
                                    }
                                    else{
                                        $serce = 'heart';
                                    }
                                }
                                else{
                                    exit();
                                }


                                echo '<div class="produkt produkt--ulubione">';
                                echo     '<div class="produkt__top">';
                                echo         '<img src="img/products/'.$pozycja['kategoria'].'/'.$pozycja['nazwa'].'.png" alt="'.$pozycja['nazwa'].'" class="produkt__img">';
                                echo         '<a href="produkt" class="produkt__nazwa">'.$pozycja['nazwa'].'</a>';
                                            if(!is_null($pozycja['poprzednia_cena'])){
                                                echo '<p class="produkt__cena"><span class="produkt__cena__previous">'.$pozycja['poprzednia_cena'].' zł</span> '.$pozycja['cena'].' zł</p>';
                                            }
                                            else{
                                                echo '<p class="produkt__cena">'.$pozycja['cena'].' zł</p>';
                                            }
                                echo         '<div class="produkt__gwiazdki">';
                                            foreach($gwiazdki as $gwiazdka){
                                                echo $gwiazdka;
                                            }
                                echo         '</div>';
                                echo     '</div>';
                                echo     '<div class="produkt__bottom">';
                                echo         '<img onclick="dodajDoKoszyka(event,'.$pozycja['id'].')" src="img/icons/'.$koszyk.'-icon.png" alt="dodaj do koszyka" class="produkt__bottom__icon">';
                                echo         '<img onclick="dodajDoUlubionych(event,'.$pozycja['id'].')" src="img/icons/'.$serce.'-icon.png" alt="serce" class="produkt__bottom__icon">';
                                echo     '</div>';
                                echo '</div>';
                            }
                        }
                        else{
                            echo '<div class="brak-produktow-big">Brak produktów</div>';
                        }
                    }
                    else{
                        exit();
                    }
                }
                else{
                    header('Location: homepage');
                    exit();
                }
            ?>
        </div>
        <div class="zobacz-tez">
            <h2 class="zobacz-tez__heading">Zobacz też</h2>
            <div class="zobacz-tez__grid">
                <?php
                    $user_id = $_SESSION['user_id'];
                    $koszyki_query = "SELECT id_produktu FROM koszyki WHERE user_id='$user_id'";
                    $ulubione_query = "SELECT id_produktu FROM ulubione WHERE user_id='$user_id'";
                    $wykluczone_id = [];
                    if($koszyki_result = $con->query($koszyki_query)){
                        if($koszyki_result->num_rows>0){
                            $koszyki_result = $koszyki_result->fetch_all(MYSQLI_ASSOC);
                            foreach($koszyki_result as $koszyk){
                                $wykluczone_id[] = $koszyk['id_produktu'];
                            }
                        }
                    }
                    else{
                        exit();
                    }
                    if($ulubione_result = $con->query($ulubione_query)){
                        if($ulubione_result->num_rows>0){
                            $ulubione_result = $ulubione_result->fetch_all(MYSQLI_ASSOC);
                            foreach($ulubione_result as $ulubiony){
                                $wykluczone_id[] = $ulubiony['id_produktu'];
                            }
                        }
                    }
                    else{
                        exit();
                    }
                    $query_conditions = ' WHERE ';
                    if(count($wykluczone_id)>0){
                        foreach($wykluczone_id as $index=>$id){
                            if($index==count($wykluczone_id)-1){
                                $and='';
                            }
                            else{
                                $and=' AND ';
                            }
                            $query_conditions.= "id!='$id'".$and."";
                        }
                    }

                    
                    $query = "SELECT * FROM produkty $query_conditions ORDER BY RAND() LIMIT 9";
                    if($result = $con->query($query)){
                        $zobacz_tez = $result->fetch_all(MYSQLI_ASSOC);
                        foreach($zobacz_tez as $pozycja){

                            // liczba gwiazdek
                            $id_produktu = $pozycja['id'];
                            $query = "SELECT AVG(liczba_gwiazdek) as srednia FROM komentarze WHERE id_produktu='$id_produktu'";
                            if($result = $con->query($query)){
                                $result = $result->fetch_assoc();
                                if(!is_null($result['srednia'])){
                                    $gwiazdki = [
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">',
                                        '<img src="img/icons/empty-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">'
                                    ];
                                    for($i=0;$i<=round($result['srednia'])-1;$i++){
                                        $gwiazdki[$i] = '<img src="img/icons/filled-star-icon.png" alt="gwiazdka" class="produkt__gwiazdki__star">';
                                    }
                                }
                                else{
                                    $gwiazdki = [
                                        '<p class="brak-ocen">Brak ocen</p>'
                                    ];
                                }
                            }
                            else{
                                exit();
                            }


                            // czy w koszyku
                            $user_id = $_SESSION['user_id'];
                            $query = "SELECT id FROM koszyki WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
                            if($result = $con->query($query)){
                                if($result->num_rows>0){
                                    $koszyk = 'delete-from-cart';
                                }
                                else{
                                    $koszyk = 'add-to-cart';
                                }
                            }
                            else{
                                exit();
                            }


                            // czy w ulubionych
                            $query = "SELECT id FROM ulubione WHERE user_id='$user_id' AND id_produktu='$id_produktu'";
                            if($result = $con->query($query)){
                                if($result->num_rows>0){
                                    $serce = 'filled-heart';
                                }
                                else{
                                    $serce = 'heart';
                                }
                            }
                            else{
                                exit();
                            }



                            echo '<div class="produkt produkt">';
                            echo     '<div class="produkt__top">';
                            echo         '<img src="img/products/'.$pozycja['kategoria'].'/'.$pozycja['nazwa'].'.png" alt="'.$pozycja['nazwa'].'" class="produkt__img">';
                            echo         '<a href="produkt" class="produkt__nazwa">'.$pozycja['nazwa'].'</a>';
                                        if(!is_null($pozycja['poprzednia_cena'])){
                                            echo '<p class="produkt__cena"><span class="produkt__cena__previous">'.$pozycja['poprzednia_cena'].' zł</span> '.$pozycja['cena'].' zł</p>';
                                        }
                                        else{
                                            echo '<p class="produkt__cena">'.$pozycja['cena'].' zł</p>';
                                        }
                            echo         '<div class="produkt__gwiazdki">';
                                        foreach($gwiazdki as $gwiazdka){
                                            echo $gwiazdka;
                                        }
                            echo         '</div>';
                            echo     '</div>';
                            echo     '<div class="produkt__bottom">';
                            echo         '<img onclick="dodajDoKoszyka(event,'.$pozycja['id'].')" src="img/icons/'.$koszyk.'-icon.png" alt="dodaj do koszyka" class="produkt__bottom__icon">';
                            echo         '<img onclick="dodajDoUlubionych(event,'.$pozycja['id'].')" src="img/icons/'.$serce.'-icon.png" alt="serce" class="produkt__bottom__icon">';
                            echo     '</div>';
                            echo '</div>';    
                        }
                    }
                    else{
                        exit();
                    }
                ?>
            </div>
        </div>
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