<?php
header('Access-Control-Allow-Origin: *');
/* Customize
 * ============================================================= */

/**
 * Github username
 * @var string
 */
$username = '262767665@qq.com';

/**
 * Github Personal Access Token
 * @see https://github.com/settings/tokens/new
 * @var string
 */
$api_token = 'b501a7c892320aeb5c6ff60f6574d60f786f0e8e';


/* Don't touch
 * ============================================================= */

header( "Content-Type: application/json" );

$endpoint = 'https://api.github.com/gists/';

$gist_id = isset($_POST['id']) ? $_POST['id'] : '';

if ($gist_id === '') {
    die(json_encode(array(
        'status' => -1
    )));
}

function curlQuery($url, $username, array $headers = array())
{
    $connection = curl_init();
    curl_setopt_array($connection, array(
        CURLOPT_USERAGENT => $username,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_URL => $url,
        CURLOPT_TIMEOUT => 7,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_HTTPGET => true
    ));

    if (!empty($headers)) {
        curl_setopt($connection, CURLOPT_HTTPHEADER, $headers);
    }

    $result = curl_exec($connection);

    if (curl_errno($connection) > 0) {
        return false;
    }

    return $result;
}

echo curlQuery(
    $endpoint . $gist_id,
    $username,
    array(
        'Content-Type: application/javascript',
        'Authorization: token ' . $api_token
    )
);
