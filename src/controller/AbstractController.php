<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\Request;
use Idea\view\View;
use Idea\model\XCsrfModel;


abstract class AbstractController
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected const DEFAULT_ACTION_API = 'exit';
    protected Request $Request;
    protected View $View;
    protected ?string $action_GET;
    protected array $requestParam;
    protected array $account;
    private ?string $requestAJAX;


    public function __construct(Request $Request, View $View)
    {
        $this->Request = $Request;
        $this->View = $View;
        $this->account = $this->Request->getParam_SESSION('account');
        $this->init();
    }
    private function init(): void
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        switch ($requestMethod) {
            case 'GET':
                XCsrfModel::setNewToken('Token');
                $this->action_GET = $this->Request->getParam_GET(DEFAULT_GET, self::DEFAULT_ACTION_HTML);
                $this->View->globalParams = [
                    'action_GET' => $this->action_GET,
                    'account' => $this->account,
                ];
                $this->renderPage();
                break;
            case 'POST':
                $this->requestParam = $this->Request->getParam_AJAX();
                if (XCsrfModel::verifyToken($this->Request->getToken(), 'Token')) {
                    $this->requestAJAX = $this->Request->getRequest_AJAX(DEFAULT_API, self::DEFAULT_ACTION_API);
                    $this->apiAjax();
                } else {
                    $replay =
                        [
                            'api' => false,
                            'type' => 'AUTHORIZATION',
                            'title' => 'WRONG TOKEN',
                        ];
                    echo json_encode($replay);
                }
                break;

            default:
                header("Location:" . HTTP_SERVER);
                break;
        }
    }
    private function renderPage(): void
    {
        $method = $this->existsMethod($this->action_GET, self::DEFAULT_ACTION_HTML, DEFAULT_SUFIX_IDEA);
        if ($method !== 'logout' . DEFAULT_SUFIX_IDEA) {
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
        $method = $this->existsMethod($this->requestAJAX, self::DEFAULT_ACTION_API, DEFAULT_SUFIX_API);
        $this->$method();
    }
    private function existsMethod(string $checkMethod, string $default, string $sufix): string
    {
        $method  = $checkMethod . $sufix;
        if (!method_exists($this, $method)) {
            $method  = $default . $sufix;
        }
        return $method;
    }
}
