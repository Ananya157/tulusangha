<?php
$host = "mysql"; 
$user = "AataDB21"; 
$password = "Aata2021@"; 
$dbname = "db_aata"; 
$port = 3306;
$email = '';

$con = mysqli_connect($host, $user, $password,$dbname, $port);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
    case 'GET':
      $email = $_GET['email'];
      $sql = "select * from Members".($email?" where email=$email":''); 
      break;
    case 'POST':
      $name = $_POST["name"];
      $spouseName = $_POST["spouseName"];
      $address = $_POST["address"];
      $city = $_POST["city"];
      $state = $_POST["state"];
      $zip = $_POST["zip"];
      $memType = $_POST["memType"];
      $email = $_POST["email"];
      $phone = $_POST["phone"];
      $pMethod = $_POST["pMethod"];
      $query = "SELECT email FROM Members WHERE email =$email";
      $result = $database->query($query);
      if($result ->num_rows){
          echo "Email already exists in our database.";
          break;
      }else{
          $sql = "insert into Members (Name,SpouseName, Address, City, State, ZIP, MemType, Email, Phone, P-Method) values ('$name', '$spouseName', '$address', '$city', '$state', '$zip', '$memType', '$email', '$phone', '$pMethod')";
          break; 
      }
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($method == 'GET') {
    if (!$email) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$email) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

$con->close();