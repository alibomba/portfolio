<?php
    include 'inc/account-class.php';
    require_once 'inc/connection.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    session_start();
    $idkonta = $_SESSION['idkonta'];
    $query = "SELECT * FROM users WHERE userid='$idkonta'";
    if($result = $con->query($query)){
        $row = $result->fetch_assoc();
        $konto = new Account($row['userid'],$row['imie'],$row['nazwisko'],$row['email'],$row['dob'],$row['data_dolaczenia'],$row['profilowe'],$row['znajomi'],$row['opis'],$row['nr_tel'],$row['kontakt_email'],$row['miasto_zamieszkania'],$row['kraj_zamieszkania'],$row['szkola'],$row['praca'],$row['miasto_urodzenia'],$row['kraj_urodzenia'],$row['dwuetapowa'],$row['kod_z_maila'],$row['unread_notis']);
    }
    else{
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
    $userid = $konto->userid;

    $kod = rand(111111,999999);
    $query = "UPDATE users SET kod_z_maila='$kod' WHERE userid='$userid'";
    if(!$con->query($query)){
        echo 'Błąd bazy danych nr '.$con->connect_errno;
        exit();
    }
    try{
        $mail = new PHPMailer();

        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth = true;
        $mail->Username = 'wojci.bro@gmail.com';
        $mail->Password = 'byxbyrlzuvzvwszd';
        $mail->CharSet = 'UTF-8';
        $mail->setFrom('no-reply@meetpad.com', 'Meetpad');
        $mail->addAddress($konto->email);
        $mail->addReplyTo('biuro@meetpad.com', 'Biuro');

        $mail->isHTML(false);
        $mail->Subject = 'Twój kod weryfikacyjny Meetpad.';

        $message = 'Twój kod weryfikacyjny do włączenia lub wyłączenia wieloskładnikowego uwierzytelniania na Twoim koncie w serwisie Meetpad jest następujący: '.$kod.'';

        $mail->Body = $message;

        $mail->send();
        $message = 'Mail został wysłany.';
    }catch(Exception $e){
        echo "Błąd wysyłania maila: {$mail->ErrorInfo}";
        $message = 'Błąd wysyłania maila!';
    }


    echo $message;
