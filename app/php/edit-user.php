<?php
//Aids with debugging PHP: Need to remove in production environment
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('DBHandler.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;
$first_name = $request->fName;
$last_name = $request->lName;
$username = $request->username;
$role = $request->role;
$connection = new DBHandler();
$result = $connection->editUser($id, $first_name, $last_name, $username, $role);
//convert the response to a json object
die(json_encode($result));