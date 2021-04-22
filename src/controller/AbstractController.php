<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\View;

abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'home';
    protected const DEFAULT_ACTION_AJAX = 'exit';
    protected Request $Request;
    protected View $View;
    protected ?string $action_GET;
    protected array $requestParam;
    private ?string $requestAJAX;
    private bool $is_PHPInput;
    private bool $is_Get;

    public function __construct(Request $Request, View $View)
    {

        $this->Request = $Request;
        $this->View = $View;
        $this->is_PHPInput = $this->Request->is_PHPInput();
        $this->is_Get = $this->Request->is_Get();

        $this->init();
    }
    private function init(): void
    {

        if ($this->is_Get && !$this->is_PHPInput) {
            $this->action_GET = $this->Request->getParam_GET(DEFAULT_GET, self::DEFAULT_ACTION_HTML);
            dump($this->action_GET);
            $this->runPage();
        }

        if ($this->is_PHPInput) {
            $this->requestAJAX = $this->Request->getRequest_AJAX(DEFAULT_AJAX, self::DEFAULT_ACTION_AJAX);
            $this->requestParam = $this->Request->getParam_AJAX();
            $this->runAjax();
        }
    }
    private function runPage(): void
    {

        $method = $this->existsMethod($this->action_GET, self::DEFAULT_ACTION_HTML);
        $this->View->globalParams = $this->globalParams();
        $this->View->layout();

        $this->$method();

        $this->View->footer();
    }
    private function runAjax(): void
    {
        $method = $this->existsMethod($this->requestAJAX, self::DEFAULT_ACTION_AJAX);
        $this->$method();
    }
    private function globalParams(): array
    {
        return [
            'action_GET' => $this->action_GET,
        ];
    }
    private function existsMethod(string $checkMethod, string $default): string
    {
        $method  = $checkMethod . DEFAULT_SUFIX_APP;
        if (!method_exists($this, $method)) {
            $method  = $default . DEFAULT_SUFIX_APP;
        }
        return $method;
    }
}
