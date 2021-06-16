<?php

declare(strict_types=1);

namespace Api\view;

class View
{
    public function __construct()
    {
    }

    public function renderJSON(array $answer): void
    {
        echo json_encode($answer);
        exit;
    }
}
