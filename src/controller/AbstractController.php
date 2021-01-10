<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\View;

abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected Request $Request;
    protected View $View;
    protected  $SessionParam;
    protected string $action;

    public function __construct(Request $Request, View $View)
    {

        $this->Request = $Request;
        $this->View = $View;
        $this->SessionParam = $this->Request->getParam_SESSION('account');
        $this->action = $this->Request->getParam_GET('action', self::DEFAULT_ACTION_HTML) . 'Idea';
        $this->runPage();
    }
    private function runPage(): void
    {
        if ($this->Request->isGet()) {
            $action = $this->action;
            if (!method_exists($this, $this->action)) {
                $action = self::DEFAULT_ACTION_HTML . 'Idea';
            }
        }
        $this->View->layout($this->params());
        $this->$action();
        $this->View->footer();
    }
    protected function params(): array
    {
        return [
            'action' => $this->action,
            'session' => $this->SessionParam
        ];
    }
}
