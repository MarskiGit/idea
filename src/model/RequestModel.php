<?php

declare(strict_types=1);

namespace Idea\model;

class RequestModel
{
    private array $get = [];
    private array $post = [];
    private array $server = [];
    private ?array $session;
    private ?string $phpInput;

    public function __construct(array $params)
    {
        $this->get = $params['get'];
        $this->post = $params['post'];
        $this->phpInput = $params['phpInput'];
        $this->server = $params['server'];
        $this->session = $params['session'];
    }
    public function getParam(string $name, $default = null)
    {
        return $this->get[$name] ?? $default;
    }
    public function postParam(string $name, $default = null)
    {
        return $this->post[$name] ?? $default;
    }
    public function phpInputParam(): ?array
    {
        return json_decode($this->phpInput, true);
    }
    public function sessionParam(string $session_name)
    {
        if (!empty($this->session[$session_name])) {
            return $this->session[$session_name];
        }
    }
    public function checkMethod(): string
    {
        if (!$this->hasphpInput() && $this->isGet() && !$this->isPost()) {
            return 'layout';
        }
        if ($this->hasPhpInput()) {
            if (array_key_exists('account', $this->phpInputParam())) {
                return 'account';
            }
            if (array_key_exists('table', $this->phpInputParam())) {
                return 'table';
            }
        }
    }
    private function isPost(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'POST';
    }
    private function isGet(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'GET';
    }
    private function hasPhpInput(): bool
    {
        return !empty($this->phpInput);
    }
}
