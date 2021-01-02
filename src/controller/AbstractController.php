<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\RequestModel;
use Idea\view\HTMLView;
use Idea\model\SessionModel;

abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected SessionModel $Session;
    protected RequestModel $Request;
    protected HTMLView $HTMLView;
    protected  $SessionParam;
    protected string $action;

    public function __construct(RequestModel $Request, HTMLView $HTMLView, SessionModel $Session)
    {
        $this->Session = $Session;
        $this->Request = $Request;
        $this->HTMLView = $HTMLView;
        $this->SessionParam = $this->Session->sessionParam('account');

        $this->run();
    }
    protected function run(): void
    {
        if (!is_null($this->action())) {
            $action = $this->action() . 'Idea';
            $this->action = $action;
            if (!method_exists($this, $action)) {
                $action = self::DEFAULT_ACTION_HTML . 'Idea';
            }
        }
        $this->$action();
    }
    private function action(): ?string
    {
        return $this->Request->checkRequest();
    }
}
