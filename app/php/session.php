<?php

session_start();

//get params from either get or post request
$params = $_GET ? $_GET : $_POST;

//get username and role from query string 
$username = $params['username'];
$role = $params['role'];

//route according to role
switch ($role){

	case 'admin':
	$_SESSION['user'] = $username;
	header('location: admin-profile.php');
	exit;
	break;

	case 'supervisor':
	$_SESSION['user'] = $username;
	header('location: supervisor-profile.php');
	exit;
	break;

	case 'officer':
	$_SESSION['user'] = $username;
	header('location: officer-profile.php');
	exit;
	break;
}