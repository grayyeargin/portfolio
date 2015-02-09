<?php
 
$to = "grayyeargin@gmail.com";
$from = $_REQUEST['email'];
$name = $_REQUEST['name'];
$headers = "From: $from";
$subject = "You have a new message!";
 
$fields = array();
$fields{"name"} = "name";
$fields{"email"} = "email";
$fields{"message"} = "message";
 
$body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){ $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }
 
$send = mail($to, $subject, $body, $headers);
 
?>

<?php
$subjectPrefix = '[Contato via Site]';
$emailTo = '<YOUR_EMAIL_HERE>';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = stripslashes(trim($_POST['form-name']));
    $email = stripslashes(trim($_POST['form-email']));
    $subject = stripslashes(trim($_POST['form-subject']));
    $message = stripslashes(trim($_POST['form-message']));
    $pattern = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

    if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $assunto)) {
        die("Header injection detected");
    }

    $emailIsValid = preg_match('/^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/', $email);

    if($name && $email && $emailIsValid && $subject && $message){
        $subject = "$subjectPrefix $subject";
        $body = "Nome: $name <br /> Email: $email <br /> Mensagem: $message";

        $headers = 'MIME-Version: 1.1' . PHP_EOL;
        $headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
        $headers .= "From: $name <$email>" . PHP_EOL;
        $headers .= "Return-Path: $emailTo" . PHP_EOL;
        $headers .= "Reply-To: $email" . PHP_EOL;
        $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;

        mail($emailTo, $subject, $body, $headers);
        $emailSent = true;
    } else {
        $hasError = true;
    }
}