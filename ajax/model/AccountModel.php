<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;

class AccountModel extends AjaxAbstractModel
{
    public function addAccount(): array
    {
        if (!$this->isNameValid()) {
            return $this->notification([
                'account' => 'Minimum 3 znaki',
                'valid' => 'name'
            ]);
        }

        if (!$this->isPasswdValid()) {
            return $this->notification([
                'account' => 'Minimum 8 znaków',
                'valid' => 'passwd'
            ]);
        }

        if ($this->checkUser('user_name', $this->requestParam['user_name'])) {
            return $this->notification([
                'account' => 'Użytkownik istnieje',
                'valid' => 'idName'
            ]);
        }

        if ($this->checkUser('user_number', $this->requestParam['user_number'])) {
            return $this->notification([
                'account' => 'Numer Identyfikacyjny istnieje',
                'valid' => 'idCard'
            ]);
        }

        $hash_2 = $this->hash($this->requestParam['password']);
        // id_area ustawione tymczasowo musi być przypisuwane do kontaa podczas tworzenia - do rozwiązania
        $temp = 1;
        try {
            $stmt = $this->DB->prepare('INSERT INTO account (id_area, user_name, account_passwd, account_rang) VALUES (:id_area, :user_name, :account_passwd, :account_rang)');
            $stmt->bindParam(':id_area', $temp, PDO::PARAM_INT);
            $stmt->bindParam(':user_name', $this->requestParam['user_name'], PDO::PARAM_STR);
            $stmt->bindParam(':account_rang', $this->requestParam['rang'], PDO::PARAM_INT);
            $stmt->bindParam(':account_passwd', $hash_2);
            $stmt->execute();
        } catch (PDOException) {
            throw new AjaxException('Błąd Add AccountModel');
        }

        $id = intval($this->DB->lastInsertId());
        return $this->notification([
            'account' => $id,
            'valid' => 'ok'
        ]);
    }
    public function login(): array
    {
        try {
            $stmt = $this->DB->prepare('SELECT * FROM account WHERE (user_name = :name) AND (account_enabled = 1)');
            $stmt->bindValue(':name', $this->requestParam['user_name'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException) {
            throw new AjaxException('Błąd Login AccountModel');
        }

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)) {
            if (password_verify($this->requestParam['password'], $row['account_passwd'])) {

                $user = [
                    'rang' => $row['account_rang'],
                    'name' => $this->requestParam['user_name'],
                    'id' => $row['id_user']
                ];
                $_SESSION['account'] = $user;

                return $this->notification(['account' => '1']);
            }
        }
        return $this->notification(['account' => '0']);
    }
    public function logout(): array
    {
        if (session_status() == PHP_SESSION_ACTIVE) {
            unset($_SESSION['account']);
            return $this->notification(['account' => '1']);
        }
    }
    private function isNameValid(): bool
    {
        $valid = true;
        $len = mb_strlen($this->requestParam['user_name']);
        if (($len < 3) || ($len > 16)) {
            $valid = false;
        }
        return $valid;
    }
    private function isPasswdValid(): bool
    {
        $valid = true;
        $len = mb_strlen($this->requestParam['password']);
        if (($len < 8) || ($len > 16)) {
            $valid = false;
        }
        return $valid;
    }
    private function checkUser(string $tuple, $value): bool
    {
        $id = false;
        try {
            $stmt = $this->DB->prepare("SELECT  {$tuple} FROM account WHERE ({$tuple}= :value)");
            $stmt->bindValue(':value', $value, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException) {
            throw new AjaxException('Błąd ID Card AccountModel');
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)) {
            $id = true;
        }
        return $id;
    }
    private function hash(string $value): string
    {
        return password_hash($value, PASSWORD_BCRYPT);
    }
}
