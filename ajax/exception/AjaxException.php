<?php

declare(strict_types=1);

namespace Ajax\exception;

use Exception;

class AjaxException extends Exception
{
    public function jsonException(string $m, string $f, int $l): string
    {
        $temp = [
            'exception' => $m,
            'file' => $f,
            'line' => $l
        ];
        $answer = json_encode($temp);
        return  $answer;
    }
}
