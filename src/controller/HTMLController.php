<?php

declare(strict_types=1);

namespace Idea\controller;

class HTMLController extends AbstractController
{

    protected function createIdea(): void
    {;
        $this->HTMLView->layout($this->getParam());
        $this->HTMLView->create();
    }
    protected function listIdea(): void
    {

        $this->HTMLView->layout($this->getParam());
        $this->HTMLView->list();
    }
    protected function statisticsIdea(): void
    {

        $this->HTMLView->layout($this->getParam());
        $this->HTMLView->statistics();
    }
    protected function getParam(): array
    {
        return $param = [
            'action' => $this->action,
            'sesion' => $this->SessionParam
        ];
    }
}
