<?php

declare(strict_types=1);
date_default_timezone_set('Europe/Warsaw');
session_start();

require_once("utils/debug.php");
require_once('config/config.php');
spl_autoload_register(function (string $classNamespace) {
    $path = str_replace(['\\', 'Idea/'], ['/', ''], $classNamespace);
    $path = "src/$path.php";
    require_once($path);
});

use Idea\exception\IdeaException;
use Idea\controller\PageController;
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

    (new PageController($Request, $View));
} catch (IdeaException $e) {
    echo "<div class='exception align_center'><p>Błąd Aplikacji</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
} catch (Throwable $e) {
    echo "<div class='exception align_center'><p>Krytyczny Błąd Aplikacji</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
    dump($e);
}
