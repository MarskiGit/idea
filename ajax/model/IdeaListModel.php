<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;


class IdeaListModel extends AjaxAbstractModel
{
    private function getName($id_users)
    {
        $json_name = [];
        try {
            $stmt = $this->DB->query("SELECT name FROM user WHERE id_user IN (" . $id_users . ")");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Name IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $json_name[] = $row['name'];
            }
            return $json_name;
        } else {
            $json_name[] = 'Anonim';
            return $json_name;
        }
    }
    private function getArea($id_area)
    {
        try {
            $stmt = $this->DB->query("SELECT area_name FROM area WHERE id_area = $id_area");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Area IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }
    private function countTable()
    {
        try {
            $stmt = $this->DB->query("SELECT COUNT(id_idea) FROM idea");
            $stmt->execute();
            $this->dbh_count = $stmt->fetchColumn();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Count IdeaModel');
        }
    }
    private function limit(int $num): int
    {
        $this->countTable();
        if (!$num) {
            return $this->dbh_count + 1;
        } else {
            return $num;
        }
    }
    public function get()
    {
        try {
            $stmt = $this->DB->query("SELECT id_idea, id_area, id_users, before_value, after_value, date_added, date_implementation, pkt_mod, status FROM idea WHERE id_idea < " . $this->limit($this->dbh_limit) . " ORDER BY id_idea DESC LIMIT 6");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Row IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['id_users'] = $this->getName($row['id_users']);
                $row['id_area'] = $this->getArea($row['id_area']);
                $this->dbh_result[] = $row;
            }
            return $this->dbh_result;
        } else {
            return $this->json_dbh;
        }
    }
}
