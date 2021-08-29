<?php 
// Load the database configurations
$host = "mysql"; 
$user = "AataDB21"; 
$password = "AataDB21@"; 
$dbname = "db_aata"; 
$email = '';

$con = mysqli_connect($host, $user, $password,$dbname);
 
// Filter the excel data 
function filterData(&$str){ 
    $str = preg_replace("/\t/", "\\t", $str); 
    $str = preg_replace("/\r?\n/", "\\n", $str); 
    if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"'; 
} 
 
// Excel file name for download 
$fileName = "members-data_" . date('Y-m-d') . ".xls"; 
 
// Column names 
$fields = array('ID', 'Name', 'Spouse Name', 'Address', 'City', 'ZiP', 'Email', 'Phone', 'Payment Method', 'State', 'MemType', 'Amount'); 
 
// Display column names as first row 
$excelData = implode("\t", array_values($fields)) . "\n"; 
 
// Fetch records from database 
$query = $con->query("select *, `P-Method` as PaymentMethod from `Members`"); 
if($query->num_rows > 0){ 
    // Output each row of the data 
    while($row = $query->fetch_assoc()){ 
        $lineData = array($row['ID'], $row['Name'], $row['SpouseName'], $row['Address'], $row['City'], $row['ZiP'], $row['Email'], $row['Phone'], $row['PaymentMethod'], $row['State'], $row['MemType'], $row['Amount']); 
        array_walk($lineData, 'filterData'); 
        $excelData .= implode("\t", array_values($lineData)) . "\n"; 
    } 
}else{ 
    $excelData .= 'No records found...'. "\n"; 
} 
 
// Headers for download 
header("Content-Type: application/vnd.ms-excel"); 
header("Content-Disposition: attachment; filename=\"$fileName\""); 
 
// Render excel data 
echo $excelData; 
 
exit;