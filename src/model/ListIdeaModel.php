<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;


class ListIdeaModel extends AbstractModel
{
    public function get(array $requestParam): array
    {

        try {
            $stmt = $this->DB->query("SELECT id_idea, id_area, after_value, before_value, others_value,	array_users, date_added, date_implementation, idea_status FROM idea WHERE id_idea < " . $this->limitTuples($requestParam['last_tuple']) . " ORDER BY id_idea DESC LIMIT 6");
            $stmt->execute();
        } catch (PDOException) {
            throw new AjaxException('Error: Get List IdeaModel');
        }

        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['creators'] = $this->getListNames($row['array_users']);
                $row['id_area'] = $this->getArea($row['id_area']);

                $result[] = $row;
            }
            $ok['ok'] = true;
            array_unshift($result, $ok);
            return $result;
        } else {
            $ok['ok'] = false;
            $result[] = $ok;
            return $result;
        }
    }
    private function getListNames($id_users): array
    {
        $array_users = json_decode($id_users);
        $string_id = implode(", ", $array_users);



        try {
            $stmt = $this->DB->query("SELECT full_name FROM account WHERE id_account IN (" . $string_id . ")");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error: Name IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $name[] = $row['full_name'];
            }
            return $name;
        } else {
            return $this->notification('Bark pomysłodawców');
        }
    }
    private function getArea($id_area): array
    {
        try {
            $stmt = $this->DB->query("SELECT area_name FROM area WHERE id_area = $id_area");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error: Area IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return $this->notification('Brak obszaru');
        }
    }
    private function getNumberTuples(): int
    {
        try {
            $stmt = $this->DB->query("SELECT COUNT(id_idea) FROM idea");
            $stmt->execute();
            return intval($stmt->fetchColumn());
        } catch (PDOException $e) {
            throw new AjaxException('Error: Number Tuples IdeaModel');
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
