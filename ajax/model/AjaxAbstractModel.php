<?php

declare(strict_types=1);


namespace Ajax\model;

use Ajax\database\DB;

use PDO;

abstract class AjaxAbstractModel
{
    protected ?PDO $DB;

    protected int $dbh_limit;
    protected array $dbh_result;
    protected $dbh_count;
    protected array $json_dbh = ['list' => null];
    public function __construct($obj)
    {
        $this->DB = DB::conn();
        $this->dbh_limit = $obj;
        $this->dbh_count = null;
    }
}
