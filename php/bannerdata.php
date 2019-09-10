<?php  
	
	include "conn.php";


	$resultbanner=$conn->query("select * from bannerpic");

	$bannerpic=array();
	
	for ($i=0; $i < $resultbanner->num_rows; $i++) { 
		$bannerpic[$i]=$resultbanner->fetch_assoc();
	}
	echo json_encode($bannerpic);

?>