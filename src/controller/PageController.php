<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\RatingSettingsIdeaModel;

class PageController extends AbstractController
{
    protected function formIdea(): void
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
    protected function signinIdea(): void
    {
        $this->View->signin();
    }
    protected function accountIdea(): void
    {
        $this->View->account();
    }
    protected function registrationIdea(): void
    {
        $this->View->registration();
    }
}
