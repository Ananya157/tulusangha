<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$host = "mysql"; 
$user = "AataDB21"; 
$password = "AataDB21@"; 
$dbname = "db_aata"; 
$email = '';

$con = mysqli_connect($host, $user, $password,$dbname);
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

switch ($method) {
    case 'GET':
      $sql = "select *, `P-Method` as PaymentMethod from `Members`"; 
      $result = mysqli_query($con, $sql);
      $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }
        print json_encode($rows); 
      break;
    default:
      echo 'Wrong access';
      break;
}
?>