<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\Csrf;
use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;

class AccountModel extends AbstractModel implements ModelInterface
{
    public function get(): array
    {
        try {
            $stmt = $this->DB->query("SELECT id_account, full_name, id_pass, rang, active FROM account ");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error: Get List UserModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            return $result;
        } else {
            $ok['ok'] = false;
            $result[] = $ok;
            return $result;
        }
    }
    public function create(array $requestParam): array
    {
        if (!$this->isNameValid($requestParam['full_name'])) {
            return $this->notification([
                'ok' => false,
                'title' => 'Imię i Nazwisko',
                'account' => 'Minimum 3 znaki',
                'valid' => 'name'
            ]);
        }

        if (!$this->isPasswdValid($requestParam['password'])) {
            return $this->notification([
                'ok' => false,
                'title' => 'Hasło',
                'account' => 'Minimum 8 znaków',
                'valid' => 'passwd'
            ]);
        }

        if ($this->isThere('full_name', $requestParam['full_name'], 'account')) {
            return $this->notification([
                'ok' => false,
                'title' => 'Ten',
                'account' => 'Użytkownik istnieje',
                'valid' => 'idName'
            ]);
        }

        if ($this->isThere('id_pass', $requestParam['id_pass'], 'account')) {
            return $this->notification([
                'ok' => false,
                'title' => 'Ten',
                'account' => 'Login istnieje',
                'valid' => 'idPass'
            ]);
        }

        if ($this->isThere('account_login', $requestParam['login'], 'account')) {
            return $this->notification([
                'ok' => false,
                'title' => 'Ten',
                'account' => 'Numer Identyfikacyjny istnieje',
                'valid' => 'idPass'
            ]);
        }

        $hash_2 = $this->hash($requestParam['password']);
        // id_area ustawione tymczasowo musi być przypisuwane do kontaa podczas tworzenia - do rozwiązania
        $temp = 1;
        try {
            $stmt = $this->DB->prepare('INSERT INTO account (id_area, full_name, account_login, id_pass, rang, account_password) VALUES (:id_area, :full_name, :account_login, :id_pass, :rang, :account_password)');
            $stmt->bindParam(':id_area', $temp, PDO::PARAM_INT);
            $stmt->bindParam(':full_name', $requestParam['full_name'], PDO::PARAM_STR);
            $stmt->bindParam(':account_login', $requestParam['login'], PDO::PARAM_STR);
            $stmt->bindParam(':id_pass', $requestParam['id_pass'], PDO::PARAM_INT);
            $stmt->bindParam(':rang', $requestParam['rang'], PDO::PARAM_INT);
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
    public function edit(array $requestParam)
    {
        try {
            $stmt = $this->DB->prepare('UPDATE account SET id_area = :id_area, full_name = :full_name, account_login = :account_login, id_pass = :id_pass, rang = :rang, account_password = :account_password, active = :active WHERE id_account = :id_account');
            $stmt->bindValue(':id_account', $requestParam['id_account'], PDO::PARAM_INT);
            $stmt->bindValue(':id_area', $requestParam['id_area'], PDO::PARAM_INT);
            $stmt->bindValue(':full_name', $requestParam['full_name'], PDO::PARAM_STR);
            $stmt->bindValue(':account_login', $requestParam['account_login'], PDO::PARAM_STR);
            $stmt->bindValue(':id_pass', $requestParam['id_pass'], PDO::PARAM_INT);
            $stmt->bindValue(':rang', $requestParam['rang'], PDO::PARAM_INT);
            $stmt->bindValue(':account_password', $requestParam['account_password'], PDO::PARAM_STR);
            $stmt->bindValue(':active', $requestParam['active'], PDO::PARAM_INT);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Login AccountModel');
        }
    }
    public function delete(array $requestParam)
    {
    }
    public function search(array $requestParam): array
    {
        $search = "%" . $requestParam['full_name'] . "%";
        try {
            $stmt = $this->DB->prepare("SELECT id_account, id_area, full_name FROM account WHERE " . $requestParam['select'] . " LIKE :name LIMIT 3");
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd User Search IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            $ok['ok'] = true;
            array_unshift($result, $ok);
            return $result;
        } else {
            $result[] = ['full_name' => 'Nie odnaleziono', 'ok' => false];
            return $this->notification($result);
        }
    }
    public function login(array $requestParam): array
    {
        if (Csrf::verifyToken($requestParam['token'], 'login')) {
            try {
                $stmt = $this->DB->prepare('SELECT id_account, full_name, account_password, account_login, rang FROM account WHERE (account_login = :account_login) AND (active = 1)');
                $stmt->bindValue(':account_login', $requestParam['login'], PDO::PARAM_STR);
                $stmt->execute();
            } catch (PDOException $e) {
                throw new AjaxException('Błąd Login AccountModel');
            }

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (is_array($row) && password_verify($requestParam['password'], $row['account_password']) && $requestParam['login'] === $row['account_login']) {
                $_SESSION['account'] = [
                    'rang' => $row['rang'],
                    'name' => $row['full_name'],
                    'id' => $row['id_account'],
                    'currentTime' => date("H:i:s"),
                ];
                return $this->notification(['ok' => true]);
            } else {
                return $this->notification([
                    'ok' => false,
                    'title' => 'Podano błędne dane logowania'
                ]);
            }
        } else {
            return $this->notification([
                'ok' => false,
                'title' => 'Błędny token logowania'
            ]);
        }
    }
    public static function logout(): void
    {
        if (session_status() == PHP_SESSION_ACTIVE) {
            Csrf::removeTokens('login');
            unset($_SESSION['account']);
            session_destroy();
        }
    }
    private function isPasswdValid(string $password): bool
    {
        $valid = true;
        $len = mb_strlen($password);
        if ($len < 8) {
            $valid = false;
        }
        return $valid;
    }
    private function hash(string $value): string
    {
        return password_hash($value, PASSWORD_BCRYPT);
    }
}
