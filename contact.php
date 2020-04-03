<?php 

use Sabre\HTTP;
use Respect\Validation\Validator;

include 'vendor/autoload.php';

$request = HTTP\Sapi::getRequest();

//var_dump($request->getMethod());die;


$response = new HTTP\Response();

if($request->getMethod() == 'POST') {
    $formData = $request->getPostData();
    
    if (
        isset($formData['name'])    && Validator::notOptional()->alpha()->validate($formData['name']) &&
        isset($formData['need'])    && Validator::notOptional()->alpha()->validate($formData['need']) &&
        isset($formData['email'])   && Validator::notOptional()->email()->validate($formData['email']) &&
        isset($formData['message']) && Validator::notOptional()->length(30, null)->validate($formData['message'])
        ) {
        $response->setStatus(202);
        print_r($formData);
    }
    else {
        $response->setStatus(400);	
    }
} else {
    $response->setStatus(405);		
   
}

HTTP\Sapi::sendResponse($response);

//var_dump($request);
//var_dump($_SERVER['REQUEST_METHOD']);
//var_dump($_POST);

