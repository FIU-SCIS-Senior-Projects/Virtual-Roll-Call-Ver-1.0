<?php
//Aids with debugging PHP: Need to remove in production environment
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('DbHandler.php');
$connection = new DBHandler();
$result = $connection->getOfficers();
die(json_encode($result));