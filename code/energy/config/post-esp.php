<?php
include "login.php";
date_default_timezone_set('Asia/Jakarta');
$update_time = date("Y-j-M H:i:s");
$api_key_value = "tPmAT5Ab3j7F9";
$api_key= $Volt = $Frek = $Amper = $Watt = $status = $kwh = $biaya = $pilih = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);
            $Volt = test_input($_POST['volt']);
            $Frek = test_input($_POST['frek']);
            $Amper = test_input($_POST['amper']);
            $Watt = test_input($_POST['watt']);
            $status = test_input($_POST['status']);
            $kwh = test_input($_POST['kwh']);
            $biaya = test_input($_POST['biaya']);
            $simpan = mysqli_query($konek, "INSERT INTO t_energy(Volt,Frek,Amper,watt,update_time,status,kwh,biaya)VALUES('$Volt','$Frek','$Amper','$Watt',' $update_time','$status','$kwh','$biaya')");

}
else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}