<?php

declare(strict_types=1);
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
use Throwable;

try {
    $request = [
        'get' => $_GET,
        'post' => $_POST,
        'server' => $_SERVER
    ];

    $Session = new SessionModel();
    $Request = new Request($request);
    $HTMLView = new HTMLView();

    (new HTMLController($Request, $HTMLView, $Session));
} catch (IdeaException $e) {
    echo '<h1>Wystąpił błąd w aplikacji</h1>';
    echo '<h3>' . $e->getMessage() . $e->getFile() . '</h3>';
} catch (Throwable $e) {
    echo '<h1>Wystąpił błąd w aplikacji</h1>';
    dump($e);
}
