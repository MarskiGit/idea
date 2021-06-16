<?php

declare(strict_types=1);

namespace Api\model;

use Api\model\AbstractModel;
use Api\exception\ApiException;
use PDO;
use PDOException;


class StatisticsModel extends AbstractModel
{
    public function getTen($quarter = null): array
    {
        $param = [
            'user' => $this->getTopUser($quarter),
        ];
        return $this->responseAPI($param, true);
    }
    public function getTopUser($quarter = null): array
    {
        if ($quarter) {
            $yearQuarter = $quarter;
        } else {
            $yearQuarter = $this->yearQuarter();
        };
        $param = [];
        try {
            $stmt = $this->DB->query(
                "SELECT SUM(awarded_points) points, full_name, COUNT(*) offers
            FROM view_pkt_user
            WHERE QUARTER(date_added) = $yearQuarter
            GROUP BY full_name 
            ORDER BY awarded_points DESC LIMIT 10"
            );
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error Statistics MODEL Get Top Ten');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($param, $row);
            }
            return $param;
        } else {
            return $param;
        }
    }
}
