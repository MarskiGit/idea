<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\View;

abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'home';
    protected Request $Request;
    protected View $View;
    protected array $SessionParam;
    protected string $action;

    public function __construct(Request $Request, View $View)
    {

        $this->Request = $Request;
        $this->View = $View;
        $this->SessionParam = $this->Request->getParam_SESSION();
        $this->action = $this->Request->getParam_GET('action', self::DEFAULT_ACTION_HTML) . 'Idea';
        $this->runPage();
    }
    protected function params(): array
    {
        return [
            'action' => $this->action,
            'account' => $this->SessionParam,
        ];
    }
    private function runPage(): void
    {
        if ($this->Request->is_Get()) {
            $action = $this->action;
            if (!method_exists($this, $this->action)) {
                $action = self::DEFAULT_ACTION_HTML . 'Idea';
            }
        }
        $this->View->globalParams = $this->params();
        $this->View->layout();

        $this->$action();

        $this->View->footer();
    }
}
