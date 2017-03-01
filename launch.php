<?php
/*
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(-1);
*/
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
	$old_path = getcwd();
	chdir("/var/www/golang/bin/");
	
	$outputJSON = $_GET['json'];
	if (isset($_GET['cookie'])) {
		$cookie = $_GET['cookie'];
		$cookie = str_replace("!", "\!", $cookie);
		$output = shell_exec("./peterplanner --cookie \"".$cookie."\"".($outputJSON ? " --json" : ""));
	} else if (isset($_GET['studentID'])) {
		$studentID = $_GET['studentID'];
		$output = shell_exec("./peterplanner --studentID \"".$studentID."\"".($outputJSON ? " --json" : ""));
	}
	
	chdir($old_path);
	
	if (strpos($output, "No flags were specified.") !== false) {
		header("Location: saveme");
		die();
	} else {
		// TODO: Determine if output contains some error about cookies, and alert the user.
		// TODO: Obtain clean JSON output from `peterplanner` script.
		echo "<pre>$output</pre>";
	}
?>
