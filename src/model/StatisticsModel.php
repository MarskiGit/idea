<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\ApiException;
use PDO;
use PDOException;

class StatisticsModel extends AbstractModel
{
    public function getTen($quarter): array
    {
        $param = [
            'user' => $this->getTopUser($quarter, true),
            'area' => $this->getTopArea($quarter, true),
            'quarter' => $quarter,
        ];
        return $this->responseAPI($param, true);
    }
    public function getTopUser($quarter = null, bool $flag = false): array
    {
        $yearQuarter =  $this->isSelectedQuarter($quarter);
        $param = [];
        try {
            $stmt = $this->DB->query(
                "SELECT full_name, SUM(awarded_points) points, COUNT(*) offers
            FROM view_points_user
            WHERE QUARTER(date_added) = $yearQuarter
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
        if ($flag) {
            return $param;
        } else {
            $user = [
                'user' => $param,
                'quarter' => $yearQuarter
            ];
            return $this->responseAPI($user, true);
        }
    }
    public function getTopArea($quarter = null, bool $flag = false): array
    {
        $yearQuarter = $this->isSelectedQuarter($quarter);
        $param = [];
        try {
            $stmt = $this->DB->query(
                "SELECT area_name as full_name, SUM(awarded_points) points, COUNT(DISTINCT id_idea) offers
                FROM view_points_user
                WHERE QUARTER(date_added) = $yearQuarter
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
        if ($flag) {
            return $param;
        } else {
            $user = [
                'area' => $param,
                'quarter' => $yearQuarter
            ];
            return $this->responseAPI($user, true);
        }
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
