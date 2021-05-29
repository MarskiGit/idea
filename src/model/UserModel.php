<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;

class UserModel extends AbstractModel
{

    public function add(array $requestParam): array
    {
        if (!$this->isNameValid($requestParam['area_name'])) {
            return $this->notification([
                'ok' => false,
                'title' => 'Nazwa;',
                'account' => 'Minimum 3 znaki',
                'valid' => 'name'
            ]);
        }

        if ($this->isThere('area_name', $requestParam['area_name'], 'area')) {
            return $this->notification([
                'ok' => false,
                'title' => 'Ten',
                'account' => 'Obszar Już jest w bazie',
                'valid' => 'idArea'
            ]);
        }
        try {
            $stmt = $this->DB->prepare('INSERT INTO area (area_name) VALUES (:area_name)');
            $stmt->bindParam(':area_name', $requestParam['area_name'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Added Area');
        }

        return $this->notification(['ok' => true,]);
    }
    public function getSearch(array $requestParam): array
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
}
