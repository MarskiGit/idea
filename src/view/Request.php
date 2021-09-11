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
    private string $index;

    public function __construct(array $params)
    {
        $this->get = $params['get'];
        $this->post = $params['post'];
        $this->phpInput =  $params['phpInput'];
        $this->server = $params['server'];
        $this->token = $params['token'];
        $this->index = $params['index'];
    }
    public function getIndex(): string
    {
        return $this->index;
    }
    public function getParam_GET(string $name, $default = null): ?string
    {
        return $this->get[$name] ?? $default;
    }
    public function getParams_GET()
    {
        $indexCompleted = array_search('request', $this->get);
        unset($this->get[$indexCompleted]);
        return $this->get;
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
        return  $_SESSION[$name] ?? ['rang' => 0];
    }
    public function getToken(): string
    {
        return $this->token;
    }
    public function getMethod(): string
    {
        return $this->server['REQUEST_METHOD'];
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
