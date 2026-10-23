<?php
declare(strict_types=1);

/**
 * Execute a PeterPlanner operation through the internal Go API.
 *
 * @throws RuntimeException on authentication, transport, or API errors.
 */
function peterplannerRequest(string $operation, string $value, bool $json = false): string {
	$token = @file_get_contents(
		'/run/secrets/peterplanner_api_token'
	);
	
	if ($token === false || trim($token) === '') {
		throw new RuntimeException('API token unavailable');
	}
	
	$payload = json_encode([
		'operation' => $operation,
		'value' => $value,
		'json' => $json,
	], JSON_THROW_ON_ERROR);
	
	$curl = curl_init('http://peterplanner-api:8080/run');
	
	if ($curl === false) {
		throw new RuntimeException('Cannot initialize API request');
	}
	
	curl_setopt_array($curl, [
		CURLOPT_POST => true,
		CURLOPT_HTTPHEADER => [
			'Authorization: Bearer ' . trim($token),
			'Content-Type: application/json',
			'Accept: */*',
		],
		CURLOPT_POSTFIELDS => $payload,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_CONNECTTIMEOUT => 5,
		CURLOPT_TIMEOUT => 135,
		CURLOPT_FOLLOWLOCATION => false,
	]);
	
	try {
		$response = curl_exec($curl);
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		$error = curl_error($curl);
	} finally {
		curl_close($curl);
	}
	
	if ($response === false) {
		throw new RuntimeException(
			'API transport failure: ' . $error
		);
	}
	
	if ($status !== 200) {
		throw new RuntimeException(
			"API returned HTTP $status"
		);
	}
	
	return $response;
}