<?php

declare(strict_types=1);
session_start();
require_once("src/utils/debug.php");
require_once('config/config.php');
spl_autoload_register(function (string $classNamespace) {
    $path = str_replace(['\\', 'Idea/'], ['/', ''], $classNamespace);
    $path = "src/$path.php";
    require_once($path);
});

use Idea\controller\IdeaController;
use Idea\model\RequestModel;
use Idea\view\View;
use Idea\exception\IdeaException;

try {
    $request = [
        'get' => $_GET,
        'post' => $_POST,
        'session' => $_SESSION,
        'server' => $_SERVER,
        'phpInput' => file_get_contents('php://input')
    ];

    $RequestModel = new RequestModel($request);
    $View = new View();

    (new IdeaController($RequestModel, $View));
} catch (IdeaException $e) {
    echo '<h1>Wystąpił błąd w aplikacji</h1>';
    echo '<h3>' . $e->getMessage() . $e->getFile() . '</h3>';
} catch (\Throwable $e) {
    echo '<h1>Wystąpił błąd w aplikacji</h1>';
    dump($e);
}
