<?php

declare(strict_types=1);

namespace Api\controller;

use Api\view\Request;
use Api\view\View;
use Api\model\CsrfModel;


abstract class AbstractController
{
    protected const DEFAULT_ACTION_API = 'exit';
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
        if ($this->is_PHPInput) {
            $this->requestParam = $this->Request->getParam_AJAX();
            if (CsrfModel::verifyToken($this->requestParam['token'], 'Token')) {
                $this->requestAJAX = $this->Request->getRequest_AJAX(DEFAULT_API, self::DEFAULT_ACTION_API);
                $this->apiAjax();
            } else {
                $replay = [
                    'api' => false,
                    'type' => 'AUTHORIZATION',
                    'title' => 'WRONG TOKEN',
                ];
                echo json_encode($replay);
            }
        }
    }

    private function apiAjax(): void
    {
        $method = $this->existsMethod($this->requestAJAX, self::DEFAULT_ACTION_API);
        $this->$method();
    }
    private function existsMethod(string $checkMethod, string $default): string
    {
        $method  = $checkMethod . DEFAULT_SUFIX_API;
        if (!method_exists($this, $method)) {
            $method  = $default . DEFAULT_SUFIX_API;
        }
        return $method;
    }
}
