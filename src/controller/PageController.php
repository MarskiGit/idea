<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\RatingSettingsIdeaModel;

class PageController extends AbstractController
{
    protected function writeIdea(): void
    {
        $ideaRating = new RatingSettingsIdeaModel();
        $this->View->create($ideaRating->get());
    }
    protected function listIdea(): void
    {
        $this->View->list();
    }
    protected function homeIdea(): void
    {
        $this->View->home();
    }
    protected function loginIdea(): void
    {
        $this->View->login();
    }
}
