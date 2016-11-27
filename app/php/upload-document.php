<?php
require_once('DBHandler.php');
$document_name = $_FILES['document']['name'];
$tmp_doc_name = $_FILES['document']['tmp_name'];
$new_name = $_POST['document_name'];
$doc_extension = pathinfo($document_name,PATHINFO_EXTENSION);
$category_id = $_POST['category_id'];
$uploaded_by = $_POST['uploaded_by'];
if(isset($_POST['pinned']) && $_POST['pinned'] == '1'){
    $pinned = 1;
}else{
    $pinned = 0;
}
$upload_date = date('Y-m-d');

$ds = DIRECTORY_SEPARATOR;
$target_path = __DIR__.$ds.'uploads'.$ds.$document_name;

move_uploaded_file($tmp_doc_name, $target_path);

$connection = new DBHandler();

$result = $connection->addDocument($new_name, $category_id, $upload_date, $pinned, $uploaded_by, $document_name);
//convert the response to a json object
//die(json_encode($result));
//!!!!!IMPORTANT CHANGE TO RELEVANT URL !!!!!!
//header("Location: http://localhost:8888/Virtual-Roll-Call-Ver-1.0/app/php/supervisor-profile.php#/upload",TRUE,303);