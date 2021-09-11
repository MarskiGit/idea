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
    public function init(): void
    {
        switch ($this->Request->getIndex()) {
            case 'page':
                $this->initPage();
                $this->renderPage();
                break;
            case 'api':
                if (XCsrfModel::verifyToken($this->Request->getToken(), 'Token')) {
                    $this->initApi();
                    $this->renderApi();
                } else {
                    header("HTTP/1.1 401 Unauthorized");
                    $this->notFoundResponse('401', 'AUTHORIZATION', 'WRONG TOKEN');
                }
                break;
            default:
                header("HTTP/1.1 501 Not Implemented");
                break;
        }
    }

    private function initPage(): void
    {
        XCsrfModel::setNewToken('Token');
        $this->action_GET = $this->Request->getParam_GET(DEFAULT_GET, self::DEFAULT_ACTION_HTML);
        $this->View->globalParams = [
            'action_GET' => $this->action_GET,
            'account' => $this->account,
            'supportJS' => $this->getBrowser(),
        ];
    }
    private function initApi(): void
    {
        switch ($this->Request->getMethod()) {
            case 'GET':
                $this->requestAJAX = $this->Request->getParam_GET(DEFAULT_API, self::DEFAULT_ACTION_API);
                $this->requestParam = $this->Request->getParams_GET();
                break;
            case 'POST':
                $this->requestParam = $this->Request->getParam_AJAX();
                $this->requestAJAX = $this->Request->getRequest_AJAX(DEFAULT_API, self::DEFAULT_ACTION_API);
                break;
            default:
                header("HTTP/1.1 501 Not Implemented");
                $this->notFoundResponse('501', 'SERWER', 'Not Implemented');
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
        } else if ($method === 'logout' . DEFAULT_SUFIX_IDEA) {
            $this->$method();
            exit;
        }
    }
    private function renderApi(): void
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
    private function notFoundResponse(string $error, string $type, string $title): void
    {
        $replay =
            [
                'api' => $error,
                'type' => $type,
                'title' => $title,
            ];

        echo json_encode($replay);
    }
    private function getBrowser(): bool
    {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $browser = false;
        $browsers = array(
            '/msie/i' => false,
            '/firefox/i' => false,
            '/safari/i' => false,
            '/chrome/i' => true,
            '/edge/i' => true,
            '/opera/i' => false,
            '/mobile/i' => false
        );
        foreach ($browsers as $regex => $value) {
            if (preg_match($regex, $user_agent)) {
                $browser = $value;
            }
        }
        return $browser;
    }
}
