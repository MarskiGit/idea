<?php

declare(strict_types=1);


namespace Ajax\model;

use Ajax\database\DB;

use PDO;

session_start();
abstract class AjaxAbstractModel
{
    protected ?PDO $DB;
    protected array $requestParam;
    public function __construct(array $requestParam)
    {
        $this->DB = DB::conn();
        $this->requestParam = $requestParam;
    }
    protected function notification($message): array
    {
        return is_array($message) ? $message : [$message];
    }
}
