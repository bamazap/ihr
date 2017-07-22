<?php

require './db.php';
require './vendor/api.php';

$api = new PHP_CRUD_API(array(
    'dbengine'=>$dbengine,
    'hostname'=>$hostname,
    'username'=>$username,
    'password'=>$password,
    'database'=>$database,
    'charset'=>'utf8'
));
$api->executeCommand();

?>
