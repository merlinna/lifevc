<?php
require 'conn.php';
 
if(isset($_POST['user'])&&isset($_POST['password'])){
    $pass=sha1($_POST['password']);
    $user=$_POST['user'];
    $result=$conn->query("select * from users where user='$user' and password='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}