<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;

class AccountModel extends AjaxAbstractModel
{
    public Session $Session;
    private array $request;
    private array $answer;
    private ?int $id;
    private ?int $rang;
    private ?string $name;
    private bool $authenticated;
    public function __construct()
    {
    }
    public function addAccount(): array
    {
        if (!$this->isNameValid()) {
            return $this->answer(1);
        }

        if (!$this->isPasswdValid()) {
            return $this->answer(2);
        }

        if (!is_null($this->getIdFromName())) {
            return $this->answer(3);
        }

        $hash_2 = $this->hash($this->request['password']);
        $values = [':name' => $this->request['username'], ':passwd' => $hash_2, ':account_rang' => $this->request['rang']];

        try {
            $stmt = $this->DB->prepare('INSERT INTO accounts (account_name, account_passwd, account_rang) VALUES (:name, :passwd, :account_rang)');
            $stmt->execute($values);
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Add AccountModel');
        }

        $id = intval($this->DB->lastInsertId());
        return $this->answer($id);
    }
    public function login($request): array
    {
        $this->request = $request;
        if (!$this->isNameValid($request)) {
            return  $this->answer(0);
        }
        if (!$this->isPasswdValid()) {
            return  $this->answer(0);
        }

        try {
            $stmt = $this->DB->prepare('SELECT * FROM accounts WHERE (account_name = :name) AND (account_enabled = 1)');
            $stmt->bindValue(':name', $request['username'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Login AccountModel');
        }

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)) {
            if (password_verify($this->request['password'], $row['account_passwd'])) {
                $this->id = intval($row['account_id'], 10);
                $this->name = $this->request['username'];
                $this->authenticated = true;
                $this->rang = (int) $row['account_rang'];

                $user = [
                    'rang' => $row['account_rang'],
                    'name' => $this->request['username'],
                    'id' => $row['account_id']
                ];
                $_SESSION['account'] = $user;

                return $this->answer(1);
            }
        }
        return $this->answer(0);
    }
    public function logout()
    {
        if (session_status() == PHP_SESSION_ACTIVE) {
            $this->id = null;
            $this->name = null;
            $this->authenticated = false;
            unset($_SESSION['account']);
            return $this->answer(0);
        }
    }
    private function isNameValid(): bool
    {
        $valid = true;
        $len = mb_strlen($this->request['username']);
        if (($len < 8) || ($len > 16)) {
            $valid = false;
        }
        return $valid;
    }
    private function isPasswdValid(): bool
    {
        $valid = true;
        $len = mb_strlen($this->request['password']);
        if (($len < 8) || ($len > 16)) {
            $valid = false;
        }
        return $valid;
    }
    private function getIdFromName(): ?int
    {
        $id = null;
        try {
            $stmt = $this->DB->prepare('SELECT account_id FROM accounts WHERE (account_name = :name)');
            $stmt->bindValue(':name', $this->request['username'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd ID AccountModel');
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)) {
            $id = intval($row['account_id'], 10);
        }
        return $id;
    }
    private function hash(string $value): string
    {
        $bytes = random_bytes(22);
        $options  = [
            'cost' => 11,
            'salt' => bin2hex($bytes),
        ];
        $hash_2 = password_hash($value, PASSWORD_BCRYPT, $options);
        return $hash_2;
    }
}
