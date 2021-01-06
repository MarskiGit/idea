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

use Idea\controller\HTMLController;
use Idea\model\SessionModel;
use Idea\view\HTMLView;
use Idea\view\Request;
use Idea\exception\IdeaException;

try {
    $request = [
        'get' => $_GET,
        'post' => $_POST,
        'session' => $_SESSION,
        'server' => $_SERVER
    ];

    $Request = new Request($request);
    $HTMLView = new HTMLView();

    (new HTMLController($Request, $HTMLView));
} catch (IdeaException $e) {
    echo "<div class='exception align_center'><p>Błąd Idea aplikacji</p>" . $e->getMessage() . "<p></p><div class='exception_img'></div></div>";
} catch (Throwable $e) {
    echo "<div class='exception align_center'><p>Błąd aplikacji</p>" . $e->getMessage() . "<p></p><div class='exception_img'></div></div>";
}
