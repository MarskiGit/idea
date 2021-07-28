<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\ApiException;
use PDO;
use PDOException;

class OffersListModel extends AbstractModel
{
    public function get(array $requestParam): array
    {
        $result = [];
        try {
            $stmt = $this->DB->query("SELECT * FROM view_idea WHERE id_idea < " . $this->limitTuples((int)$requestParam['last_tuple']) . " ORDER BY id_idea DESC LIMIT 10 ");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error ListOffers MODEL Get');
        }

        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['array_users'] = $this->getListNames($row['array_users']);
                $row['rating_user'] = json_decode($row['rating_user']);
                array_push($result, $row);
            }

            return $this->responseAPI($result, true);
        } else {
            return $this->responseAPI($result, true);
        }
    }
    public function search(array $requestParam): array
    {
        $result = [];
        $select = $requestParam['select_search'];
        $search = "%" . $requestParam['idea_search'] . "%";
        try {
            $stmt = $this->DB->prepare("SELECT * FROM view_idea WHERE before_value LIKE :name");
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error ListOffers MODEL search');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['array_users'] = $this->getListNames($row['array_users']);
                $row['rating_user'] = json_decode($row['rating_user']);
                array_push($result, $row);
            }

            return $this->responseAPI($result, true);
        } else {
            return $this->responseAPI($result, true);
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
            throw new ApiException('Error ListOffers MODEL Get Name Idea');
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
    private function getNumberTuples(): int
    {
        try {
            $stmt = $this->DB->query("SELECT id_idea FROM idea ORDER BY id_idea DESC LIMIT 1");
            $stmt->execute();
            return intval($stmt->fetchColumn());
        } catch (PDOException $e) {
            throw new ApiException('Error ListOffers MODEL Get Number Tuples');
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
