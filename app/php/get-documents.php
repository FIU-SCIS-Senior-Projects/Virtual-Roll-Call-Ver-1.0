<?php
//Aids with debugging PHP: Need to remove in production environment
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('DBHandler.php');
$connection = new DBHandler();
$result = $connection->getDocuments();
die(json_encode($result));