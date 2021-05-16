<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\ListIdeaModel;
use Idea\model\CreatorSearchModel;
use Idea\model\AreaSearchModel;
use Idea\model\AccountModel;
use Idea\model\IdeaWrite;

class AjaxController extends AbstractController
{

    protected function listIdeaIdea(): void
    {
        $ideaList = new ListIdeaModel($this->requestParam);
        $this->View->renderJSON($ideaList->get());
    }
    protected function creatorSearchIdea(): void
    {
        $userSearch = new CreatorSearchModel($this->requestParam);
        $this->View->renderJSON($userSearch->get());
    }
    protected function areaSearchIdea(): void
    {
        $areaSearch = new AreaSearchModel($this->requestParam);
        $this->View->renderJSON($areaSearch->get());
    }
    protected function loginIdea()
    {
        $account = new AccountModel($this->requestParam);
        $this->View->renderJSON($account->login());
    }
    protected function addUserIdea()
    {
        $account = new AccountModel($this->requestParam);
        $this->View->renderJSON($account->addAccount());
    }
    protected function ideaWriteIdea()
    {
        $idea = new IdeaWrite($this->requestParam);
        $this->View->renderJSON($idea->add());
    }
    protected function exitIdea(): void
    {
        exit();
    }
}
