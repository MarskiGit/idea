<?php

declare(strict_types=1);

namespace Ajax\view;

class AjaxView
{
    public function __construct()
    {
    }
    public function renderJSON($answer): void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($answer);
        exit;
    }
}
