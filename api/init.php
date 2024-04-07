<?php
$servername = "localhost";
$username = "username";
$password = "password";
 
// 创建连接
$conn = new mysqli($servername, $username, $password);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 
// 创建数据库petShop
$sql = "CREATE DATABASE petShop";
if ($conn->query($sql) === TRUE) {
    echo "数据库创建成功";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
 
// 使用 sql 创建数据表
// $sql = "CREATE TABLE MyGuests (
// id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
// firstname VARCHAR(30) NOT NULL,
// lastname VARCHAR(30) NOT NULL,
// email VARCHAR(50),
// reg_date TIMESTAMP
// )";
 
// if ($conn->query($sql) === TRUE) {
//     echo "Table MyGuests created successfully";
// } else {
//     echo "创建数据表错误: " . $conn->error;
// }
// $conn->close();
function seedUsers($conn)
{
    try{
        $sql = "";
        $conn->query("CREATE EXTENSION IF NOT EXISTS 'uuid-ossp'");
        $conn->query("CREATE TABLE IF NOT EXISTS users (
                      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      email TEXT NOT NULL UNIQUE,
                      password TEXT NOT NULL,
                      image_url VARCHAR(255) NOT NULL
                    )");
        echo "Created 'users' table";
        $conn->query("INSERT INTO users (id, name, email, password,image_url)
                  VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword},${user.image_url})
                  ON CONFLICT (id) DO NOTHING");
        echo "Seeded ${insertedUsers.length} users";
    }catch(Exception $error){
        echo "create users error";
    }
}

?>