<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\database\DB;

use PDO;

abstract class AbstractModel
{
    protected PDO $DB;
    public function __construct()
    {
        $this->DB = DB::conn();
    }
}
