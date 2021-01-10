<?php

declare(strict_types=1);

namespace Ajax\view;

class AjaxView
{
    private $DB;

    public function __construct()
    {
    }
    public function renderJSON($reply): void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($reply);
        exit;
    }
}
