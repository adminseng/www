<?php
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  if (isset($_POST["genre"]) && !empty($_POST["genre"]) && isset($_POST["cd"]) && !empty($_POST["cd"]) && isset($_POST["numberRecords"]) && !empty($_POST["numberRecords"])) { //Checks if action value exists
    $criteria1 = $_POST["genre"];
	  $criteria2 = $_POST["cd"];
	  $criteria3 = $_POST["keyword"];
    $criteria4 = $_POST["numberRecords"];
    $maxRecords = intval($criteria4);
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

	  if($stmt = $conn->prepare("SELECT * FROM DumbTable WHERE `name` LIKE ? AND `genre` LIKE ? AND `cd` LIKE ?")){
		  $stmt->bind_param("sss", $name, $genre, $cd);

		  $name = "%".$criteria3."%";
		  $genre = $criteria1;
		  $cd = $criteria2;

		
		  $stmt->execute();
		  $stmt->bind_result($r_index,$r_name,$r_genre,$r_cd);

      $i = 0;

		  while($stmt->fetch() && $i < $maxRecords) {
        $i += 1;
			  $rows["index"] = $r_index;
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


