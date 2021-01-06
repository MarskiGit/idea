<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\RatingSettingModel;

class HTMLController extends AbstractController
{
    protected function createIdea(): void
    {
        $create = new RatingSettingModel();
        $this->HTMLView->create($create->getSetings());
    }
    protected function listIdea(): void
    {
        $this->HTMLView->list();
    }
    protected function statisticsIdea(): void
    {
        $this->HTMLView->statistics();
    }
}
