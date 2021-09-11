<?php

declare(strict_types=1);

namespace Idea\exception;

use Exception;

class ApiException extends Exception
{
    public function jsonException(string $m): string
    {
        header("HTTP/1.1 404 Not Found");
        $temp = [
            'api' => 404,
            'title' => $m,
            'type' => 'PDO'
        ];
        return  json_encode($temp);
    }
}
