<?php  
	
	require "conn.php";
	
	if(isset($_GET['sid'])){ //先判断是否存在
		$id=$_GET['sid'];
		$result=$conn->query("select * from goods where sid=$id ");
	
		$wronglist=$result->fetch_assoc();
		
		echo json_encode($wronglist);

	} 
	
	

?>