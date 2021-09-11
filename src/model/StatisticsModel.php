<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\ApiException;
use PDO;
use PDOException;

class StatisticsModel extends AbstractModel
{
    public function get(string $select, $quarter): array
    {
        $this->yearQuarter =  $this->isSelectedQuarter($quarter);
        switch ($select) {
            case 'TopUsers':
                $this->response['user'] = $this->getTopUsers();
                break;
            case 'TopAreas':
                $this->response['area'] = $this->getTopAreas();
                break;
            default:
                $this->response['user'] = $this->getTopUsers();
                $this->response['area'] = $this->getTopAreas();
                break;
        }
        $this->response['quarter'] = $quarter;
        return $this->responseAPI();
    }
    private function getTopUsers(): array
    {
        $param = [];
        try {
            $stmt = $this->DB->query(
                "SELECT full_name, SUM(awarded_points) points, COUNT(*) offers
            FROM view_points_user
            WHERE QUARTER(date_added) = $this->yearQuarter
            GROUP BY full_name 
            ORDER BY points DESC LIMIT 10"
            );
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error Statistics MODEL Get Users Top');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($param, $row);
            }
        }
        return $param;
    }
    private function getTopAreas(): array
    {
        $param = [];
        try {
            $stmt = $this->DB->query(
                "SELECT area_name as full_name, SUM(awarded_points) points, COUNT(DISTINCT id_idea) offers
                FROM view_points_user
                WHERE QUARTER(date_added) = $this->yearQuarter
                GROUP BY area_name
                ORDER BY offers DESC"
            );
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error Statistics MODEL Get Areas Top');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($param, $row);
            }
        }
        return $param;
    }
    private function isSelectedQuarter($quarter): int
    {
        if ($quarter) {
            return (int)$quarter;
        } else {
            return $this->yearQuarter();
        };
    }
}
