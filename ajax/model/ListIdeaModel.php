<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;


class ListIdeaModel extends AjaxAbstractModel
{
    public function get(): array
    {
        try {
            $stmt = $this->DB->query("SELECT id_idea, id_area, id_users, before_value, after_value, date_added, date_implementation, pkt_mod, status FROM idea WHERE id_idea < " . $this->limitTuples($this->requestParam['last_tuple']) . " ORDER BY id_idea DESC LIMIT 6");
            $stmt->execute();
        } catch (PDOException) {
            throw new AjaxException('Error: Get List IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['creators'] = $this->getListNames($row['id_users']);
                $row['id_area'] = $this->getArea($row['id_area']);

                $result[] = $row;
            }
            $ok['ok'] = true;
            array_unshift($result, $ok);
            return $result;
        } else {
            return [];
        }
    }
    private function getListNames($id_users): array
    {
        try {
            $stmt = $this->DB->query("SELECT user_name FROM account WHERE id_user IN (" . $id_users . ")");
            $stmt->execute();
        } catch (PDOException) {
            throw new AjaxException('Error: Name IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $name[] = $row['user_name'];
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
        } catch (PDOException) {
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
        } catch (PDOException) {
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
