<?php

declare(strict_types=1);

namespace Idea\view;

class Request
{
    private array $get;
    private array $post;
    private string $phpInput;
    private array $server;
    private string $token;

    public function __construct(array $params)
    {
        $this->get = $params['get'];
        $this->post = $params['post'];
        $this->phpInput =  $params['phpInput'];
        $this->server = $params['server'];
        $this->token = $params['token'];
    }
    public function getParam_GET(string $name, $default = null): ?string
    {
        return $this->get[$name] ?? $default;
    }
    public function getParam_POST(string $name, $default = null): ?string
    {
        return $this->post[$name] ?? $default;
    }
    public function getRequest_AJAX(string $name, $default = null): ?string
    {
        $temp = json_decode($this->phpInput);
        return $temp->$name ?? $default;
    }
    public function getParam_AJAX(): ?array
    {
        return json_decode($this->phpInput, true);
    }
    public function getParam_SESSION(string $name): array
    {
        return  $_SESSION[$name] ?? [];
    }
    public function getToken(): string
    {
        return $this->token;
    }
    public function is_Post(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'POST';
    }
    public function is_Get(): bool
    {
        return $this->server['REQUEST_METHOD'] === 'GET';
    }
    public function is_PHPInput(): bool
    {
        return !empty($this->phpInput);
    }
    public function is_SESSION(): bool
    {
        return (session_status() == PHP_SESSION_ACTIVE);
    }
}
