<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\CsrfModel;
use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;


class ListOffersModel extends AbstractModel
{
    public function get(array $requestParam): array
    {
        if (CsrfModel::verifyToken($requestParam['token'], 'Token')) {
            $result = [];
            try {
                $stmt = $this->DB->query("SELECT * FROM view_idea WHERE id_idea < " . $this->limitTuples((int)$requestParam['last_tuple']) . " ORDER BY id_idea DESC LIMIT 15 ");
                $stmt->execute();
            } catch (PDOException $e) {
                throw new AjaxException('Error ListOffers MODEL Get');
            }

            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $row['array_users'] = $this->getListNames($row['array_users']);
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
            throw new AjaxException('Error ListOffers MODEL Get Name Idea');
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
            throw new AjaxException('Error ListOffers MODEL Get Number Tuples');
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
