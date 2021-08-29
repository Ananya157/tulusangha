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
      echo "Email: " . $email;
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
      $eLog="/tmp/mailError.log";
      //Get the size of the error log
      //ensure it exists, create it if it doesn't
      $fh= fopen($eLog, "a+");
      fclose($fh);
      $originalsize = filesize($eLog);
      //Details to send an email to the member who registers. Note to remember is that in the current server we can only send 250 emails per day.
      $message_line1 = "Thank you for joining the All America Tulu Association. Please find the details you have entered below \n"; 
      $message_line2 = "Name: ".$name."\n"."Spouse Name: ".$spouseName."\n"."Address: ".$address."\n"."City: ".$city."\n"."State: ".$state."\n"."ZipCode: ".$zip."\n"."Membership Type: ".$memType."\n"."Email: ".$email."\n"."Phone: ".$phone."\n"."Payment Method: ".$pMethod."\n";
      if($pMethod == 'zelle'){
        $message_line3 = "\nPlease transfer the amount corresponding to your membership as a ".$memType." ,through zelle to the ID: aatana.ec@gmail.com . Your membership will be confirmed once we receive your payment.\n";
      }
      elseif($pMethod == 'cheque')
      {
        $message_line3 = "\nPlease send the amount corresponding to your membership as a ".$memType.",through check to the address:\nAll America Tulu Association \n2 Atwood Ln Andover MA 01810. \nPlease write your cheque to \"All America Tulu Association\". \nYour membership will be confirmed once we receive your payment.\n";
      }
      elseif($pMethod == 'paypal')
      {
        $message_line3 = "\nThank you far your payment via Paypal. Your membership will be confirmed once we verify your payment.\n";
      }

      $message_line4 = "\n\nFor any further questions please contact us at aatana.ec@gmail.com\n";

      $message_body = $message_line1.$message_line2.$message_line3.$message_line4;

      //Data is being added
      mysqli_query($con, $sql);
      echo "Data Added";
      

      $to = $email;
      $subject = "AATA membership details of ".$name;
      
      //Email sent
      mail($to, $subject, $message_body);

      /*
      * NOTE: PHP caches file status so we need to clear
      * that cache so we can get the current file size
      */

      clearstatcache();
      $finalsize = filesize($eLog);
      //Check if the error log was just updated
      if ($originalsize != $finalsize) {
        print "Problem sending mail. (size was $originalsize, now $finalsize) See $eLog
        ";
        } else {
        print " Mail sent to $email";
        }
      
      break;  
}

?>
