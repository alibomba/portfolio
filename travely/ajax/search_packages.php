<?php
    if(!isset($_POST['fraza']) || !isset($_POST['filtry'])){
        exit();
    }
    $fraza = $_POST['fraza'];
    $filtry = $_POST['filtry'];
    require_once '../inc/connection.php';

    switch($filtry){
        case 'none':
            $query = "SELECT * FROM pakiety WHERE miasto LIKE '$fraza%' OR kraj LIKE '$fraza%'";
            break;
        case 'typ':
            $zaznaczone = json_decode($_POST['zaznaczone']);
            $string = '';
            foreach($zaznaczone as $index=>$value){
                if($index==count($zaznaczone)-1){
                    $or = '';
                }
                else{
                    $or = ' OR ';
                }
                $string .= "ikonka='$value'".$or;
            }
            $query = "SELECT * FROM pakiety WHERE (miasto LIKE '$fraza%' OR kraj LIKE '$fraza%') AND (".$string.")";
            break;
        case 'cena':
            $min = $_POST['min_cena'];
            $max = $_POST['max_cena'];
            if($min!=='' && $max!==''){
                $query = "SELECT * FROM pakiety WHERE (miasto LIKE '$fraza%' OR kraj LIKE '$fraza%') AND (cena>='$min' AND cena<='$max')";
            }
            else if($min!=='' && $max===''){
                $query = "SELECT * FROM pakiety WHERE (miasto LIKE '$fraza%' OR kraj LIKE '$fraza%') AND cena>='$min'";
            }
            else if($min==='' && $max!==''){
                $query = "SELECT * FROM pakiety WHERE (miasto LIKE '$fraza%' OR kraj LIKE '$fraza%') AND cena<='$max'";
            }
            break;
        case 'typ i cena':
            $min = $_POST['min_cena'];
            $max = $_POST['max_cena'];
            if($min!=='' && $max!==''){
                $cena_query = "cena>='$min' AND cena<='$max'";
            }
            else if($min!=='' && $max===''){
                $cena_query = "cena>='$min'";
            }
            else if($min==='' && $max!==''){
                $cena_query = "cena<='$max'";
            }

            $zaznaczone = json_decode($_POST['zaznaczone']);
            $typ_query = '';
            foreach($zaznaczone as $index=>$value){
                if($index==count($zaznaczone)-1){
                    $or = '';
                }
                else{
                    $or = ' OR ';
                }
                $typ_query .= "ikonka='$value'".$or;
            }

            $query = "SELECT * FROM pakiety WHERE (miasto LIKE '$fraza%' OR kraj LIKE '$fraza%') AND ((".$cena_query.") AND (".$typ_query."))";
            break;
    }
    if($result = $con->query($query)){
        $result = $result->fetch_all(MYSQLI_ASSOC);
        $json = json_encode($result);
        echo $json;
    }
    else{
        exit();
    }