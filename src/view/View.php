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
    public function offerIdea(array $pageParams): void
    {
        $this->renderHTML('offer', 'page/', $pageParams);
    }
    public function list(array $pageParams): void
    {
        $this->renderHTML('list', 'page/', $pageParams);
    }
    public function login(array $pageParams): void
    {
        $this->renderHTML('login', 'page/', $pageParams);
    }
    public function admin(array $pageParams): void
    {
        $this->renderHTML('admin', 'admin/', $pageParams);
    }

    public function mod(): void
    {
        $this->renderHTML('mod', 'mod/');
    }

    public function homeAdmin(): void
    {
        $this->renderHTML('home', 'admin/',);
    }
    public function pointsAdmin(): void
    {
        $this->renderHTML('points', 'admin/',);
    }
    public function managementAdmin(): void
    {
        $this->renderHTML('management', 'admin/',);
    }
    public function areaAdmin(array $pageParams): void
    {
        $this->renderHTML('area', 'admin/', $pageParams);
    }
    public function userAdmin(array  $areaParams): void
    {
        $this->renderHTML('user', 'admin/', $areaParams);
    }

    public function renderJSON(array $answer): void
    {
        echo json_encode($answer);
        exit;
    }
    private function renderHTML(string $name, string $path = '', array $pageParams = []): void
    {
        $path = DIR_TEMPLATE . $path . $name . '.php';
        try {
            if (is_file($path)) {
                $globalParams = $this->globalParams;
                require $path;
            } else {
                throw new IdeaException('Błąd otwarcia szablonu' . $name . ' in: ' . $path);
            }
        } catch (Exception $e) {
            throw new IdeaException('Błąd Renderowania Strony');
        }
    }
}
