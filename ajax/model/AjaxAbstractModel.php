<?php

declare(strict_types=1);


namespace Ajax\model;

use Ajax\database\DB;

use PDO;

abstract class AjaxAbstractModel
{
    protected ?PDO $DB;
    protected array $requestParam;
    public function __construct(array $requestParam)
    {
        $this->DB = DB::conn();
        $this->requestParam = $requestParam;
    }
    protected function answer($param, $message = ''): array
    {
        $answer = array($param => $message);
        return $answer;
    }
    protected function notification($message): array
    {
        return [$message];
    }
}
