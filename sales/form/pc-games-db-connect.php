<?php
$servername = "202.150.213.34";
$username = "u541100416_db";
$password = "123456";


// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?> 
