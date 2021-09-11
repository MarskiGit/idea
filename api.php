<?php

declare(strict_types=1);
require_once('config/config.php');

header("Access-Control-Allow-Origin: " . HTTP_SERVER . "");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Pragma: no-cache");
header("X-CSRF-Token: Fetch");

session_start();

require_once('utils/debug.php');

spl_autoload_register(function (string $classNamespace) {
    $path = str_replace(['\\', 'Idea/'], ['/', ''], $classNamespace);
    $path = "src/$path.php";
    require_once($path);
});

use Idea\exception\ApiException;
use Idea\controller\ApiController;
use Idea\view\View;
use Idea\view\Request;

try {
    $request = [
        'index' => 'api',
        'get' => $_GET,
        'post' => $_POST,
        'phpInput' =>  file_get_contents('php://input'),
        'server' => $_SERVER,
        'token' => $_SERVER["HTTP_X_CSRF_TOKEN"] ?? '',
    ];

    $Request = new Request($request);
    $View = new View();

    (new ApiController($Request, $View));
} catch (ApiException $e) {
    echo $e->jsonException($e->getMessage());
} catch (Throwable $e) {
    echo $e->getMessage();
}
