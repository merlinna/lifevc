<?php
header('content-type:text/html;charset=utf-8');
require 'conn.php';
//判断用户是否存在数据库，需要获取后台数据
    if(isset($_POST['checkname'])){
        $username=$_POST['checkname'];
        $result=$conn->query("select * from users where user='$username' ");
        if($result->fetch_assoc()){//存在
            echo true; //1
        }else{//不存在
            echo false; //空隙
        }
    }
//前端传入数据
if(isset($_POST['submit'])){
    $name=$_POST['inpMobile'];
    $pass=sha1($_POST['inpPwd']);
    //表单数据传入到数据库
    $conn->query("insert users values(null,'$name','$pass',NOW())");
    //提交后，跳转页面
    header('location:http://10.31.157.28/js1907/project/src/index.html');
}