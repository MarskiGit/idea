<?php

declare(strict_types=1);

namespace Idea\controller;

class IdeaController extends AbstractController
{

    protected function createIdea(): void
    {
        $this->View->layout($this->SessionParam);
        $this->View->create();
    }
    protected function listIdea(): void
    {
        $this->View->layout($this->SessionParam);
        $this->View->list();
    }
    protected function statisticsIdea(): void
    {
        $this->View->layout($this->SessionParam);
        $this->View->statistics();
    }
}
