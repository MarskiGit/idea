<?php

declare(strict_types=1);
$secure = file_get_contents('php://input');
require_once("utils/debug.php");
spl_autoload_register(function (string $classNamespace) {
    $path = str_replace(['\\', 'Ajax/'], ['/', ''], $classNamespace);
    $path = "ajax/$path.php";
    require_once($path);
});

use Ajax\controller\AjaxController;
use Ajax\view\JsonView;
use Ajax\exception\AjaxException;
use Ajax\view\PhpInput;

if ($secure !== false && !empty($secure)) {
    try {
        $PhpInput = new PhpInput($secure);
        $JsonView = new JsonView();

        (new AjaxController($PhpInput, $JsonView));
    } catch (AjaxException $e) {
        header('Content-Type: application/json; charset=utf-8');
        echo $e->jsonException($e->getMessage(), $e->getFile(), $e->getLine());
    } catch (Throwable $e) {
        echo $e->jsonException($e->getMessage(), $e->getFile(), $e->getLine());
        dump($e);
    }
} else {
    header('Location: index.php');
    exit();
}
