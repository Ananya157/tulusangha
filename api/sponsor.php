<?php
header("Access-Control-Allow-Origin: *");

$host = "mysql"; 
$user = "AataDB21"; 
$password = "AataDB21@"; 
$dbname = "db_aata"; 


$con = mysqli_connect($host, $user, $password,$dbname);
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

switch ($method) {
    case 'GET':
      $query = "SELECT * FROM `Sponsors`"; 
      $result = mysqli_query($con, $query);
      echo "Working";
      break;
    case 'POST':
      $name = $_POST['name'];
      $address = $_POST['address'];
      $city = $_POST['city'];
      $state = $_POST['state'];
      $zip = $_POST['zipcode'];
      $email = $_POST['email'];
      $phone = $_POST['phone'];
      $pMethod = $_POST['pay']; 
      $amount = $_POST['amount'];
      $sponsorPurpose = $_POST['type'];
      $sql = "INSERT INTO `Sponsors`(`Name`, `Address`, `City`, `ZIP`, `Email`, `Phone`, `P-Method`, `State`, `SponsorPurpose`, `Amount`) values ('$name', '$member', '$address', '$city', '$zip', '$email', '$phone', '$pMethod', '$state', '$sponsorPurpose', '$amount')"; 
      $eLog="/tmp/mailError.log";
      //Get the size of the error log
      //ensure it exists, create it if it doesn't
      $fh= fopen($eLog, "a+");
      fclose($fh);
      $originalsize = filesize($eLog);
      //Details to send an email to the member who registers. Note to remember is that in the current server we can only send 250 emails per day.
      $message_line1 = "Thank you for your sponsorship to All America Tulu Association.\n"; 
      
      if($pMethod == 'zelle'){
        $message_line2 = "\nPlease transfer the sponsorship amount through zelle to the ID: aatana.ec@gmail.com. Please find the entered details below:\n";
      }
      elseif($pMethod == 'cheque')
      {
        $message_line2 = "\nPlease send the sponsorship amount through check to the address:\nAll America Tulu Association \n2 Atwood Ln Andover MA 01810. \n\nPlease write your cheque to \"All America Tulu Association\". \n\n\nPlease find the entered details below:\n";
      }
      elseif($pMethod == 'paypal')
      {
        $message_line2 = "\nYour sponsorship is via Paypal. Please find the entered details below:\n";
      }
      $message_line3 = "Name: ".$name."\n"."Address: ".$address."\n"."City: ".$city."\n"."State: ".$state."\n"."ZipCode: ".$zip."\n"."Sponsor Purpose: ".$sponsorPurpose."\n"."Email: ".$email."\n"."Phone: ".$phone."\n"."Payment Method: ".$pMethod."\n"."Amount: ".$amount."\n";
      $message_line4 = "\n\nFor any further questions please contact us at aatana.ec@gmail.com\n";

      $message_body = $message_line1.$message_line2.$message_line3.$message_line4;

      //Data is being added
      mysqli_query($con, $sql);
      echo "Data Added";
      

      $to = $email;
      $subject = "AATA sponsorship details of ".$name;
      
      //Email sent
      mail($to, $subject, $message_body, "Cc:aatana.ec@gmail.com, subhasshetty@gmail.com");

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
