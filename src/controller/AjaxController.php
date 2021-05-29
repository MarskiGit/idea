<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\ListIdeaModel;
use Idea\model\UserModel;
use Idea\model\AreaModel;
use Idea\model\AccountModel;
use Idea\model\IdeaWrite;

class AjaxController extends AbstractController
{

    protected function listIdeaIdea(): void
    {
        $ideaList = new ListIdeaModel();
        $this->View->renderJSON($ideaList->get($this->requestParam));
    }
    protected function creatorSearchIdea(): void
    {
        $userSearch = new UserModel();
        $this->View->renderJSON($userSearch->getSearch($this->requestParam));
    }
    protected function areaSearchIdea(): void
    {
        $areaSearch = new AreaModel();
        $this->View->renderJSON($areaSearch->getSearch($this->requestParam));
    }
    protected function loginIdea()
    {
        $account = new AccountModel();
        $this->View->renderJSON($account->login($this->requestParam));
    }
    protected function addUserIdea()
    {
        $account = new AccountModel();
        $this->View->renderJSON($account->add($this->requestParam));
    }
    protected function ideaWriteIdea()
    {
        $idea = new IdeaWrite();
        $this->View->renderJSON($idea->addIdea($this->requestParam));
    }
    protected function addAreaIdea()
    {
        $area = new AreaModel();
        $this->View->renderJSON($area->add($this->requestParam));
    }
    protected function exitIdea(): void
    {
        exit();
    }
}
