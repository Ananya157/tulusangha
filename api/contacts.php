<?php
header("Access-Control-Allow-Origin: *");

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
      $email = $_GET['email'];
      $query = "SELECT Name FROM `Members` WHERE Email = '$email'"; 
      $result = mysqli_query($con, $query);
      if($result ->num_rows > 0){
          echo "Email already exists in our database.";
          break;
      }else{
        echo "Email does not exists in our database.";
          break; 
      }
    case 'POST':
      $name = $_POST['name'];
      $spouseName = $_POST['spouseName'];
      $address = $_POST['address'];
      $city = $_POST['city'];
      $state = $_POST['state'];
      $zip = $_POST['zipcode'];
      $memType = $_POST['type'];
      $email = $_POST['email'];
      $phone = $_POST['phone'];
      $pMethod = $_POST['pay']; 
      $sql = "INSERT INTO `Members`(`Name`, `SpouseName`, `Address`, `City`, `ZiP`, `Email`, `Phone`, `P-Method`, `State`, `MemType`) values ('$name', '$spouseName', '$address', '$city', '$zip', '$email', '$phone', '$pMethod', '$state', '$memType')"; 
      mysqli_query($con, $sql);
      echo "Data Added";
      break;  
}
