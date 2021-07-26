<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\ApiException;
use PDO;
use PDOException;

class RatingModel extends AbstractModel
{
    public function update(array $requestParam): array
    {

        try {
            $stmt = $this->DB->prepare("Update idea SET idea_status = :idea_status, date_implementation = :date_implementation WHERE id_idea = :id_idea");
            $stmt->bindValue(':id_idea', (int)$requestParam['id_idea'], PDO::PARAM_INT);
            $stmt->bindValue(':idea_status', (int)$requestParam['idea_status'], PDO::PARAM_INT);
            $stmt->bindValue(':date_implementation', $requestParam['date_implementation'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error Rating Model Idea update');
        }
        if (true) {
            if ((int)$requestParam['idea_status'] == 2)   $this->dividePoint((int)$requestParam['id_idea'], (int)$requestParam['number_users'], (int)$requestParam['awarded_point']);


            $replay = [
                'ok' => true,
                'title' => "Dodano pomyślmie. Numer: ",
            ];
            return $this->responseAPI($replay, true);
        } else {
            $replay = [
                'ok' => true,
                'title' => 'Błąd dodawania',
            ];
            return $this->responseAPI($replay);
        }
    }
    private function dividePoint(int $id, int $numberUsers, int $awarded_points)
    {

        $point = $awarded_points / $numberUsers;
        try {
            $stmt = $this->DB->prepare("Update user_idea SET awarded_points = :awarded_points  WHERE id_idea = :id_idea");
            $stmt->bindValue(':id_idea', $id, PDO::PARAM_INT);
            $stmt->bindValue(':warded_points', $point, PDO::PARAM_INT);

            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error Rating MODEL Idea Point');
        }
    }
}
