<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\ListIdeaModel;
use Idea\model\CreatorSearchModel;
use Idea\model\AreaSearchModel;
use Idea\model\AccountModel;
use Idea\model\AreaModel;
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
        $this->View->renderJSON($account->add());
    }
    protected function ideaWriteIdea()
    {
        $idea = new IdeaWrite($this->requestParam);
        $this->View->renderJSON($idea->addIdea());
    }
    protected function addAreaIdea()
    {
        $area = new AreaModel($this->requestParam);
        $this->View->renderJSON($area->add());
    }
    protected function exitIdea(): void
    {
        exit();
    }
}
