<?php
	declare(strict_types=1);
	
	require_once __DIR__ . '/.internal/api-client.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
	$output = "{}";
	$outputJSON = isset($_GET['json']);
	
	try {
		if (isset($_GET['cookie'])) {
			$cookie = $_GET['cookie'];
			
			$output = peterplannerRequest('cookie', $cookie, $outputJSON);
			
		} else if (isset($_GET['uid'])) {
			$uid = $_GET['uid'];
			
			$output = peterplannerRequest('uid', $uid, true);
			
		} else if (isset($_GET['studentID'])) {
			$studentID = $_GET['studentID'];
			
			$output = peterplannerRequest('studentID', $studentID, $outputJSON);
			
		} else {
			header("Location: /saveme");
			exit;
		}
		
		if (strpos($output, "No flags were specified.") !== false) {
			header("Location: /saveme");
			exit;
			
		} else if (isset($_GET['cookie'])) {
			$result = json_decode($output, true);
			$uid = $result['uid'] ?? null;
			
			if (!is_string($uid) || strlen($uid) != 40) {
				throw new RuntimeException('Invalid UID response');
			}
			
			$days = 30 * 4;
			setcookie("uid", $uid, time() + ($days * 24 * 60 * 60), "/");
			
			header("Location: /app");
			exit;
			
		} else {
			if ($outputJSON || isset($_GET['uid'])) {
				header("Content-Type: application/json");
			} else {
				header("Content-Type: text/plain");
			}
			
			echo $output;
		}
		
	} catch (Throwable $error) {
		error_log("PeterPlanner API failure: " . $error->getMessage());
		
		http_response_code(502);
		header("Content-Type: text/plain");
		
		echo "PeterPlanner is temporarily unavailable.";
	}
?>