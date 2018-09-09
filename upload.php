<?php
/**
 * Created by PhpStorm.
 * User: Hollyphat
 * Date: 11/15/2017
 * Time: 11:01 AM
 */
header("Access-Control-Allow-Origin: *");
require_once "api.php";
// Set new file name
$new_image_name = uniqid().$_FILES['file']['name'];

// upload file
move_uploaded_file($_FILES["file"]["tmp_name"], 'upload/'.$new_image_name);
$img_src = "upload/$new_image_name";

echo $new_image_name;

if(isset($_REQUEST['submit_assignment'])){
    $a['assignment_id'] = $_REQUEST['assignment_id'];
    $a['matric'] = $_REQUEST['matric'];
    $a['assignment'] = $new_image_name;
    $a['date_submitted'] = time();

    $in = $db->prepare("INSERT INTO assignment_submit(assignment_id,matric,date_submitted,assignment) VALUES (:assignment_id,:matric,:date_submitted,:assignment)");
    $in->execute($a);
    $in->closeCursor();
}