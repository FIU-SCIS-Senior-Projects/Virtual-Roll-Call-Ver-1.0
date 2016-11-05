<?php
//Aids with debugging PHP: Need to remove in production environment
error_reporting(E_ALL);
ini_set('display_errors', 1);

$result=move_uploaded_file($_FILES['file']['tmp_name'],'../../views/img/badge.gif');