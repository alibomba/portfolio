<?php
    require_once 'connection.php';
    if(!isset($_POST['fraza'])){
        header('Location: homepage');
        exit();
    }

    $fraza = $_POST['fraza'];
    if($fraza!=''){
        $query = "SELECT * FROM danie WHERE nazwa LIKE '$fraza%'";
    if($result = $con->query($query)){
        $all = $result->fetch_all(MYSQLI_ASSOC);
        $string = '';
        if(count($all)>0){
            foreach($all as $index=>$danie){
                if($index == count($all) - 1){
                    $comma = '';
                }
                else{
                    $comma = ',';
                }
                $string .= '
                    {
                        "id":"'.$danie['id_danie'].'",
                        "nazwa":"'.$danie['nazwa'].'",
                        "opis":"'.$danie['opis'].'",
                        "obraz":"'.$danie['obraz'].'",
                        "cena":"'.$danie['cena'].'"
                    }
                '.$comma;
            }
            $json = '
            {
                "wyniki":"1",
                "dania":['.$string.']
            }
            ';
        }
        else{
            $json = '
            {
                "wyniki":"0"
            }
            ';
        }
        echo $json;
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
    }
    else{
        $json = '
        {
            "wyniki":"all"
        }
        ';
        echo $json;
    }