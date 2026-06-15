<?php
// Nur POST-Anfragen verarbeiten
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: kontakt.html');
    exit;
}

$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(strip_tags($_POST['email']   ?? ''));
$telefon = trim(strip_tags($_POST['telefon'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

// Header-Injection verhindern
$name    = preg_replace('/[\r\n\t]/', '', $name);
$email   = preg_replace('/[\r\n\t]/', '', $email);
$telefon = preg_replace('/[\r\n\t]/', '', $telefon);

// Pflichtfelder und E-Mail-Adresse validieren
if (!$name || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: kontakt.html?status=fehler');
    exit;
}

$to      = 'info@lichttechnik-vertrieb.de';
$subject = '=?UTF-8?B?' . base64_encode('Kontaktanfrage von ' . $name) . '?=';

$body  = "Name: {$name}\n";
$body .= "E-Mail: {$email}\n";
if ($telefon) {
    $body .= "Telefon: {$telefon}\n";
}
$body .= "\nNachricht:\n{$message}";

// From = eigene Domain (wichtig für 1&1 Spam-Filter)
// Reply-To = Kundenadresse, damit Antwort direkt an Kunden geht
$headers  = "From: info@lichttechnik-vertrieb.de\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$gesendet = @mail($to, $subject, $body, $headers);
header('Location: kontakt.html?status=' . ($gesendet ? 'erfolg' : 'fehler'));
exit;
