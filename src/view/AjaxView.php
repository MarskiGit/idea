<?php

declare(strict_types=1);

namespace Idea\view;

use Idea\database\DB;
use Idea\model\IdeaListModel;

class AjaxView
{
    private $DB;

    public function __construct()
    {
        $this->DB = DB::conn();
    }
    public function renderJSON($reply): void
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($reply);
        exit;
    }
    public function renderList($lastResult)
    {
        $list = new IdeaListModel($lastResult, $this->DB);
        $this->renderJSON($list->retrievingRecords());
    }
}
