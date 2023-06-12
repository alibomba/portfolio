<?php
    include_once 'inc/comment-class.php';
    $postid = $postobj[$index]->postid;
    $query = "SELECT ukryty_dla FROM posts WHERE postid='$postid'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $result = $row['ukryty_dla'];
        $array = explode(',',$result);
        if(array_search($konto->userid,$array)!==false){
            $hidden = true;
        }
        else{
            $hidden = false;
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }

    $query = "SELECT * FROM users";
    if($result = $con->query($query)){
        $accounts = $result->fetch_all(MYSQLI_ASSOC);
        $mentioned_ids = [];
        foreach($accounts as $account){
            $mention = '@'.$account['imie'].' '.$account['nazwisko'];
            $position = strpos($postobj[$index]->tresc, $mention);
            if($position !== false){
                $mentioned_ids[] = [
                    'id' => $account['userid'],
                    'mention' => $mention
                ];
            }
        }
        if(count($mentioned_ids)!==0){
            foreach($mentioned_ids as $mention){
                $postobj[$index]->tresc = str_replace($mention['mention'],'<a href="profile?user='.$mention['id'].'" class="mention-link">'.$mention['mention'].'</a>',$postobj[$index]->tresc);
            }
        }
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
?>
<section <?php if($hidden===true){ echo 'style="display:none;"'; } ?> class="post" id="post-<?php echo $postobj[$index]->postid; ?>">
            <header class="post__header">
                <div class="post__author-info">
                    <img class="pfp" src="<?php echo $postobj[$index]->prof; ?>" alt="<?php echo $postobj[$index]->autor; ?>'s profile picture">
                    <div class="post__author-info__text">
                        <h2><a class="post__author" href="profile?user=<?php echo $postobj[$index]->idautora; ?>"><?php echo $postobj[$index]->autor; ?></a></h2>
                        <div class="post__author-info__text__bottom">
                            <p class="post__time-ago"><?php echo $postobj[$index]->get_ago(); ?></p>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path class="public-icon" d="<?php echo $postobj[$index]->get_privacy_icon(); ?>"/></svg>
                            <div class="date-tooltip"><?php echo $postobj[$index]->get_date_tooltip(); ?></div>
                        </div>
                        <span class="post__location"><?php if($postobj[$index]->lokalizacja !== ''){
                            echo $postobj[$index]->lokalizacja;
                        } ?></span>
                        <div class="profile-overview">
                            <img src="<?php echo $postobj[$index]->prof; ?>" alt="<?php echo $postobj[$index]->autor; ?>'s profile picture" class="pfp pfp--overview">
                            <div class="profile-overview__right">
                                <p class="profile-overview__author"></p>
                                <p class="profile-overview__znajomi"></p>
                                <p class="profile-overview__wspolni-znajomi"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="more-icon" src="img/icons/more-icon.png" alt="more icon (three dots)">
                <div class="post-options">
                    <svg class="options-dropdown-close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    <?php
                        if($postobj[$index]->idautora == $konto->userid){
                            echo <<< END
                                <button class="post-options__button post-edit-button">
                                <img src="img/icons/edit-icon.svg" alt="edit icon">
                                Edytuj post
                                </button>
                                <button class="post-options__button private-change-button">
                                    <img src="img/icons/planet-icon.svg" alt="planet icon">
                                    Zmień widoczność
                                </button>
                                <button class="post-options__button save-post-button">
                                <img src="img/icons/bookmarks-icon.svg" alt="bookmarks icon">
                                END;
                                

                                $idposta = $postobj[$index]->postid;
                                $userid = $konto->userid;
                                $query = "SELECT bookmarkid FROM bookmarks WHERE idzapisujacego='$userid' AND idposta='$idposta'";
                                if($result = $con->query($query)){
                                    if($result->num_rows>0){
                                        echo '<span class="save-button__content">Usuń z zapisanych</span>';
                                    }   
                                    else{
                                        echo '<span class="save-button__content">Zapisz post</span>';
                                    }
                                }
                                else{
                                    echo 'Błąd bazy danych nr '.$con->connect_errno;
                                    exit();
                                }

                            echo <<< END
                            </button>
                            <button class="post-options__button hide-post-button">
                                <img src="img/icons/hidden-password-icon.svg" alt="hide post icon">
                                Ukryj post
                            </button>
                            <button class="post-options__button delete-post-button">
                                <img src="img/icons/delete-icon.svg" alt="delete icon">
                                Usuń post
                            </button>
                            END;
                        }
                        else{
                            echo <<< END
                            <button class="post-options__button save-post-button">
                            <img src="img/icons/bookmarks-icon.svg" alt="bookmarks icon">
                            END;
                            $idposta = $postobj[$index]->postid;
                            $userid = $konto->userid;
                            $query = "SELECT bookmarkid FROM bookmarks WHERE idzapisujacego='$userid' AND idposta='$idposta'";
                            if($result = $con->query($query)){
                                if($result->num_rows>0){
                                    echo '<span class="save-button__content">Usuń z zapisanych</span>';
                                }
                                else{
                                    echo '<span class="save-button__content">Zapisz post</span>';
                                }
                            }
                            else{
                                echo 'Błąd bazy danych nr '.$con->connect_errno;
                                exit();
                            }
                            echo <<< END
                            </button>
                            <button class="post-options__button">
                            <img src="img/icons/notifications-icon.svg" alt="notifications icon">
                            Włącz powiadomienia
                            </button>
                            <button class="post-options__button hide-post-button">
                            <img src="img/icons/hidden-password-icon.svg" alt="hide post icon">
                            Ukryj post
                            </button>
                            <button class="post-options__button report-post-button">
                            <img src="img/icons/report-icon.svg" alt="report post icon">
                            Zgłoś post
                            </button>
                            END;
                        }
                    ?>
                </div>
                <div class="modal-overlay--report"></div>
                <div class="report-post-modal">
                    <form class="post_report_form">
                        <textarea class="report_content" placeholder="Krótko opisz problem"></textarea>
                        <input class="report_submit" type="submit" value="Zgłoś">
                    </form>
                </div>
                <div class="delete-post-modal">
                    <form class="post_delete_form">
                        <p>Czy na pewno chcesz usunąć post?</p>
                        <div class="delete-post-modal__buttons">
                            <button class="delete-confirm" type="submit">Potwierdź</button>
                            <button class="delete-cancel" type="button">Anuluj</button>
                        </div>
                    </form>
                </div>
                <div class="post-saved-popup"></div>
            </header>
            <main class="post__main">
                <div class="mention-dropdown mention-dropdown--edit"></div>
                <p class="post__content"><span class="post__content__text"><?php echo $postobj[$index]->tresc; ?></span><svg class="confirm-post-edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg><svg class="stop-editing-post" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></p>
                <?php if($postobj[$index]->obrazek !== ''){
                    echo '<img class="post__image" src="'.$postobj[$index]->obrazek.'" alt="post image">';
                } ?>
            </main>
            <footer class="post__footer">
                <div class="post__numbers">
                    <div class="post__reactions-number">
                        <div class="post__reactions-number__icons">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="like-icon" d="M19.396 20.708c-.81-.062-.733-.812.031-.953 1.269-.234 1.827-.914 1.827-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.132-.09 1.688-.764 1.688-1.41 0-.565-.425-1.108-1.261-1.22-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.667-.198-4.979-.885.907-3.657.689-8.782-1.687-8.782-1.594 0-1.896 1.807-2.375 3.469-1.718 5.969-5.156 7.062-8.687 7.603v9.928c6.688 0 8.5 3 13.505 3 3.199 0 4.852-1.735 4.852-2.666-.001-.334-.273-.572-.961-.626z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="heart-icon" d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
                        </div>
                        <span class="reaction-counter"><?php echo $postobj[$index]->get_reactions(); ?></span>
                        <div class="reactions-details">
                            <div class="reactions-details__row"><span class="like-counter"><?php echo $postobj[$index]->lajki; ?></span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="like-icon" d="M19.396 20.708c-.81-.062-.733-.812.031-.953 1.269-.234 1.827-.914 1.827-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.132-.09 1.688-.764 1.688-1.41 0-.565-.425-1.108-1.261-1.22-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.667-.198-4.979-.885.907-3.657.689-8.782-1.687-8.782-1.594 0-1.896 1.807-2.375 3.469-1.718 5.969-5.156 7.062-8.687 7.603v9.928c6.688 0 8.5 3 13.505 3 3.199 0 4.852-1.735 4.852-2.666-.001-.334-.273-.572-.961-.626z"/></svg></div>
                            <div class="reactions-details__row"><span class="heart-counter"><?php echo $postobj[$index]->serca; ?></span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="heart-icon" d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg></div>
                        </div>
                    </div>
                    <div class="post__comments-number">
                        <?php echo $postobj[$index]->komentarze; ?> komentarzy
                    </div>
                </div>
                <div class="post__interaction-buttons">
                    <div class="post__like-button--container">
                        
                        <button onclick="addLike(<?php echo $postobj[$index]->postid;echo ','; echo $konto->userid; ?>,event)" class="post__like-button 
                        <?php
                            $liked_id = $postobj[$index]->postid;
                            $liker_id = $konto->userid;
                            $query = "SELECT * FROM reakcje WHERE typ='lajk' AND liked_id = '$liked_id' AND liker_id='$liker_id'";

                            if($result = $con->query($query)){
                                if($result->num_rows>0){
                                    echo 'button--liked';
                                }
                            }
                            else{
                                echo 'Błąd bazy danych nr '.$con->connect_errno;
                                exit();
                            }

                            $query = "SELECT * FROM reakcje WHERE typ='serce' AND liked_id = '$liked_id' AND liker_id = '$liker_id'";
                            if($result = $con->query($query)){
                                if($result->num_rows>0){
                                    echo 'button--hearted';
                                }
                            }
                            else{
                                echo 'Błąd bazy danych nr '.$con->connect_errno;
                                exit();
                            }

                        ?>"><img src="img/icons/like-icon.svg" alt="like icon"> Lubię to!</button>
                        <div class="post__reactions-buttons"><svg onclick="addLike(<?php echo $postobj[$index]->postid; echo ','; echo $konto->userid; ?>,event)" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path class="like-icon" d="M19.396 20.708c-.81-.062-.733-.812.031-.953 1.269-.234 1.827-.914 1.827-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.132-.09 1.688-.764 1.688-1.41 0-.565-.425-1.108-1.261-1.22-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.667-.198-4.979-.885.907-3.657.689-8.782-1.687-8.782-1.594 0-1.896 1.807-2.375 3.469-1.718 5.969-5.156 7.062-8.687 7.603v9.928c6.688 0 8.5 3 13.505 3 3.199 0 4.852-1.735 4.852-2.666-.001-.334-.273-.572-.961-.626z"/></svg>
                        <svg onclick="addHeart(<?php echo $postobj[$index]->postid; echo ','; echo $konto->userid; ?>,event)" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path class="heart-icon" d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg></div>
                    </div>
                    <button class="post__comment-button"><img src="img/icons/comment-icon.svg" alt="comment icon"> Skomentuj</button>
                    <button class="post__share-button"><img src="img/icons/share-icon.svg" alt="share icon"> Udostępnij</button>
                </div>
            </footer>
            <div class="comments-tooltip">
                <svg class="comments__close-button" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path fill="red" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                <form class="comment-form">
                    <input type="text" placeholder="Napisz komentarz..." class="comment-input">
                    <input type="submit" value="Opublikuj" class="comment-submit">
                    <div class="mention-dropdown mention-dropdown--comment"></div>
                </form>
                <div class="comments">
                    <?php
                        $postid = $postobj[$index]->postid;
                        $query = "SELECT * FROM komentarze WHERE parentid='$postid' ORDER BY data_wstawienia DESC";
                        if($result = $con->query($query)){
                            $comments = $result->fetch_all(MYSQLI_ASSOC);
                        }
                        else{
                            echo 'Błąd bazy danych nr '.$con->connect_errno;
                            exit();
                        }
                        if($result->num_rows>0){
                            foreach($comments as $index=>$comment){
                                $commentobj[$index] = new Comment($comment['komid'],$comment['parentid'],$comment['idautora'],$comment['autor_komentarza'],$comment['prof_autora'],$comment['tresc_komentarza'],$comment['data_wstawienia'],$comment['lajki']);
                                include 'inc/comment.php';
                            }
                        }
                    ?>
                </div>
            </div>
</section>