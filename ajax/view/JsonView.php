<?php

declare(strict_types=1);

namespace Ajax\view;

use Ajax\model\IdeaListModel;
use Ajax\database\DB;


class JsonView
{
    private $DB;

    public function __construct()
    {
        $this->DB = DB::conn();
    }
    private function renderJSON($reply): void
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
