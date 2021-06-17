<?php

declare(strict_types=1);

session_start();

require_once('utils/debug.php');
require_once('config/config.php');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: " . HTTP_SERVER . "");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");



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
    $input = file_get_contents('php://input');
    $request = [
        'get' => $_GET,
        'post' => $_POST,
        'phpInput' => !empty($input) ? $input : '',
        'server' => $_SERVER,
        'token' => $_SERVER["HTTP_X_CSRF_TOKEN"] ?? '',
    ];

    $Request = new Request($request);
    $View = new View();

    (new ApiController($Request, $View));
} catch (ApiException $e) {
    echo "<div class='exception align_center'><p>Błąd Api</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
} catch (Throwable $e) {
    echo "<div class='exception align_center'><p>Krytyczny Błąd Api</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
    dump($e);
}
