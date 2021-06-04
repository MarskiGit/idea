<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\ListOffersModel;
use Idea\model\AccountModel;
use Idea\model\AreaModel;
use Idea\model\FormOfferModel;

class AjaxController extends AbstractController
{

    protected function listOffersIdea(): void
    {
        $ideaList = new ListOffersModel();
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
    protected function formOfferIdea(): void
    {
        $idea = new FormOfferModel();
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
