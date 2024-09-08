<?php


// Incluye el archivo autoload de Composer
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Responder a las solicitudes preflight (preliminares)
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}
$response = ['status' => 'error', 'message' => ''];

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP(); 
        $mail->Host = $_ENV['EMAIL_HOST']; 
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER']; 
        $mail->Password = $_ENV['EMAIL_PASS']; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        $mail->setFrom($_ENV["SET_FROM"], $_ENV["NAME_SET_FROM"]);
        $mail->addAddress($_ENV["ADD_ADDRESS"], $_ENV["NAME_ADD_ADDRESS"]); 

        $mail->isHTML(true);
        $mail->Subject = 'Nuevo mensaje de contacto';
        $mail->Body    = 'Email: ' . htmlspecialchars($data['email']) . ' <br> ' .
                        'Asunto: ' . htmlspecialchars($data['issue']) . ' <br> ' .
                        'Mensaje: ' . nl2br(htmlspecialchars($data['text']));

        $mail->send();
        $response['status'] = 'success';
        $response['message'] = 'El mensaje ha sido enviado.';
    } catch (Exception $e) {
        $response['message'] = "No se pudo enviar el mensaje. Mailer Error: {$mail->ErrorInfo}";
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}