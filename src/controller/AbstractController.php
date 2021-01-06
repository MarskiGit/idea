<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\HTMLView;

abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected Request $Request;
    protected HTMLView $HTMLView;
    protected  $SessionParam;
    protected string $action;

    public function __construct(Request $Request, HTMLView $HTMLView)
    {

        $this->Request = $Request;
        $this->HTMLView = $HTMLView;
        $this->SessionParam = $this->Request->sessionParam('account');

        $this->run();
    }
    private function run(): void
    {
        if ($this->Request->isGet()) {
            $this->action = $this->Request->getparam('action', self::DEFAULT_ACTION_HTML) . 'Idea';
            $action = $this->action;
            if (!method_exists($this, $action)) {
                $action = self::DEFAULT_ACTION_HTML . 'Idea';
            }
        }
        $this->HTMLView->layout($this->getParam());
        $this->$action();
        $this->HTMLView->footer();
    }
    protected function getParam(): array
    {
        return $param = [
            'action' => $this->action,
            'sesion' => $this->SessionParam
        ];
    }
}
