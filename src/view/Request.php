<?php

declare(strict_types=1);

namespace Idea\view;

class Request
{
    private array $get;
    private array $post;
    private array $server;

    public function __construct(array $params)
    {
        $this->get = $params['get'];
        $this->post = $params['post'];
        $this->server = $params['server'];
    }
    public function getParam_GET(string $name, $default = null): ?string
    {
        return $this->get[$name] ?? $default;
    }
    public function getParam_POST(string $name, $default = null): ?string
    {
        return $this->post[$name] ?? $default;
    }
    public function is_Post(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'POST';
    }
    public function is_Get(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'GET';
    }
    public function is_SESSION(): bool
    {
        return (session_status() == PHP_SESSION_ACTIVE);
    }
    public function getParam_SESSION(): array
    {
        return (isset($_SESSION['account'])) ? $_SESSION['account'] : $_SESSION;
    }
}
