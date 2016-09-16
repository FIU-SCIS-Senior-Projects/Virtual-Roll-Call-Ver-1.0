<?php

//MOCK DATA//

//database response will include array with user data or array with null values if user not found
$arr = array('username' => 'ivana', 'password' => 'ivana2', 'role' => 'officer');

//exits and returns JSON string equivalent of $arr
die(json_encode($arr));

?>