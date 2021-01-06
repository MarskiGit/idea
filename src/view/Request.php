<?php

declare(strict_types=1);

namespace Idea\view;

class Request
{
    private const DEFAULT_ACTION_HTML = 'statistics';
    private array $get = [];
    private array $post = [];
    private array $server = [];

    public function __construct(array $params)
    {
        $this->get = $params['get'];
        $this->post = $params['post'];
        $this->server = $params['server'];
    }
    public function getParam(string $name, $default = null)
    {
        return $this->get[$name] ?? $default;
    }
    public function postParam(string $name, $default = null)
    {
        return $this->post[$name] ?? $default;
    }
    public function isPost(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'POST';
    }
    public function isGet(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'GET';
    }
    public function sessionParam(string $session_name)
    {
        return (!empty($this->session[$session_name])) ? $this->session[$session_name] : 0;
    }
}
