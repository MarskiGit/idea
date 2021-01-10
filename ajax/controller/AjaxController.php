<?php

declare(strict_types=1);

namespace Ajax\controller;

use Ajax\model\IdeaListModel;
use Ajax\view\AjaxView;
use Ajax\view\PhpInput;

class AjaxController
{
    private const DEFAULT_ACTION_AJAX = 'ideaList';
    private PhpInput $PhpInput;
    private AjaxView $AjaxView;
    private array $param;


    public function __construct(PhpInput $PhpInput, AjaxView $AjaxView)
    {
        $this->PhpInput = $PhpInput;
        $this->AjaxView = $AjaxView;

        $this->run();
    }
    private function run(): void
    {
        if ($this->PhpInput->hasPhpInput()) {

            $this->param = $this->PhpInput->getParam_PhpInput();
            $action = $this->param['action'] . 'Ajax';
            if (!method_exists($this, $action)) {
                $action = self::DEFAULT_ACTION_AJAX . 'Ajax';
            } else {
                $this->$action();
            }
        }
    }
    private function ideaListAjax(): void
    {
        $ideaList = new IdeaListModel($this->param['last_result']);
        $this->AjaxView->renderJSON($ideaList->get());
    }
}
