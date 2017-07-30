<?php

require "../db.php"; // login credentials
require "../vendor/mevdschee/php-crud-api/api.php";

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
