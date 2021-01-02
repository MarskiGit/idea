<?php

declare(strict_types=1);
require_once("src/utils/debug.php");
require_once('config/config.php');
spl_autoload_register(function (string $classNamespace) {
    $path = str_replace(['\\', 'Idea/'], ['/', ''], $classNamespace);
    $path = "src/$path.php";
    require_once($path);
});

use Idea\controller\AjaxController;
use Idea\controller\HTMLController;
use Idea\model\RequestModel;
use Idea\model\SessionModel;
use Idea\view\HTMLView;
use Idea\view\AjaxView;
use Idea\exception\IdeaException;
use Idea\model\RequestAjaxModel;

try {
    $request = [
        'get' => $_GET,
        'post' => $_POST,
        'server' => $_SERVER,
        'phpInput' => file_get_contents('php://input')
    ];

    $Session = new SessionModel();
    $Request = new RequestModel($request);
    $HTMLView = new HTMLView();

    $RequestAjax = new RequestAjaxModel($request);
    $AjaxView = new AjaxView();


    (new AjaxController($RequestAjax, $AjaxView));
    (new HTMLController($Request, $HTMLView, $Session));
} catch (IdeaException $e) {
    echo '<h1>Wystąpił błąd w aplikacji</h1>';
    echo '<h3>' . $e->getMessage() . $e->getFile() . '</h3>';
} catch (\Throwable $e) {
    echo '<h1>Wystąpił błąd w aplikacji</h1>';
    dump($e);
}
