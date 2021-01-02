<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\view\AjaxView;
use Idea\model\RequestAjaxModel;

class AjaxController
{
    protected const DEFAULT_ACTION_AJAX = 'ideaList';
    protected RequestAjaxModel $RequestAjax;
    protected AjaxView $AjaxView;

    public function __construct(RequestAjaxModel $RequestAjax, AjaxView $AjaxView)
    {
        $this->RequestAjax = $RequestAjax;
        $this->AjaxView = $AjaxView;

        $this->run();
    }
    private function run(): void
    {
        if (!is_null($this->action())) {
            $this->action = $this->action();
            $action = $this->action['action'] . 'Ajax';

            if (!method_exists($this, $action)) {
                $action = self::DEFAULT_ACTION_AJAX . 'Ajax';
            }
            $this->$action();
        }
    }
    private function action(): ?array
    {
        return $this->RequestAjax->checkRequest();
    }
    private function ideaListAjax()
    {
        $this->AjaxView->renderList($this->action['last_result']);
    }
}
