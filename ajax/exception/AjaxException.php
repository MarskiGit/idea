<?php

declare(strict_types=1);

namespace Ajax\exception;

use Exception;

class AjaxException extends Exception
{
    public function jsonException(string $m, string $f, int $l): string
    {
        $temp = [
            'ok' => false,
            'statusText' => $m,
            'file' => $f,
            'line' => $l,
            'type' => 'Ajax'
        ];
        $test[] = $temp;
        $answer = json_encode($test);
        return  $answer;
    }
}
