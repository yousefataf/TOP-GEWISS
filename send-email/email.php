<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars(strip_tags($_POST["name"]));
  $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
  $phone = htmlspecialchars(strip_tags($_POST["phone"]));
  $message = htmlspecialchars(strip_tags($_POST["msg"]));

  if (!empty($name) && !empty($email) && !empty($phone) && !empty($message)) {
    $mail = new PHPMailer(true);
    try {
      $mail->isSMTP();
      $mail->Host = 'smtp.gmail.com';
      $mail->SMTPAuth = true;
      $mail->Username = 'your_email@gmail.com'; // استبدل ببريدك
      $mail->Password = 'your_password'; // استبدل بكلمة المرور
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
      $mail->Port = 587;

      $mail->setFrom($email, $name);
      $mail->addAddress('Info@topgewiss.com'); // البريد المستلم

      $mail->Subject = 'New Contact Form Submission';
      $mail->Body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";

      $mail->send();
      echo "Message sent successfully!";
    } catch (Exception $e) {
      echo "Error sending message: {$mail->ErrorInfo}";
    }
  } else {
    echo "Please fill in all fields!";
  }
} else {
  echo "Invalid request method!";
}
?>