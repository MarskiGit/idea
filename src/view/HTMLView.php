<?php

declare(strict_types=1);

namespace Idea\view;

class HTMLView
{
    public function __construct()
    {
    }
    private function renderHTML(string $name, string $path = '', $param = null)
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
    public function layout($param): void
    {
        header('Content-type: text/html; charset=utf-8');
        $this->renderHTML('layout', '', $param);
    }
    public function create(): void
    {
        $this->renderHTML('createIdea', 'page/');
    }
    public function list(): void
    {
        $this->renderHTML('listIdea', 'page/');
    }
    public function statistics(): void
    {
        $this->renderHTML('statisticsIdea', 'page/');
    }
    public function footer(): void
    {
        $this->renderHTML('footer', 'page/');
    }
}
