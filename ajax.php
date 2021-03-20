<?php

declare(strict_types=1);
header('Content-Type: text/html; charset=utf-8');

$secure = file_get_contents('php://input');
require_once("utils/debug.php");
spl_autoload_register(function (string $classNamespace) {
    $path = str_replace(['\\', 'Ajax/'], ['/', ''], $classNamespace);
    $path = "ajax/$path.php";
    require_once($path);
});

use Ajax\exception\AjaxException;
use Ajax\controller\AjaxController;
use Ajax\view\AjaxView;
use Ajax\view\PhpInput;

if ($secure !== false && !empty($secure)) {
    try {
        $PhpInput = new PhpInput($secure);
        $AjaxView = new AjaxView();

        (new AjaxController($PhpInput, $AjaxView));
    } catch (AjaxException $e) {
        echo $e->jsonException($e->getMessage(), $e->getFile(), $e->getLine());
    } catch (Throwable $e) {
        $answer = json_encode([
            'exception' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'type' => 'Krytyczny'
        ]);
        echo $answer;
    }
} else {
    header('Location: index.php');
    exit();
}
