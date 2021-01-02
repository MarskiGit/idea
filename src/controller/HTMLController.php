<?php

declare(strict_types=1);

namespace Idea\controller;

class HTMLController extends AbstractController
{

    protected function createIdea(): void
    {
        $this->HTMLView->layout($this->getParam());
        $this->HTMLView->create();
        $this->HTMLView->footer();
    }
    protected function listIdea(): void
    {
        $this->HTMLView->layout($this->getParam());
        $this->HTMLView->list();
        $this->HTMLView->footer();
    }
    protected function statisticsIdea(): void
    {
        $this->HTMLView->layout($this->getParam());
        $this->HTMLView->statistics();
        $this->HTMLView->footer();
    }
    protected function getParam(): array
    {
        return $param = [
            'action' => $this->action,
            'sesion' => $this->SessionParam
        ];
    }
}
