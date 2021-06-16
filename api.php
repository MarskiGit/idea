<?php

declare(strict_types=1);
date_default_timezone_set('Europe/Warsaw');

session_start();

require_once("utils/debug.php");
require_once('config/config.php');
spl_autoload_register(function (string $classNamespace) {
    $path = str_replace(['\\', 'Api/'], ['/', ''], $classNamespace);
    $path = "api/$path.php";
    require_once($path);
});

use Api\exception\ApiException;
use Api\controller\ApiController;
use Api\view\View;
use Api\view\Request;

try {
    $input = file_get_contents('php://input');
    $request = [
        'get' => $_GET,
        'post' => $_POST,
        'phpInput' => !empty($input) ? $input : '',
        'server' => $_SERVER
    ];

    $Request = new Request($request);
    $View = new View();

    header('Content-Type: application/json; charset=utf-8');
    (new ApiController($Request, $View));
} catch (ApiException $e) {
    echo "<div class='exception align_center'><p>Błąd Api</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
} catch (Throwable $e) {
    echo "<div class='exception align_center'><p>Krytyczny Błąd Api</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
    dump($e);
}
