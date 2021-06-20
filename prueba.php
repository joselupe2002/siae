<?php
$data = 'http://ourcodeworld.com';
// Tamaño de QRCode
$size = '100x100';
// Ruta a la imagen (web o local)
$logo = 'imagenes/empresa/logoqr.png';

// Obten la imagen del código QR de la API de Google Chart
// http://code.google.com/apis/chart/infographics/docs/qr_codes.html
$QR = imagecreatefrompng('https://chart.googleapis.com/chart?cht=qr&chld=H|1&chs='.$size.'&chl='.urlencode($data));

// EMPEZAR A DIBUJAR LA IMAGEN EN EL CÓDIGO QR
$logo = imagecreatefromstring(file_get_contents($logo));
$QR_width = imagesx($QR);
$QR_height = imagesy($QR);
$logo_width = imagesx($logo);
$logo_height = imagesy($logo);

// Escale el logotipo para que quepa en el código QR
$logo_qr_width = $QR_width/2.5;
$scale = $logo_width/$logo_qr_width;
$logo_qr_height = $logo_height/$scale;

imagecopyresampled($QR, $logo, $QR_width/3, $QR_height/3+8, 0, 0, $logo_qr_width, $logo_qr_height, $logo_width, $logo_height);

// END OF DRAW

/**
  * Como este ejemplo es un ejemplo simple de PHP, devuelva
  * una respuesta de imagen.
  *
  * Nota: puede guardar la imagen si lo desea.
 */
header('Content-type: image/png');
imagepng($QR);
imagedestroy($QR);

// Si decide guardar la imagen en algún lugar, elimine el encabezado y use en su lugar:
// $savePath = "/path/to-my-server-images/myqrcodewithlogo.png";
// imagepng($QR, $savePath);
?>