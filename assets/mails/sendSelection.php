<?php
    $payload = file_get_contents("php://input");
    $data = json_decode($payload);
    $data = (array) $data;

    $from = $data["from"];
    $to = $data["to"];
    $message = $data["message"];

    $subject = 'Osinum - Votre sélection d\'outils libres';
    $headers = "MIME-version: 1.0\r\n".'Date: '.date('r')."\r\n";
    $headers .= "From: " . $from . " \r\n"."Reply-To: Adrien <adrien@collectifbam.fr> \r\n"."Content-Type: text/html; charset=utf-8 \r\n";

    try {
      mail($to, $subject, $message, $headers);
    } catch (Exception $error) {
      $alert['error'] = "The form could not be sent";
      echo $alert;
    }
