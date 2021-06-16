<?php

declare(strict_types=1);

namespace Api\model;

use Api\database\DB;
use Api\exception\ApiException;
use PDO;
use PDOException;


abstract class AbstractModel
{
    protected ?PDO $DB;
    public function __construct()
    {
        $this->DB = DB::conn();
    }
    protected function responseAPI(array $data = [], bool $is_ok = false): array
    {
        $replay = [
            'api' => $is_ok,
        ];
        if (!$is_ok) {
            $replay =  array_merge($replay, $data);
        } else {
            $replay['data'] = $data;
        }
        return $replay;
    }
    protected function isThere(string $tuple, string $value, string $from): bool
    {
        $id = false;
        try {
            $stmt = $this->DB->prepare("SELECT  {$tuple} FROM {$from} WHERE ({$tuple}= :value)");
            $stmt->bindValue(':value', $value, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Błąd ID Is There');
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
        $len = strlen($name);
        if (($len < 3) || ($len > 16)) {
            $valid = false;
        }
        return $valid;
    }
    protected function isPasswdValid(string $password): bool
    {
        $valid = true;
        $len = strlen($password);
        if ($len < 8) {
            $valid = false;
        }
        return $valid;
    }
    protected function hash(string $value): string
    {
        return password_hash($value, PASSWORD_BCRYPT);
    }
    protected function escape(string $data): string
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    protected function arraySQL(array $insData): string
    {
        return json_encode($insData);
    }
    protected  function yearQuarter(): int
    {
        $month = date("n");
        return (int)ceil($month / 3);
    }
}
