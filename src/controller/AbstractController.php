<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\RequestModel;
use Idea\view\HTMLView;
use Idea\exception\ConfigurationException;
use Idea\exception\NotFoundException;
use Idea\exception\StorageException;

abstract class AbstractController
{
    protected const DEFAULT_ACTION = 'statistics';
    protected RequestModel $Request;
    protected HTMLView $HTMLView;
    protected $SessionParam;
    protected string $action;

    public function __construct(RequestModel $RequestModel, HTMLView $HTMLView)
    {
        $this->Request = $RequestModel;
        $this->HTMLView = $HTMLView;
        $this->SessionParam = $this->Request->sessionParam('account');

        $this->run();
    }
    final public function run(): void
    {

        $action = $this->action() . 'Idea';
        $this->action = $action;
        if (!method_exists($this, $action)) {
            $action = self::DEFAULT_ACTION . 'Idea';
        }
        $this->$action();
    }
    private function action(): string
    {
        return $this->Request->checkRequest();
    }
}
