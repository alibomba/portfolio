<?php
    $user_id = $_SESSION['user_id'];
    $query = "SELECT produkty.id as id_produktu,produkty.nazwa as nazwa_produktu,produkty.kategoria as kategoria_produktu,produkty.cena as cena_produktu,koszyki.id as id_koszyka,koszyki.ilosc as ilosc_koszyka FROM produkty,koszyki WHERE koszyki.user_id='$user_id' AND produkty.id=koszyki.id_produktu ORDER BY koszyki.data_dodania DESC";
    if($result = $con->query($query)){
        $pozycje = $result->fetch_all(MYSQLI_ASSOC);
        if($result->num_rows>0){
            echo '<div class="produkty">';
                foreach($pozycje as $pozycja){
                    if($pozycja['ilosc_koszyka']==1){
                        $minus_cursor = 'style="cursor:not-allowed;"';
                    }
                    else{
                        $minus_cursor = '';
                    }

                    if($pozycja['ilosc_koszyka']==100){
                        $plus_cursor = 'style="cursor:not-allowed;"';
                    }
                    else{
                        $plus_cursor = '';
                    }

                    echo '<div class="pozycja p-'.$pozycja['id_koszyka'].'">';
                    echo     '<input checked type="checkbox" class="pozycja__checkbox">';
                    echo     '<img src="img/products/'.$pozycja['kategoria_produktu'].'/'.$pozycja['nazwa_produktu'].'.png" alt="'.$pozycja['nazwa_produktu'].'" class="pozycja__img">';
                    echo     '<a href="produkt?id='.$pozycja['id_produktu'].'" class="pozycja__nazwa">'.$pozycja['nazwa_produktu'].'</a>';
                    echo     '<div class="liczby">';
                    echo         '<div class="ilosc">';
                    echo             '<img '.$minus_cursor.' onclick="koszykZmniejszIlosc(event,'.$pozycja['id_koszyka'].')" src="img/icons/minus-icon.png" alt="minus" class="ilosc__icon ilosc__minus">';
                    echo             '<p class="ilosc__ilosc">'.$pozycja['ilosc_koszyka'].'</p>';
                    echo             '<img '.$plus_cursor.' onclick="koszykZwiekszIlosc(event,'.$pozycja['id_koszyka'].')" src="img/icons/plus-icon.png" alt="plus" class="ilosc__icon ilosc__plus">';
                    echo         '</div>';
                    echo         '<p class="pozycja__cena">'.floatval($pozycja['cena_produktu'])*intval($pozycja['ilosc_koszyka']).' zł</p>';
                    echo     '</div>';
                    echo     '<img onclick="koszykUsunZKoszyka(event,'.$pozycja['id_koszyka'].')" src="img/icons/delete-icon.png" alt="gumka" class="pozycja__delete">';
                    echo '</div>';
                }
            $query = "SELECT produkty.cena,koszyki.ilosc FROM produkty,koszyki WHERE koszyki.user_id='$user_id' AND produkty.id=koszyki.id_produktu";
            if($result = $con->query($query)){
                $result = $result->fetch_all(MYSQLI_ASSOC);
                $podsumowanie = 0;
                foreach($result as $pozycja){
                    $podsumowanie += $pozycja['cena']*$pozycja['ilosc'];
                }
            }
            else{
                exit();
            }
            echo '</div>';
            echo '<div class="podsumowanie">';
            echo    '<p class="podsumowanie__heading">Podsumowanie:</p>';
            echo    '<p class="podsumowanie__text">Zamówienie: <span class="bold"><span class="podsumowanie__zamowienie">'.round($podsumowanie,2).'</span> zł</span></p>';
            echo     '<div class="podsumowanie__row">';
            echo         '<p class="podsumowanie__text">Kod promocyjny:</p>';
            echo         '<input type="text" class="kod-promocyjny-input">';
            echo     '</div>';
            echo     '<p class="podsumowanie__text">Dostawa: <span class="bold">30 zł</span></p>';
            echo     '<div class="podsumowanie__row calosc">';
            echo         '<p class="podsumowanie__text">Całość: <span class="bold"><span class="podsumowanie__calosc">'.round($podsumowanie+30,2).'</span> zł</span></p>';
            echo         '<button class="podsumowanie__button">Zamów</button>';
            echo    '</div>';
            echo     '<p class="podsumowanie__error"></p>';
            echo '</div>';
        }
        else{
            echo '<div class="brak-produktow-big">Brak produktów</div>';
        }
    }
    else{
        exit();
    }
?>