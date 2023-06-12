<?php

    $idautora = $profile->userid;
    $query = "SELECT * FROM posts WHERE idautora='$idautora' ORDER BY data_wstawienia DESC";
    if($result = $con->query($query)){
        $ile_postow = $result->num_rows;
        $posts = $result->fetch_all(MYSQLI_ASSOC);
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
    if($ile_postow>0){
        foreach($posts as $index=>$post){
            $postobj[$index] = new Post($post['postid'],$post['idautora'],$post['autor_posta'],$post['prof_autora'],$post['data_wstawienia'], $post['widocznosc'], $post['lokalizacja'],$post['tresc_posta'],$post['lajki'],$post['serca'],$post['komentarze'],$post['obrazek']);
            include 'inc/post.php';
        }
    }
