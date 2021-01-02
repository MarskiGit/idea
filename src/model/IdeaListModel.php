<?php

declare(strict_types=1);


require_once("../database/DB.php");


header('Content-type: application/json');
$secure = file_get_contents('php://input');

class IdeaListModel
{
    private $obj;
    private $db_limit;
    private $dbh_result;
    private $dbh_count;
    private $json_dbh;
    private $dbh;
    public function __construct($secure, PDO $db)
    {
        $this->obj = json_decode($secure, true);
        $this->dbh = $db;
        $this->dbh_limit = intval($this->obj['last_result']);
        $this->dbh_count = null;
        $this->dbh_result = [];
        $this->json_dbh = 0;
    }
    private function jsonE($json): string
    {
        return json_encode($json);
    }
    private function getName($id_users)
    {
        $json_name = [];
        try {
            $stmt = $this->dbh->prepare("SELECT name FROM user WHERE id_user IN (" . $id_users . ")");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception('Błąd Name bazy danych');
        }
        if ($stmt->rowCount() > 0) {
            while ($wor = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $json_name[] = $wor['name'];
                return $json_name;
            }
        } else {
            $json_name[] = 'Anonim';
            return $json_name;
        }
    }
    private function getArea($id_area)
    {
        try {
            $stmt = $this->dbh->prepare("SELECT area_name FROM area WHERE id_area = $id_area");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception('Błąd Area bazy danych');
        }
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }
    private function countDB()
    {
        try {
            $stmt = $this->dbh->prepare("SELECT COUNT(id_idea) FROM idea");
            $stmt->execute();
            $this->dbh_count = $stmt->fetchColumn();
        } catch (PDOException $e) {
            throw new Exception('Błąd Count bazy danych');
        }
    }
    private function limit(int $num): int
    {
        $this->countDB();
        if (!$num) {
            return $this->dbh_count + 1;
        } else {
            return $num;
        }
    }
    public function retrievingRecords()
    {
        try {
            $stmt = $this->dbh->prepare("SELECT id_idea, id_area, id_users, before_value, after_value, date_added, date_implementation, pkt_mod, status FROM idea WHERE id_idea < " . $this->limit($this->dbh_limit) . " ORDER BY id_idea DESC LIMIT 4");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception('Błąd List bazy danych');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['id_users'] = $this->getName($row['id_users']);
                $row['id_area'] = $this->getArea($row['id_area']);
                $this->dbh_result[] = $row;
            }
            $this->json_dbh = $this->jsonE($this->dbh_result);
            return $this->json_dbh;
        } else {
            $this->json_dbh = $this->jsonE($this->json_dbh);
            return $this->json_dbh;
        }
    }
}

$newList = new IdeaListModel($secure, DB::conn());
try {
    echo $newList->retrievingRecords();
} catch (Exception $e) {
    echo $e->getMessage();
    die();
}
