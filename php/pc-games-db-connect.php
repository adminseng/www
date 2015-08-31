<?php
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  if (isset($_POST["genre"]) && !empty($_POST["genre"]) && isset($_POST["cd"]) && !empty($_POST["cd"])) { //Checks if action value exists
    $criteria1 = $_POST["genre"];
	  $criteria2 = $_POST["cd"];
	  $criteria3 = $_POST["keyword"];
	  $json_array = array();


      $servername = "202.150.213.34";
      $username = "u541100416_db";
      $password = "123456";
      $database = "u541100416_db";

      // Create connection
      $conn = new mysqli($servername, $username, $password, $database);

      // Check connection
      if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
      }
      
      $shouldpass = false;
      if($criteria1 == "%"){
        if($stmt = $conn->prepare("SELECT * FROM GameInfo WHERE (`code` LIKE ? OR `name` LIKE ?) AND `cd` LIKE ?")){
          $shouldpass = true;
          $stmt->bind_param("sss", $code, $name, $cd);
        }
      }else{
        if($stmt = $conn->prepare("SELECT g.code,g.name,g.genre,g.cd FROM ".$criteria1." t, GameInfo g WHERE t.GameCode LIKE g.code AND g.name LIKE ? AND g.cd LIKE ?")){
          $shouldpass = true;
          $stmt->bind_param("ss", $name, $cd);
        }
      }

	  if($shouldpass){

      $code = "%".$criteria3."%";
		  $name = "%".$criteria3."%";
		  $genre = $criteria1;
		  $cd = $criteria2;
		
		  $stmt->execute();
		  $stmt->bind_result($r_code,$r_name,$r_genre,$r_cd);
      $stmt->store_result();
      
		  while($stmt->fetch()) {
			  $rows["code"] = $r_code;
			  $rows["name"] = $r_name;
			  $rows["genre"] = $r_genre;
			  $rows["cd"] = $r_cd;

			  array_push($json_array,$rows);
		  }
		  echo json_encode($json_array);
	  }else{
		  die ("Mysql Error: " . $conn->error);
		  echo $conn->error;
	  }
    $conn->close();
  }
}
?>


