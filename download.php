<?php
/*
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(-1);
*/
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	$cookie = $_GET['cookie'];
	$cookie = str_replace("!", "\!", $cookie);
	
	$old_path = getcwd();
	chdir("/var/www/golang/bin/");
	$output = shell_exec("./download --cookie \"".$cookie."\"");
	chdir($old_path);
	
	if (strpos($output, "No flags were specified.") !== false) {
		header("Location: downloadme");
		die();
	} else {
		$filename = "DGW_Report.xsl";
		header("Content-Type: text/xsl");
		header('Content-Disposition: attachment; filename="'.$filename.'"');
		header("Content-Length: " . strlen($output));
		echo $output;
		exit;
	}
?>
