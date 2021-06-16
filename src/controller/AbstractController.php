<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\View;
use Idea\model\CsrfModel;


abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected const DEFAULT_ACTION_AJAX = 'exit';
    protected Request $Request;
    protected View $View;
    protected ?string $action_GET;
    protected array $requestParam;
    protected array $account;
    private bool $is_Get;

    public function __construct(Request $Request, View $View)
    {
        $this->Request = $Request;
        $this->View = $View;
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
        if ($this->is_Get) {
            CsrfModel::setNewToken('Token');
            $this->action_GET = $this->Request->getParam_GET(DEFAULT_GET, self::DEFAULT_ACTION_HTML);
            $this->View->globalParams = [
                'action_GET' => $this->action_GET,
                'account' => $this->account,
                'Token' => CsrfModel::viewToken('Token'),
            ];
            $this->renderPage();
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
    private function existsMethod(string $checkMethod, string $default): string
    {
        $method  = $checkMethod . DEFAULT_SUFIX_APP;
        if (!method_exists($this, $method)) {
            $method  = $default . DEFAULT_SUFIX_APP;
        }
        return $method;
    }
}
