<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\OffersListModel;
use Idea\model\AccountModel;
use Idea\model\AreaModel;
use Idea\model\OfferFormModel;
use Idea\model\StatisticsModel;

class ApiController extends AbstractController
{

    protected function listOffers_Api(): void
    {
        $ApiList = new OffersListModel();
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
        $Api = new OfferFormModel();
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
        $this->View->response_Api($stat->get('TopTen', $this->requestParam['quarter']));
    }
    protected function topUsers_Api(): void
    {
        $stat = new StatisticsModel();
        $this->View->response_Api($stat->get('TopUsers', $this->requestParam['quarter']));
    }
    protected function topAreas_Api(): void
    {
        $stat = new StatisticsModel();
        $this->View->response_Api($stat->get('TopAreas', $this->requestParam['quarter']));
    }
    protected function exit_Api(): void
    {
        header("HTTP/1.1 404 Not Found");
        exit();
    }
}
