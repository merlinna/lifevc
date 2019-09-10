<?php  
	
	include "conn.php";

	$resultgoods=$conn->query("select * from goods");

	$goodlist=array();

	for ($i=0; $i < $resultgoods->num_rows; $i++) { 
		$goodlist[$i]=$resultgoods->fetch_assoc();
	}
	echo json_encode($goodlist);
?>