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
        echo json_encode($answer);
        exit;
    }
}
