<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\RatingSettingsIdeaModel;

class PageController extends AbstractController
{
    protected function createIdea(): void
    {
        $ideaRating = new RatingSettingsIdeaModel();
        $this->View->create($ideaRating->get());
    }
    protected function listIdea(): void
    {
        $this->View->list();
    }
    protected function statisticsIdea(): void
    {
        $this->View->statistics();
    }
    protected function loginIdea(): void
    {
        $this->View->login();
    }
}
