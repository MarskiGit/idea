<?php

declare(strict_types=1);

namespace Ajax\exception;

use Exception;

class AjaxException extends Exception
{
    public function jsonException(string $m, string $f, int $l): string
    {
        $temp = [
            'statusText' => $m,
            'file' => $f,
            'line' => $l,
            'type' => 'Ajax'
        ];
        $answer = json_encode($temp);
        return  $answer;
    }
}
