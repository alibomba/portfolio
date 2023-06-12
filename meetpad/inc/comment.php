<?php
    $query = "SELECT * FROM users";
    if($result = $con->query($query)){
        $accounts = $result->fetch_all(MYSQLI_ASSOC);
        $mentioned_ids = [];
        foreach($accounts as $account){
            $mention = '@'.$account['imie'].' '.$account['nazwisko'];
            $position = strpos($commentobj[$index]->tresc, $mention);
            if($position !== false){
                $mentioned_ids[] = [
                    'id' => $account['userid'],
                    'mention' => $mention
                ];
            }
        }
        if(count($mentioned_ids)!==0){
            foreach($mentioned_ids as $mention){
                $commentobj[$index]->tresc = str_replace($mention['mention'],'<a href="profile?user='.$mention['id'].'" class="mention-link">'.$mention['mention'].'</a>',$commentobj[$index]->tresc);
            }
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
?>
<div class="comment">
    <div class="comment__top">
        <img class="pfp" src="<?php echo $commentobj[$index]->prof; ?>" alt="<?php echo $commentobj[$index]->autor; ?>'s profile picture">
        <span class="comment__author">
            <a href="profile?user=<?php echo $commentobj[$index]->idautora; ?>"><?php echo $commentobj[$index]->autor; ?></a>
        </span>
        <span class="comment__ago"><?php echo $commentobj[$index]->get_ago(); ?></span>
    </div>
    <p class="comment__content">
        <?php echo $commentobj[$index]->tresc; ?>
    </p>
    <div class="comment__bottom">
        <span onclick="toggleCommentLike(<?php echo $commentobj[$index]->komid; echo ','; echo $konto->userid; echo ','; echo 'event'; ?>)" class="comment__like-button  
        <?php
            $liked = $commentobj[$index]->komid;
            $liker = $konto->userid;
            $query = "SELECT * FROM reakcje WHERE typ='comment-like' AND liked_id = '$liked' AND liker_id = '$liker'";
            if($result = $con->query($query)){
                if($result->num_rows>0){
                    echo 'comment-button--liked';
                }
            }
            else{
                echo 'Błąd bazy danych nr '.$con->connect_errno;
                exit();
            }
        ?>
        ">
            Lubię to! (<span class="comment__like-counter"><?php echo $commentobj[$index]->lajki; ?></span>)
        </span>
        <span class="comment__reply-button">
            Odpowiedz
        </span>
    </div>
</div>