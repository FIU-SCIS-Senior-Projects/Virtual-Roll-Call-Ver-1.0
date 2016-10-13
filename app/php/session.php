<?php
session_start();

//get params from either get or post request
$params = $_GET ? $_GET : $_POST;

//get id, username, and role from query string 
$id = $params['id'];
$name = $params['name'];
$role = $params['role'];

//route according to role
switch ($role){

	case 'Administrator':
	$_SESSION['id'] = $id;
	$_SESSION['name'] = $name;
	header('location: admin-profile.php');
	exit;
	break;

	case 'Supervisor':
	$_SESSION['id'] = $id;
	$_SESSION['name'] = $name;
	header('location: supervisor-profile.php');
	exit;
	break;

	case 'Officer':
	$_SESSION['id'] = $id;
	$_SESSION['name'] = $name;
	header('location: officer-profile.php');
	exit;
	break;
}