<?php

declare(strict_types=1);

namespace Ajax\controller;


use Ajax\view\AjaxView;
use Ajax\view\PhpInput;
use Ajax\model\ListIdeaModel;
use Ajax\model\CreatorSearchModel;
use Ajax\model\AreaSearchModel;
use Ajax\model\AccountModel;
use Ajax\model\IdeaWrite;

class AjaxController
{
    private const DEFAULT_ACTION_AJAX = 'ideaList';
    private PhpInput $PhpInput;
    private AjaxView $AjaxView;
    private array $requestParam;


    public function __construct(PhpInput $PhpInput, AjaxView $AjaxView)
    {
        $this->PhpInput = $PhpInput;
        $this->AjaxView = $AjaxView;


        $this->run();
    }
    private function run(): void
    {
        if ($this->PhpInput->hasPhpInput()) {
            $this->requestParam = $this->PhpInput->getParam_PhpInput();
            $this->runMetod();
        }
    }
    private function runMetod(): void
    {
        $action = $this->requestParam['action'] . 'Ajax';
        if (!method_exists($this, $action)) {
            $action = self::DEFAULT_ACTION_AJAX . 'Ajax';
        } else {
            $this->$action();
        }
    }
    private function listIdeaAjax(): void
    {
        $ideaList = new ListIdeaModel($this->requestParam);
        $this->AjaxView->renderJSON($ideaList->get());
    }
    private function creatorSearchAjax(): void
    {
        $userSearch = new CreatorSearchModel($this->requestParam);
        $this->AjaxView->renderJSON($userSearch->get());
    }
    private function areaSearchAjax(): void
    {
        $areaSearch = new AreaSearchModel($this->requestParam);
        $this->AjaxView->renderJSON($areaSearch->get());
    }
    private function loginUserAjax()
    {
        $account = new AccountModel($this->requestParam);
        $this->AjaxView->renderJSON($account->login());
    }
    private function logoutUserAjax()
    {
        $account = new AccountModel($this->requestParam);
        $this->AjaxView->renderJSON($account->logout());
    }
    private function addUserAjax()
    {
        $account = new AccountModel($this->requestParam);
        $this->AjaxView->renderJSON($account->addAccount());
    }
    private function ideaWriteAjax()
    {
        $idea = new IdeaWrite($this->requestParam);
        $this->AjaxView->renderJSON($idea->add());
    }
}
