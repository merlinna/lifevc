<?php  
	
	include "conn.php";


	$result=$conn->query("select * from combination");

	$combination=array();
	
	for ($i=0; $i < $result->num_rows; $i++) { 
		$combination[$i]=$result->fetch_assoc();
	}
	echo json_encode($combination);

?>