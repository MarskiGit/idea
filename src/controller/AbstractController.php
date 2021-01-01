<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\RequestModel;
use Idea\view\View;
use Idea\exception\ConfigurationException;
use Idea\exception\NotFoundException;
use Idea\exception\StorageException;

abstract class AbstractController
{
    protected const DEFAULT_ACTION = 'statistics';
    protected RequestModel $Request;
    protected View $View;
    protected $Session;

    public function __construct(RequestModel $RequestModel, View $View)
    {
        $this->Request = $RequestModel;
        $this->View = $View;
        $this->SessionParam = $this->Request->sessionParam('account');
        $this->run();
    }
    final public function run(): void
    {
        $action = $this->action() . 'Idea';
        if (!method_exists($this, $action)) {
            $action = self::DEFAULT_ACTION . 'Idea';
        }
        $this->$action();
    }
    private function action(): string
    {
        return $this->Request->getparam('action', self::DEFAULT_ACTION);
    }
}
