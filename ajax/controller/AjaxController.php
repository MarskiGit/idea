<?php

declare(strict_types=1);

namespace Ajax\controller;

use Ajax\model\IdeaListModel;
use Ajax\view\JsonView;
use Ajax\view\PhpInput;

class AjaxController
{
    private const DEFAULT_ACTION_AJAX = 'listIdea';
    private PhpInput $PhpInput;
    private JsonView $JsonView;
    private array $param;


    public function __construct(PhpInput $PhpInput, JsonView $JsonView)
    {
        $this->PhpInput = $PhpInput;
        $this->JsonView = $JsonView;

        $this->run();
    }
    private function run(): void
    {
        if ($this->PhpInput->hasphpInput()) {

            $this->param = $this->PhpInput->InputParam();
            $action = $this->param['action'] . 'Ajax';

            if (!method_exists($this, $action)) {
                $action = self::DEFAULT_ACTION_AJAX . 'Ajax';
            } else {
                $this->$action();
            }
        }
    }
    private function listIdeaAjax(): void
    {
        $list = new IdeaListModel($this->param['last_result']);
        $this->JsonView->renderJSON($list->retrievingRecords());
    }
}
