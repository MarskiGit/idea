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

        switch ($requestParam['option_search'] ?? '') {
            case 'contents':
                $this->search($requestParam['idea_search'], (int)$requestParam['last_tuple']);
                break;

            default:
                $this->defaultList((int)$requestParam['last_tuple']);
                break;
        }

        return $this->responseAPI();
    }
    private function defaultList(int $lastTuple): void
    {

        try {
            $stmt = $this->DB->query("SELECT * FROM view_idea WHERE id_idea < " . $this->limitTuples($lastTuple) . " ORDER BY id_idea DESC LIMIT 10 ");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error ListOffers MODEL Get');
        }

        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['array_users'] = $this->getListNames($row['array_users']);
                $row['rating_user'] = json_decode($row['rating_user']);
                array_push($this->response, $row);
            }
        }
    }
    private function search(string $search, int $lastTuple): void
    {

        $searchSQL = "%" . $search . "%";
        try {
            $stmt = $this->DB->prepare("SELECT * FROM view_idea WHERE CONCAT(after_value , before_value) LIKE :name AND id_idea < " . $this->limitTuples($lastTuple) . " ORDER BY id_idea DESC LIMIT 10 ");
            $stmt->bindValue(':name', $searchSQL, PDO::PARAM_STR);

            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error ListOffers MODEL search');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['array_users'] = $this->getListNames($row['array_users']);
                $row['rating_user'] = json_decode($row['rating_user']);
                array_push($this->response, $row);
            }
        }
    }
    private function getListNames($id_users): array
    {
        $result = [];
        $array_users = json_decode($id_users);
        $string_id = implode(", ", $array_users);
        try {
            $stmt = $this->DB->query("SELECT full_name FROM account WHERE id_account IN (" . $string_id . ")");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error ListOffers MODEL Get Name Idea');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row['full_name'];
            }
            return $result;
        } else {
            return $result = ['Brak użytkownika'];
        }
    }
    private function getNumberTuples(): int
    {
        try {
            $stmt = $this->DB->query("SELECT id_idea FROM idea ORDER BY id_idea DESC LIMIT 1");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error ListOffers MODEL Get Number Tuples');
        }
        return intval($stmt->fetchColumn());
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


// private function count_search($search): int
// {
//     $result = 0;

//     try {
//         $stmt = $this->DB->prepare("SELECT count(*) FROM view_idea WHERE before_value LIKE :name OR after_value LIKE :name OR CONCAT(after_value , after_value ) LIKE :name ");
//         $stmt->bindValue(':name', $search, PDO::PARAM_STR);
//         $stmt->execute();
//     } catch (PDOException $e) {
//         throw new ApiException('Error ListOffers MODEL search');
//     }
//     if ($stmt->rowCount() > 0) {
//         $result = $stmt->fetchColumn();

//         return (int)$result;
//     } else {
//         return $result;
//     }
// }

        // $select = $requestParam['option_search'];
        // var_dump($this->limitTuples((int)$last_tuple));
        // before_value LIKE :name OR after_value LIKE :name AND