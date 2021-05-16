<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;

class AccountModel extends AbstractModel
{
    public function addAccount(): array
    {
        if (!$this->isNameValid()) {
            return $this->notification([
                'ok' => false,
                'title' => 'Imię i Nazwisko',
                'account' => 'Minimum 3 znaki',
                'valid' => 'name'
            ]);
        }

        if (!$this->isPasswdValid()) {
            return $this->notification([
                'ok' => false,
                'title' => 'Hasło',
                'account' => 'Minimum 8 znaków',
                'valid' => 'passwd'
            ]);
        }

        if ($this->checkUser('full_name', $this->requestParam['full_name'])) {
            return $this->notification([
                'ok' => false,
                'title' => 'Ten',
                'account' => 'Użytkownik istnieje',
                'valid' => 'idName'
            ]);
        }

        if ($this->checkUser('id_pass', $this->requestParam['id_pass'])) {
            return $this->notification([
                'ok' => false,
                'title' => 'Ten',
                'account' => 'Numer Identyfikacyjny istnieje',
                'valid' => 'idPass'
            ]);
        }

        $hash_2 = $this->hash($this->requestParam['password']);
        // id_area ustawione tymczasowo musi być przypisuwane do kontaa podczas tworzenia - do rozwiązania
        $temp = 1;
        try {
            $stmt = $this->DB->prepare('INSERT INTO account (id_area, full_name, account_login, id_pass, rang, account_password) VALUES (:id_area, :full_name, :account_login, :id_pass, :rang, :account_password)');
            $stmt->bindParam(':id_area', $temp, PDO::PARAM_INT);
            $stmt->bindParam(':full_name', $this->requestParam['full_name'], PDO::PARAM_STR);
            $stmt->bindParam(':account_login', $this->requestParam['login'], PDO::PARAM_STR);
            $stmt->bindParam(':id_pass', $this->requestParam['id_pass'], PDO::PARAM_INT);
            $stmt->bindParam(':rang', $this->requestParam['rang'], PDO::PARAM_INT);
            $stmt->bindParam(':account_password', $hash_2);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Added Accound');
        }

        $id = intval($this->DB->lastInsertId());
        return $this->notification([
            'ok' => true,
            'account' => $id,
        ]);
    }
    public function login(): array
    {
        try {
            $stmt = $this->DB->prepare('SELECT id_account, full_name, account_password, rang FROM account WHERE (account_login = :account_login) AND (active = 1)');
            $stmt->bindValue(':account_login', $this->requestParam['login'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Login AccountModel');
        }

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)) {
            if (password_verify($this->requestParam['password'], $row['account_password'])) {

                $user = [
                    'rang' => $row['rang'],
                    'name' => $row['full_name'],
                    'id' => $row['id_account']
                ];
                $_SESSION['account'] = $user;

                return $this->notification(['ok' => true]);
            }
        }
        return $this->notification(['ok' => false]);
    }
    public function logout(): array
    {
        if (session_status() == PHP_SESSION_ACTIVE) {
            unset($_SESSION['account']);
            session_destroy();

            return $this->notification(['ok' => true]);
        }
    }
    private function isNameValid(): bool
    {
        $valid = true;
        $len = mb_strlen($this->requestParam['full_name']);
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
        } catch (PDOException $e) {
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
