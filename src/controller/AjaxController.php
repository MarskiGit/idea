<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\ListIdeaModel;
use Idea\model\AccountModel;
use Idea\model\AreaModel;
use Idea\model\OfferModel;

class AjaxController extends AbstractController
{

    protected function listIdeaIdea(): void
    {
        $ideaList = new ListIdeaModel();
        $this->View->renderJSON($ideaList->get($this->requestParam));
    }
    protected function creatorSearchIdea(): void
    {
        $userSearch = new AccountModel();
        $this->View->renderJSON($userSearch->search($this->requestParam));
    }
    protected function areaSearchIdea(): void
    {
        $areaSearch = new AreaModel();
        $this->View->renderJSON($areaSearch->search($this->requestParam));
    }
    protected function loginIdea(): void
    {
        $account = new AccountModel();
        $this->View->renderJSON($account->login($this->requestParam));
    }
    protected function addUserIdea(): void
    {
        $account = new AccountModel();
        $this->View->renderJSON($account->create($this->requestParam));
    }
    protected function offerIdea(): void
    {
        $idea = new OfferModel();
        $this->View->renderJSON($idea->create($this->requestParam));
    }
    protected function addAreaIdea(): void
    {
        $area = new AreaModel();
        $this->View->renderJSON($area->create($this->requestParam));
    }
    protected function exitIdea(): void
    {
        exit();
    }
}
