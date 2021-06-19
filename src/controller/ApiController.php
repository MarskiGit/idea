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

    protected function listOffers_Api(): void
    {
        $ApiList = new ListOffersModel();
        $this->View->response_Api($ApiList->get($this->requestParam));
    }
    protected function creatorSearch_Api(): void
    {
        $userSearch = new AccountModel();
        $this->View->response_Api($userSearch->search($this->requestParam));
    }
    protected function areaSearch_Api(): void
    {
        $areaSearch = new AreaModel();
        $this->View->response_Api($areaSearch->search($this->requestParam));
    }
    protected function login_Api(): void
    {
        $account = new AccountModel();
        $this->View->response_Api($account->login($this->requestParam));
    }
    protected function addUser_Api(): void
    {
        $account = new AccountModel();
        $this->View->response_Api($account->create($this->requestParam));
    }
    protected function formOffer_Api(): void
    {
        $Api = new FormOfferModel();
        $this->View->response_Api($Api->create($this->requestParam));
    }
    protected function addArea_Api(): void
    {
        $area = new AreaModel();
        $this->View->response_Api($area->create($this->requestParam));
    }
    protected function topTen_Api(): void
    {
        $stat = new StatisticsModel();
        $this->View->response_Api($stat->getTen($this->requestParam['quarter']));
    }
    protected function exit_Api(): void
    {
        exit();
    }
}
