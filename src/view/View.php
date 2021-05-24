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
    public function addIdea($pageParams): void
    {
        $this->renderHTML('idea', 'page/', $pageParams);
    }
    public function list(): void
    {
        $this->renderHTML('list', 'page/');
    }
    public function login($token): void
    {
        $this->renderHTML('login', 'page/', $token);
    }
    public function admin($admin_GET): void
    {
        $this->renderHTML('admin', 'admin/', $admin_GET);
    }
    public function mod(): void
    {
        $this->renderHTML('mod', 'mod/');
    }
    public function areaAdmin(): void
    {

        $this->renderHTML('area', 'admin/',);
    }
    public function userAdmin(): void
    {
        $this->renderHTML('user', 'admin/',);
    }
    public function statisticsAdmin(): void
    {
        $this->renderHTML('statistics', 'admin/',);
    }
    public function homeAdmin(): void
    {
        $this->renderHTML('home', 'admin/',);
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
        } catch (Exception $e) {
            throw new IdeaException('Błąd Renderowania Strony');
        }
    }
}
