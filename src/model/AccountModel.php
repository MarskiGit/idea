<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\CsrfModel;
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
            throw new AjaxException('Error Account MODEL Get');
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
            $replay = [
                'ok' => false,
                'title' => 'Minimum 3 znaki',
            ];
            return $this->responseAPI($replay, true);
        }

        if (!$this->isPasswdValid($requestParam['password'])) {
            $replay = [
                'ok' => false,
                'title' => 'Minimum  8 znaków',
            ];
            return $this->responseAPI($replay, true);
        }

        if ($this->isThere('full_name', $requestParam['full_name'], 'account')) {
            $replay = [
                'ok' => false,
                'title' => 'Użytkownik jest już w bazie',
            ];
            return $this->responseAPI($replay, true);
        }

        if ($this->isThere('account_login', $requestParam['login'], 'account')) {
            $replay = [
                'ok' => false,
                'title' => 'Taki login istnieje',
            ];
            return $this->responseAPI($replay, true);
        }

        if ($this->isThere('id_pass', $requestParam['id_pass'], 'account')) {
            $replay = [
                'ok' => false,
                'title' => 'Numer Identyfikacyjny istnieje',
            ];
            return $this->responseAPI($replay, true);
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
            throw new AjaxException('Error Account MODEL Create');
        }

        $id = intval($this->DB->lastInsertId());
        $replay = [
            'ok' => true,
            'title' => "Dodano" . $requestParam['full_name'],
        ];
        return $this->responseAPI($replay, true);
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
            throw new AjaxException('Error Account MODEL Edit');
        }
    }
    public function delete(array $requestParam)
    {
    }
    public function search(array $requestParam): array
    {
        $result = [];
        $search = "%" . $requestParam['full_name'] . "%";
        try {
            $stmt = $this->DB->prepare("SELECT id_account, id_area, full_name FROM account WHERE " . $requestParam['select'] . " LIKE :name LIMIT 3");
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error MODEL Search Account');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($result, $row);
            }
            return $this->responseAPI($result, true);
        } else {
            $replay = [
                'full_name' => 'Nie odnaleziono',
            ];
            array_push($result, $replay);
            return $this->responseAPI($result, true);
        }
    }
    public function login(array $requestParam): array
    {
        try {
            $stmt = $this->DB->prepare('SELECT id_account, full_name, account_password, account_login, rang FROM account WHERE (account_login = :account_login) AND (active = 1)');
            $stmt->bindValue(':account_login', $requestParam['login'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error Account MODEL Login');
        }

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row) && password_verify($requestParam['password'], $row['account_password']) && $requestParam['login'] === $row['account_login']) {
            $_SESSION['account'] = [
                'rang' => $row['rang'],
                'name' => $row['full_name'],
                'id' => $row['id_account'],
                'currentTime' => time(),
            ];
            $replay = [
                'ok' => true,
            ];
            return $this->responseAPI($replay, true);
        } else {
            $replay = [
                'ok' => false,
                'title' => 'Podano błędne dane logowania',
            ];
            return $this->responseAPI($replay, true);
        }
    }
    public static function logout(): void
    {
        if (session_status() == PHP_SESSION_ACTIVE) {
            CsrfModel::removeTokens('login');
            unset($_SESSION['account']);
            session_destroy();
        }
    }
}
