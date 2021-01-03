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
        echo '<h1>Wystąpił błąd w aplikacji</h1>';
        echo '<h3>' . $e->getMessage() . $e->getFile() . '</h3>';
    } catch (\Throwable $e) {
        echo '<h1>Wystąpił błąd w aplikacji</h1>';
        dump($e);
    }
} else {
    header('Location: index.php');
    exit();
}
