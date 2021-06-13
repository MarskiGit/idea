<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\IdeaException;
use PDO;
use PDOException;


class StatisticsModel extends AbstractModel
{
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
                "SELECT SUM(awarded_points) awarded_points, full_name, COUNT(*) offers_implemented 
            FROM view_pkt_user
            WHERE QUARTER(date_added) = $yearQuarter
            GROUP BY full_name 
            ORDER BY awarded_points DESC LIMIT 10"
            );
            $stmt->execute();
        } catch (PDOException $e) {
            throw new IdeaException('Error Statistics MODEL Get Top Ten');
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
