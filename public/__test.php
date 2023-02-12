<?php

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

  $jsonStringObject = file_get_contents("php://input");
  $phpObject = json_decode($jsonStringObject);
  // $phpObject["name"]
  $newJsonStringObject = json_encode($phpObject);
  header('Content-Type: application/json');
  echo $newJsonString;

  $jsonString = file_get_contents('fingerprints.json');
  $data = json_decode($jsonString, true);
  $newJsonString = json_encode($phpObject);
  file_put_contents('fingerprints.json', $newJsonStringObject);
?>
