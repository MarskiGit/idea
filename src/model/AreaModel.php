<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use Idea\model\ModelInterface;
use PDO;
use PDOException;

class AreaModel extends AbstractModel implements ModelInterface
{

    public function get(): array
    {
        try {
            $stmt = $this->DB->query("SELECT * FROM area ");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error Area MODEL Get');
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
        if (!$this->isNameValid($requestParam['area_name'])) {
            $replay = [
                'ok' => false,
                'title' => 'Minimum 3 znaki',
            ];
            return $this->responseAPI($replay, true);
        }

        if ($this->isThere('area_name', $requestParam['area_name'], 'area')) {
            $replay = [
                'ok' => false,
                'title' => 'Ten obszar jest już w bazie',
            ];
            return $this->responseAPI($replay, true);
        }
        $area_name = $this->escape($requestParam['area_name']);
        try {
            $stmt = $this->DB->prepare('INSERT INTO area (area_name) VALUES (:area_name)');
            $stmt->bindParam(':area_name', $area_name, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error Area MODEL Create');
        }
        $replay = [
            'ok' => true,
            'title' => 'Dodano z powodzeniem',
        ];
        return $this->responseAPI($replay, true);
    }
    public function edit(array $requestParam): void
    {
        try {
            $stmt = $this->DB->prepare('UPDATE area  SET area_name = :area_name,  WHERE id_area = :id_area');
            $stmt->bindValue(':id_area', $requestParam['id_area'], PDO::PARAM_INT);
            $stmt->bindValue(':area_name', $requestParam['id_area'], PDO::PARAM_INT);

            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error Area MODEL Edit');
        }
    }
    public function delete(array $requestParam): void
    {
        // try {
        //     $query = "DELETE FROM notes WHERE id = $id LIMIT 1";
        //     $this->conn->exec($query);
        // } catch (PDOException $e) {
        //     throw new AjaxException('Nie udało się usunąć notatki', 400, $e);
        // }
    }
    public function search(array $requestParam): array
    {
        $search = "%" . $requestParam['area_name'] . "%";
        $result = [];
        try {
            $stmt = $this->DB->prepare('SELECT area_name, id_area FROM area WHERE area_name LIKE :name LIMIT 3');
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error Model Area Search');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($result, $row);
            }
            return $this->responseAPI($result, true);
        } else {
            $replay = [
                'area_name' => 'Nie odnaleziono'
            ];
            array_push($result, $replay);
            return $this->responseAPI($result, true);
        }
    }
}
