<?php
    $payload = file_get_contents("php://input");
    $data = json_decode($payload);
    $data = (array) $data;

    $email = $data["email"];
    $message = $data["message"];

    $to = 'adrien.payet@outlook.com';
    $subject = 'Votre sélection';

    try {
      mail($to, $subject, $message);
    } catch (Exception $error) {
      $alert['error'] = "The form could not be sent";
      echo $alert;
    }
