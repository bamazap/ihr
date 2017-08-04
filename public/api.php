<?php

require "../db.php"; // login credentials & secret
require "./vendor/php_crud_api.php";
require './vendor/php_api_auth.php';

$auth = new PHP_API_AUTH(array(
	"authenticator" => function($user, $pass) {
    if ($user == "admin" && $pass == "admin") {
      $_SESSION["user"] = $user;
    } else {
      $_SESSION["user"] = NULL;
    }
  }
));
if ($auth->executeCommand()) exit(0);

$api = new PHP_CRUD_API(array(
  "dbengine" => "MySQL",
  "username" => $username,
  "password" => $password,
  "database" => $database,
  "hostname" => $hostname,
  "charset" => "utf8",
  "table_authorizer" => function($cmd, $db, $tab) {
    return !empty($_SESSION['user']) || true;
  }
));
$api->executeCommand();

?>
