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
    public function response_Api(array $answer): void
    {
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode($answer);
    }
    public function layout(): void
    {
        header('Content-Type: text/html; charset=utf-8');
        header("Cache-Control: public, max-age=31536000, immutable");
        $this->viewHTML('layout', '');
    }
    public function statistics(): void
    {
        $this->viewHTML('statistics', 'page/',);
    }
    public function footer(): void
    {
        $this->viewHTML('footer', 'page/');
    }
    public function formOffer(array $pageParams): void
    {
        $this->viewHTML('formOffer', 'page/', $pageParams);
    }
    public function listOffers(): void
    {
        $this->viewHTML('listOffers', 'page/');
    }
    public function login(): void
    {
        $this->viewHTML('login', 'page/');
    }
    public function panel_Admin(array $pageParams): void
    {
        $this->viewHTML('admin', 'admin/', $pageParams);
    }
    public function home_Admin(): void
    {
        $this->viewHTML('home', 'admin/',);
    }
    public function points_Admin(): void
    {
        $this->viewHTML('points', 'admin/',);
    }
    public function management_Admin(): void
    {
        $this->viewHTML('management', 'admin/',);
    }
    public function area_Admin(array $pageParams): void
    {
        $this->viewHTML('area', 'admin/', $pageParams);
    }
    public function user_Admin(array  $areaParams): void
    {
        $this->viewHTML('user', 'admin/', $areaParams);
    }
    public function panel_Mod(): void
    {
        $this->viewHTML('mod', 'mod/');
    }
    private function viewHTML(string $name, string $path = '', array $pageParams = []): void
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
