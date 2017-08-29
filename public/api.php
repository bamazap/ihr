<?php

session_start();

require "../db.php"; // login credentials & secret
require "./vendor/php_crud_api.php";
require './vendor/php_api_auth.php';

$auth = new PHP_API_AUTH(array(
	"authenticator" => function($user, $pass) {
    // hardcoded list of legal usernames because I'm lazy and time-pressed
    // make this more robust for future years
    // d-entry is special admin account (can see all votes but can't vote)
    $users = array("d-entry", "barryam3", "andytsai", "jannycai");
    if (in_array($user, $users)) {
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
    // disallow operations if user is not logged in
    return !empty($_SESSION["user"]);
  },

  "before" => function(&$cmd, &$db, &$tab, &$id, &$in) {
    // add current user to vote creates
    $in = (object) $in;
    if ($tab == "votes" && $cmd == "create") {
      $in->username = $_SESSION["user"];
    } 
  },

  'record_filter' => function($cmd, $db, $tab) {
    // users can only see their own votes
    if ($cmd == "list" && $tab == "votes" && $_SESSION["user"] != "d-entry") {
      $filter = sprintf("username,eq,%s", $_SESSION["user"]);
      return array($filter);
    }
  },

  "input_validator" => function($cmd, $db, $tab, $col, $typ, $val, $ctx) {
    // don't let d-entry vote
    if (
      $cmd != "list" &&
      $cmd != "read" &&
      $tab == "votes" &&
      $_SESSION["user"] == "d-entry"
    ) {
      return false;
    }
    // only let d-entry modify people
    if (
      $cmd != "list" &&
      $cmd != "read" &&
      $tab == "people" &&
      $_SESSION["user"] != "d-entry"
    ) {
      return false;
    }
    // Make sure votes can't go beyond limits
    // Be sure to update this in the front end if you change it
    if ($cmd == "update" && $tab == "votes" && $col == "value") {
      return ($val <= 2 && $val >= -2);
    }
    return true;
  },
));
$api->executeCommand();

?>
