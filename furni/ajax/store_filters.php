<?php
    if(!isset($_POST['fraza'])||!isset($_POST['min'])||!isset($_POST['max'])||!isset($_POST['sort'])||!isset($_POST['kategoria'])){
        header('Location: homepage');
        exit();
    }
    if($_POST['fraza']!==''||$_POST['min']!==''||$_POST['max']!==''||$_POST['sort']!==''){
        $fraza = htmlentities($_POST['fraza'],ENT_QUOTES);
        if($fraza!==''){
            $fraza_query = " WHERE nazwa LIKE '%$fraza%' ";
            if($_POST['min']!==''||$_POST['max']!==''||$_POST['kategoria']!==''){
                $fraza_query .= " AND ";
            }
        }
        else{
            $fraza_query = '';
        }
        $min = htmlentities($_POST['min'],ENT_QUOTES);
        $max = htmlentities($_POST['max'],ENT_QUOTES);
        if($min===''&&$max!==''){
            $cena_query = " cena<$max ";
            if($fraza===''){
                $cena_query = "WHERE ".$cena_query;
            }
            if($_POST['kategoria']!==''){
                $cena_query.=" AND ";
            }
        }
        else if($min!==''&&$max===''){
            $cena_query = " cena>$min ";
            if($fraza===''){
                $cena_query = "WHERE ".$cena_query;
            }
            if($_POST['kategoria']!==''){
                $cena_query.=" AND ";
            }
        }
        else if($min!==''&&$max!==''){
            $cena_query = " (cena>$min AND cena<$max) ";
            if($fraza===''){
                $cena_query = "WHERE ".$cena_query;
            }
            if($_POST['kategoria']!==''){
                $cena_query.=" AND ";
            }
        }
        else{
            $cena_query = '';
        }
        $kategoria = htmlentities($_POST['kategoria'],ENT_QUOTES);
        if($kategoria!==''){
            $kategoria_query = " kategoria='$kategoria' ";
            if($cena_query===''&&$fraza_query===''){
                $kategoria_query = " WHERE ".$kategoria_query;
            }
        }
        else{
            $kategoria_query = '';
        }
        $sort = htmlentities($_POST['sort'],ENT_QUOTES);
        if($sort!==''){
            switch($sort){
                case 'alfa':
                    $sort_query = " ORDER BY nazwa";
                    break;
                case 'tanio':
                    $sort_query = " ORDER BY cena ASC";
                    break;
                case 'drogo':
                    $sort_query = " ORDER BY cena DESC";
                    break;
                default:
                    $sort_query = '';
                    break;
            }
        }
        else{
            $sort_query = '';
        }



        
        if($sort!=='best'&&$sort!=='worst'){
            $query = "SELECT * FROM produkty $fraza_query $cena_query $kategoria_query $sort_query";
        }
        else{
            
        }
        require_once '../inc/connection.php';
        if($result = $con->query($query)){
            if($result->num_rows>0){
                $wyniki = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode($wyniki);
            }
            else{
                echo 'brak';
            }
        }
        else{
            exit();
        }
    }
    else{
        exit();
    }