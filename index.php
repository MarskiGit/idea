<?php

declare(strict_types=1);
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
    $request = [
        'get' => $_GET,
        'post' => $_POST,
        'session' => $_SESSION,
        'server' => $_SERVER
    ];

    $Request = new Request($request);
    $View = new View();

    (new PageController($Request, $View));
} catch (IdeaException $e) {
    echo "<div class='exception align_center'><p>Błąd Aplikacji</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
} catch (Throwable $e) {
    echo "<div class='exception align_center'><p>Krytyczny Błąd Aplikacji</p><p>" . $e->getMessage() . "</p><div class='exception_img'></div></div>";
}
