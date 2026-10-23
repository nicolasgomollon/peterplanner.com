<?php
	declare(strict_types=1);
	
	require_once __DIR__ . '/.internal/api-client.php';
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
	$cookie = $_GET['cookie'] ?? '';
	
	if (!is_string($cookie)) {
		http_response_code(400);
		exit('Invalid cookie');
	}
	
	// Preserve the original fallback when no cookie is provided.
	if ($cookie === '') {
		header("Location: downloadme");
		exit;
	}
	
	try {
		// Request the DegreeWorks report from the Go backend.
		$output = peterplannerRequest('download', $cookie);
		
		if (strpos($output, "No flags were specified.") !== false) {
			header("Location: downloadme");
			exit;
		}
		
		// Preserve the original download response.
		$filename = "DGW_Report.xsl";
		
		header("Content-Type: text/xsl");
		header('Content-Disposition: attachment; filename="'.$filename.'"');
		header("Content-Length: " . strlen($output));
		
		echo $output;
		exit;
		
	} catch (Throwable $error) {
		error_log("PeterPlanner download failure: " . $error->getMessage());
		
		http_response_code(502);
		header("Content-Type: text/plain");
		
		echo "Unable to generate the requested report.";
	}
?>