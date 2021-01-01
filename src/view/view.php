<?php

declare(strict_types=1);

namespace Idea\view;

class View
{
    public function __construct()
    {
    }
    private function renderHTML(string $name, string $path = '')
    {
        $path = DIR_TEMPLATE . $path . $name . '.php';
        try {
            if (is_file($path)) {
                require $path;
            } else {
                throw new \Exception('Can not open template ' . $name . ' in: ' . $path);
            }
        } catch (\Exception $e) {
            echo $e->getMessage() . '<br />
            File: ' . $e->getFile() . '<br />
            Code line: ' . $e->getLine() . '<br />
            Trace: ' . $e->getTraceAsString();
            exit;
        }
    }
    public function renderJSON($reply): void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($reply);
        exit;
    }
    public function layout($SessionParam): void
    {
        $accountRang = $SessionParam['rang'] ?? null;
        header('Content-type: text/html; charset=utf-8');

        $this->renderHTML('layout');
        $this->renderHTML('nav', 'page/');
    }
    public function create(): void
    {
        $this->renderHTML('createIdea', 'page/');
        $this->renderHTML('footer', 'page/');
    }
    public function list(): void
    {
        $this->renderHTML('listIdea', 'page/');
        $this->renderHTML('footer', 'page/');
    }
}
