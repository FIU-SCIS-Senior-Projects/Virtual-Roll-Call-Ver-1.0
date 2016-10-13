<?php

class DBHandler{

	//Must be updated to match production environment
	function __construct(){
		global $db_connection;
		$un = 'root';
		$pw = 'VirtualRollCall';
		$dbName = 'VIRTUAL_ROLL_CALL';
		$address = 'localhost';
		$db_connection = new mysqli($address, $un, $pw, $dbName);

		if ($db_connection->connect_errno > 0) {
			die('Unable to connect to database[' . $db_connection->connect_error . ']');
		}


	}

	function addUser($first_name, $last_name, $email, $password, $role) {

		global $db_connection;

		$result = ["Added" => false];
		$table = "OFFICERS";
		$sql = "INSERT INTO $table (First_Name, Last_Name, Username, Password, Role) VALUES (?,?,?,?,?)"; 

		$stmt = $db_connection->prepare($sql);
		
		if (!$stmt->bind_param('sssss', $first_name, $last_name, $email, $password, $role) ) 
		{
			echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
		}

		if (!$stmt->execute()) 
		{
			return $result;
		}

		$result["Added"] = true;

		$stmt->close();

		$db_connection->close();

		return $result;
	}

	function loginUser($username, $password){

		global $db_connection;

        //store the result here
		$result = ['userID' => NULL, 'First_Name' => NULL, 'Last_Name' => NULL, 'Username' => NULL, 'Password' => NULL, 'Role' => NULL];

		$sql = 'SELECT userID, First_Name, Last_Name, Username, Password, Role FROM OFFICERS WHERE Username=? AND Password=?';

		$stmt = $db_connection->prepare($sql);

		$stmt->bind_param('ss', $username, $password);

		$stmt->execute();

		$stmt->bind_result($result['userID'], $result['First_Name'], $result['Last_Name'], $result['Username'], $result['Password'], $result['Role']);

		if (!$stmt->fetch()){
			return $result;
		}

		$stmt->close();

		$db_connection->close();		

		return $result;
	}

	function changePassword($id, $curr_pw, $new_pw){

		global $db_connection;

		$result = ['userID' => NULL, 'Updated' => NULL];

		$sql = 'SELECT userID FROM OFFICERS WHERE userID=? AND Password=?';

		$stmt = $db_connection->prepare($sql);

		$stmt->bind_param('ss', $id, $curr_pw);

		$stmt->execute();

		$stmt->bind_result($result['userID']);

		if (!$stmt->fetch()){
			return $result;
		}

		$stmt->close();
		
		$sql = 'UPDATE OFFICERS SET Password=? WHERE UserID=?';

		$stmt = $db_connection->prepare($sql);

		$stmt->bind_param('sd', $new_pw, $id);

		$stmt->execute();

		if ($stmt->affected_rows === 1){

			$result['Updated'] = true;

		}

		$stmt->close();

		$db_connection->close();

		return $result;

	}

	function getOfficers(){

		global $db_connection;

		$officers = [];

		$sql = 'SELECT userID, First_Name, Last_Name, Username, Role FROM OFFICERS';

		$stmt = $db_connection->prepare($sql);

		$stmt->execute();

		$stmt->bind_result($userID, $First_Name, $Last_Name, $Username, $Role);

		while($stmt->fetch()){
			$tmp = ["id" => $userID,
			"firstName" => $First_Name,
			"lastName" => $Last_Name,
			"username" => $Username,
			"role" => $Role];

			array_push($officers, $tmp);
		}

		$stmt->close();

		$db_connection->close();

		return $officers;
	}

	function resetPassword($id, $reset_pw){

		global $db_connection;

		$result = ['userID' => $id, 'Updated' => NULL];

		$sql = 'UPDATE OFFICERS SET Password=? WHERE UserID=?';

		$stmt = $db_connection->prepare($sql);

		$stmt->bind_param('sd', $reset_pw, $id);

		$stmt->execute();

		if ($stmt->affected_rows === 1){

			$result['Updated'] = true;

		}

		$stmt->close();

		$db_connection->close();

		return $result;

	}


}