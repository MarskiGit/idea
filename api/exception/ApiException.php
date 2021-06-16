<?php

declare(strict_types=1);

namespace Api\exception;

use Exception;

class ApiException extends Exception
{
    public function jsonException(string $m, string $f, int $l): string
    {
        $temp = [
            'api' => false,
            'title' => $m,
            'file' => $f,
            'line' => $l,
            'type' => 'PDO'
        ];
        return  json_encode($temp);
    }
}
