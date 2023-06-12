<a href="profile?user=<?php echo $znajobj->userid; ?>">
    <div class="friend-component">
        <img class="pfp friend-component__pfp" src="img/pfp/default.png" alt="<?php echo $znajobj->full_name(); ?>'s profile picture">
        <div class="friend-component__text">
            <p class="friend-component__surname"><?php echo $znajobj->full_name(); ?></p>
            <p class="friend-component__wspolni-znajomi"><?php echo count($znajobj->wspolni_znajomi($konto,$con)); ?> wspolnych znajomych</p>
        </div>
    </div>
</a>