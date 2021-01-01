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
    protected const DEFAULT_ACTION = 'layout';


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
    final protected function redirect(array $params): void
    {
        if ($params) {
            $queryParams = [];
            foreach ($params as $key => $value) {
                var_dump($key);
                $queryParams[] = urlencode($key) . '=' . urlencode($value);
            }

            $queryParams = implode('&', $queryParams);
            $location = '?' . $queryParams;
        }

        header("Location: $location ");
        exit;
    }
    private function action(): string
    {
        return $this->Request->getparam('action', self::DEFAULT_ACTION);
    }
}
