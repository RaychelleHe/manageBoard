<?php
/**
 * Created by PhpStorm.
 * User: zwq
 * Date: 2019/2/27
 * Time: 15:27
 */
include "conn.php";
$name =$_POST['name'];
$press =$_POST['press'];
$price =$_POST['price'];
$number =$_POST['number'];
$sql ="insert into book(name,press,price,number) value('$name','$press','$price','$number') ";
if(fun_conn($sql))
{
    echo "增加成功";
}

header("location:index.php"); //跳转到主页
