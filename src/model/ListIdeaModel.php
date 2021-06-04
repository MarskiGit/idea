<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\CsrfModel;
use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;


class ListIdeaModel extends AbstractModel
{
    public function get(array $requestParam): array
    {

        if (CsrfModel::verifyToken($requestParam['token'], 'list')) {
            $result = [];
            try {
                $stmt = $this->DB->query("SELECT id_area, after_value, before_value, others_value, mod_comment,	array_users, date_added, date_implementation, idea_status, token_idea FROM idea WHERE id_idea < " . $this->limitTuples($requestParam['last_tuple']) . " ORDER BY id_idea DESC LIMIT 6");
                $stmt->execute();
            } catch (PDOException) {
                throw new AjaxException('Error MODEL Get List');
            }

            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $row['array_users'] = $this->getListNames($row['array_users']);
                    $row['area_name'] = $this->getArea($row['id_area']);
                    array_push($result, $row);
                }

                return $this->responseAPI($result, true);
            } else {
                return $this->responseAPI($result, true);
            }
        } else {
            $replay = [
                'type' => 'AUTHORIZATION',
                'title' => 'WRONG TOKEN',
            ];
            return $this->responseAPI($replay);
        }
    }
    private function getListNames($id_users): array
    {
        $array_users = json_decode($id_users);
        $string_id = implode(", ", $array_users);
        $name = [];
        try {
            $stmt = $this->DB->query("SELECT full_name FROM account WHERE id_account IN (" . $string_id . ")");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error MODEL Get Name Idea');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $name[] = $row['full_name'];
            }
            return $name;
        } else {
            return $name = ['Brak użytkowników'];
        }
    }
    private function getArea($id_area): array
    {
        $name = [];
        try {
            $stmt = $this->DB->query("SELECT area_name FROM area WHERE id_area = $id_area");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error MODEL Get Area');
        }
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return $name = ['Brak Obszaru'];
        }
    }
    private function getNumberTuples(): int
    {
        try {
            $stmt = $this->DB->query("SELECT COUNT(id_idea) FROM idea");
            $stmt->execute();
            return intval($stmt->fetchColumn());
        } catch (PDOException $e) {
            throw new AjaxException('Error MODEL Get Number Tuples');
        }
    }
    private function limitTuples(int $num): int
    {
        if (!$num) {
            return $this->getNumberTuples() + 1;
        } else {
            return $num;
        }
    }
}
