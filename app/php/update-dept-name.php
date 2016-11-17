<?php
//Aids with debugging PHP: Need to remove in production environment
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('DBHandler.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name = $request->name;
$connection = new DBHandler();
$result = $connection->updateDeptName($name);
//convert the response to a json object
die(json_encode($result));