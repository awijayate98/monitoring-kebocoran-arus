<?php
 include "login.php";
 date_default_timezone_set('Asia/Jakarta');
 $pilih = $_GET['pilih'];
 $update_time = date("Y-j-M H:i:s");
 if($pilih == 1)
 {
	$Volt = $_GET['volt'];
	$Frek = $_GET['frek'];
	$Amper = $_GET['amper'];
	$Watt = $_GET['watt'];
	$status = $_GET['status'];
	$kwh = $_GET['kwh'];
	$biaya = $_GET['biaya'];
	$simpan = mysqli_query($konek, "INSERT INTO t_energy(Volt,Frek,Amper,watt,update_time,status,kwh,biaya)VALUES('$Volt','$Frek','$Amper','$Watt',' $update_time','$status','$kwh','$biaya')");
	cek($simpan);
}elseif($pilih == 2)
 {
	$statusalat = $_GET['statusalat'];
	$simpan = mysqli_query($konek, "INSERT INTO energy_status(status_alat)VALUES('$statusalat')");
	 echo " pilih 2";
	 cek($simpan);
 }

 function cek($a)
 {
	if($a)
	echo "Berhasil";
 	else
	 echo "GAGAL DISIMPAN";


 }
?>