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

    if(!isset($_GET['id'])){
        header('Location: homepage');
        exit();
    }
    $id = htmlspecialchars($_GET['id']);

    $query = "SELECT * FROM pakiety WHERE id='$id'";
    require_once 'inc/connection.php';
    if($result=$con->query($query)){
        $produkt = $result->fetch_assoc();
    }
    else{
        echo 'Bład bazy danych nr '.$con->connect_errno;
        exit();
    }
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $produkt['miasto']; ?> - Produkt</title>
    <link rel="icon" href="img/logo.png">
    <link rel="stylesheet" href="css/generic.css">
    <link rel="stylesheet" href="css/package.css">
    <script src="scripts/generic.js" defer></script>
    <script src="scripts/kup.js" defer></script>
</head>
<body>
    <?php include 'inc/header.php'; ?>
    <main>
        <img class="image" src="img/packages/<?php echo $produkt['miasto']; ?>.jpg" alt="<?php echo $produkt['miasto']; ?>">
        <div class="right">
            <div class="right__top">
                <img class="flag" src="img/flags/<?php echo $produkt['kraj']; ?>.svg" alt="<?php echo $produkt['kraj']; ?> flaga">
                <div class="right__top__right">
                    <div class="right__title"><?php echo $produkt['miasto']; ?></div>
                    <div class="right__kraj"><?php echo $produkt['kraj']; ?></div>
                </div>
            </div>
            <p class="right__opis"><?php echo $produkt['opis']; ?></p>
            <p class="right__cena"><span class="bold">Cena:</span> <?php echo $produkt['cena'].'zł'; ?></p>
            <button class="right__button" onclick="kupPakiet(event,<?php echo $produkt['id']; ?>)">Kup</button>
            <p class="right__error"></p>
        </div>
    </main>
    <?php include 'inc/footer.php'; ?>
</body>
</html>