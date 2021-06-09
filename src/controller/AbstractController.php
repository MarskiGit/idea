<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\View;


abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected const DEFAULT_ACTION_AJAX = 'exit';
    protected Request $Request;
    protected View $View;
    protected ?string $action_GET;
    protected array $requestParam;
    protected array $account;
    private ?string $requestAJAX;
    private bool $is_PHPInput;
    private bool $is_Get;

    public function __construct(Request $Request, View $View)
    {

        $this->Request = $Request;
        $this->View = $View;
        $this->is_PHPInput = $this->Request->is_PHPInput();
        $this->is_Get = $this->Request->is_Get();
        $this->account = $this->Request->getParam_SESSION();
        $this->init();
    }
    protected function token(): string
    {
        $rand_token = openssl_random_pseudo_bytes(16);
        return bin2hex($rand_token);
    }
    private function init(): void
    {

        if ($this->is_Get && !$this->is_PHPInput) {
            $this->action_GET = $this->Request->getParam_GET(DEFAULT_GET, self::DEFAULT_ACTION_HTML);
            $this->View->globalParams = [
                'action_GET' => $this->action_GET,
                'account' => $this->account,
            ];
            $this->renderPage();
        }

        if ($this->is_PHPInput) {
            $this->requestAJAX = $this->Request->getRequest_AJAX(DEFAULT_AJAX, self::DEFAULT_ACTION_AJAX);
            $this->requestParam = $this->Request->getParam_AJAX();
            $this->apiAjax();
        }
    }
    private function renderPage(): void
    {
        $method = $this->existsMethod($this->action_GET, self::DEFAULT_ACTION_HTML);

        if ($method !== 'logout' . DEFAULT_SUFIX_APP) {
            $this->View->layout();
            $this->$method();
            $this->View->footer();
        } else {
            $this->$method();
            exit;
        }
    }
    private function apiAjax(): void
    {
        $method = $this->existsMethod($this->requestAJAX, self::DEFAULT_ACTION_AJAX);
        $this->$method();
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
