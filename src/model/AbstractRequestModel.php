<?php

declare(strict_types=1);

namespace Idea\model;

abstract class AbstractRequestModel
{
    protected const DEFAULT_ACTION_HTML = 'statistics';
    protected const DEFAULT_ACTION_AJAX = 'ideaList';
    protected array $get = [];
    protected array $post = [];
    protected array $server = [];
    protected ?string $phpInput;

    public function __construct(array $params)
    {
        $this->get = $params['get'];
        $this->post = $params['post'];
        $this->phpInput = $params['phpInput'];
        $this->server = $params['server'];
    }
    protected function getParam(string $name, $default = null)
    {
        return $this->get[$name] ?? $default;
    }
    protected function postParam(string $name, $default = null)
    {
        return $this->post[$name] ?? $default;
    }
    protected function isPost(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'POST';
    }
    protected function isGet(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'GET';
    }
    protected function hasPhpInput(): bool
    {
        return !empty($this->phpInput);
    }
    protected function phpInputParam(): ?array
    {
        return json_decode($this->phpInput, true);
    }
}
