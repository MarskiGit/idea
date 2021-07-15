<?php

declare(strict_types=1);

namespace Idea\exception;

use Exception;

class ApiException extends Exception
{
    public function jsonException(string $m): string
    {
        $temp = [
            'api' => false,
            'title' => $m,
            'type' => 'PDO'
        ];
        return  json_encode($temp);
    }
}
