<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\HTMLView;
use Idea\model\SessionModel;

abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected SessionModel $Session;
    protected Request $Request;
    protected HTMLView $HTMLView;
    protected  $SessionParam;
    protected string $action;

    public function __construct(Request $Request, HTMLView $HTMLView, SessionModel $Session)
    {
        $this->Session = $Session;
        $this->Request = $Request;
        $this->HTMLView = $HTMLView;
        $this->SessionParam = $this->Session->sessionParam('account');

        $this->run();
    }
    protected function run(): void
    {
        if ($this->Request->isGet()) {
            $this->action = $this->Request->getparam('action', self::DEFAULT_ACTION_HTML) . 'Idea';
            $action = $this->action;
            if (!method_exists($this, $action)) {
                $action = self::DEFAULT_ACTION_HTML . 'Idea';
            }
        }
        $this->$action();
    }
}
