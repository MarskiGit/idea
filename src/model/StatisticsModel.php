<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\ApiException;
use PDO;
use PDOException;

class StatisticsModel extends AbstractModel
{
    public function get(string $select, array $requestParam): array
    {
        $this->yearQuarter =  $this->isSelectedQuarter($requestParam['quarter']);
        switch ($select) {
            case 'TopUsers':
                $this->response['top_ten'] = ['users' => $this->getTopUsers()];
                break;
            case 'TopAreas':
                $this->response['top_ten'] = ['areas' => $this->getTopAreas()];
                break;
            default:

                $this->response['top_ten'] = [
                    'users' => $this->getTopUsers(),
                    'areas' => $this->getTopAreas(),
                ];
                $this->response['annual_statistics'] = [
                    'number_employees' => $this->getNumberEmployees(),
                    'number_offers' => $this->getNumberOffers($requestParam['year']),
                    'committed_employees' => $this->getCommittedEmployees($requestParam['year']),
                ];
                break;
        }
        $this->response['select_quarter'] = $requestParam['quarter'];
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

    // Problem z liczeniem statystyk z liczbą pracowników. Jeżeli w danym miesiącu zwolni się lub zatrudni pracownik , nalezy iwzględnic to w miesącu czy w roku 

    private function getNumberEmployees(string $year = '%Y'): array
    {
        $param = [];
        try {
            $stmt = $this->DB->prepare("SELECT DATE_FORMAT(date_added, '$year') as 'year', DATE_FORMAT(date_added, '%m') as 'month', COUNT(id_account) as 'total' FROM account GROUP BY DATE_FORMAT(date_added, '%Y%m')
    ");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error Statistics MODEL Get Number Employees');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($param, $row);
            }
            return $param;
        }
    }
    private function getNumberOffers(string $year = '%Y'): array
    {
        $param = [];
        try {
            $stmt = $this->DB->prepare("SELECT DATE_FORMAT(date_added, '$year') as 'year', DATE_FORMAT(date_added, '%m') as 'month', COUNT(id_idea) as 'total' FROM idea GROUP BY DATE_FORMAT(date_added, '%Y%m')
    ");
            $stmt->execute();
        } catch (PDOException $e) {
            dump($e);
            throw new ApiException('Error Statistics MODEL get Number Offers');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($param, $row);
            }
            return $param;
        }
    }
    private function getCommittedEmployees(string $year = '%Y'): array
    {
        $param = [];
        try {
            $stmt = $this->DB->prepare("SELECT  DATE_FORMAT(date_added, '$year') as 'year', DATE_FORMAT(date_added, '%m') as 'month', COUNT( DISTINCT id_account) as 'total' FROM user_idea GROUP BY DATE_FORMAT(date_added, '%Y%m')
    ");
            $stmt->execute();
        } catch (PDOException $e) {
            dump($e);
            throw new ApiException('Error Statistics MODEL get Committed Employees');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($param, $row);
            }
            return $param;
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
