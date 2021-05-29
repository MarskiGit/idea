<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\database\DB;
use Idea\exception\AjaxException;
use PDO;
use PDOException;


abstract class AbstractModel
{
    protected ?PDO $DB;
    public function __construct()
    {
        $this->DB = DB::conn();
    }
    protected function notification($message): array
    {
        return is_array($message) ? $message : [$message];
    }
    protected function isThere(string $tuple, string $value, string $from): bool
    {
        $id = false;
        try {
            $stmt = $this->DB->prepare("SELECT  {$tuple} FROM {$from} WHERE ({$tuple}= :value)");
            $stmt->bindValue(':value', $value, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd ID Is There');
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)) {
            $id = true;
        }
        return $id;
    }
    protected  function isNameValid($name): bool
    {
        $valid = true;
        $len = mb_strlen($name);
        if (($len < 3) || ($len > 16)) {
            $valid = false;
        }
        return $valid;
    }
    protected function testInput(string $data): string
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
}
