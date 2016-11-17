<?php
//Aids with debugging PHP: Need to remove in production environment
error_reporting(E_ALL);
ini_set('display_errors', 1);

$fileName = $_GET['upload_name'];
header('Content-Type: force-download');
header('Content-Disposition: attachment; filename="' . $fileName . '"');
readfile('uploads/' . $fileName);
