<?php

declare(strict_types=1);

namespace Idea\view;

use Idea\exception\IdeaException;
use Exception;

class View
{
    public array $globalParams;
    public function __construct()
    {
    }
    public function layout(): void
    {
        $this->renderHTML('layout', '');
    }
    public function home(): void
    {
        $this->renderHTML('home', 'page/');
    }
    public function footer(): void
    {
        $this->renderHTML('footer', 'page/');
    }
    public function create($pageParams): void
    {
        $this->renderHTML('form', 'page/', $pageParams);
    }
    public function list(): void
    {
        $this->renderHTML('list', 'page/');
    }
    public function signin(): void
    {
        $this->renderHTML('signin', 'page/');
    }
    public function account(): void
    {
        $this->renderHTML('account', 'page/');
    }
    public function registration(): void
    {
        $this->renderHTML('registration', 'page/');
    }
    public function renderJSON(array $answer): void
    {
        echo json_encode($answer);
        exit;
    }
    private function renderHTML(string $name, string $path = '', $pageParams = null): void
    {
        $path = DIR_TEMPLATE . $path . $name . '.php';
        try {
            if (is_file($path)) {
                $globalParams = $this->globalParams;
                require $path;
            } else {
                throw new IdeaException('Błąd otwarcia szablonu' . $name . ' in: ' . $path);
            }
        } catch (Exception) {
            throw new IdeaException('Błąd Renderowania Strony');
        }
    }
}
