<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\database\DB;

use PDO;


abstract class AbstractModel
{
    protected ?PDO $DB;
    protected array $requestParam;
    public function __construct(array $requestParam = ['null'])
    {
        $this->DB = DB::conn();
        $this->requestParam = $requestParam;
    }
    protected function notification($message): array
    {
        return is_array($message) ? $message : [$message];
    }
}
