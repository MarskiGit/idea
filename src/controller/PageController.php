<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\AccountModel;
use Idea\model\RatingSettingsIdeaModel;

class PageController extends AbstractController
{
    protected function ideaIdea(): void
    {
        $ideaRating = new RatingSettingsIdeaModel();
        $this->View->addIdea($ideaRating->get());
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
    protected function logoutIdea(): void
    {
        $account = new AccountModel();
        $status = $account->logout();
    }
    protected function adminIdea(): void
    {
        $this->View->admin();
    }
}
