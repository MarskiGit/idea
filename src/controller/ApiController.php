<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\ListOffersModel;
use Idea\model\AccountModel;
use Idea\model\AreaModel;
use Idea\model\FormOfferModel;
use Idea\model\StatisticsModel;

class ApiController extends AbstractController
{

    protected function listOffersApi(): void
    {
        $ApiList = new ListOffersModel();
        $this->View->renderJSON($ApiList->get($this->requestParam));
    }
    protected function creatorSearchApi(): void
    {
        $userSearch = new AccountModel();
        $this->View->renderJSON($userSearch->search($this->requestParam));
    }
    protected function areaSearchApi(): void
    {
        $areaSearch = new AreaModel();
        $this->View->renderJSON($areaSearch->search($this->requestParam));
    }
    protected function loginApi(): void
    {
        $account = new AccountModel();
        $this->View->renderJSON($account->login($this->requestParam));
    }
    protected function addUserApi(): void
    {
        $account = new AccountModel();
        $this->View->renderJSON($account->create($this->requestParam));
    }
    protected function formOfferApi(): void
    {
        $Api = new FormOfferModel();
        $this->View->renderJSON($Api->create($this->requestParam));
    }
    protected function addAreaApi(): void
    {
        $area = new AreaModel();
        $this->View->renderJSON($area->create($this->requestParam));
    }
    protected function topTenApi(): void
    {
        $stat = new StatisticsModel();
        $this->View->renderJSON($stat->getTen($this->requestParam['quarter']));
    }
    protected function exitApi(): void
    {
        exit();
    }
}
