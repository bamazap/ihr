<?php

require "../db.php"; // login credentials
require "./vendor/php_crud_api.php";

$api = new PHP_CRUD_API(array(
  "dbengine"=>"MySQL",
  "hostname"=>$hostname,
  "username"=>$username,
  "password"=>$password,
  "database"=>$database,
  "charset"=>"utf8"
));
$api->executeCommand();

?>
