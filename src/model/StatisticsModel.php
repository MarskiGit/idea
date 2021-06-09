<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\CsrfModel;
use Idea\model\AbstractModel;
use Idea\exception\IdeaException;
use PDO;
use PDOException;


class StatisticsModel extends AbstractModel
{
    public function getTopTen(): array
    {

        $param = [];
        try {
            $stmt = $this->DB->query("SELECT * FROM view_pkt_date ORDER BY offers_implemented DESC LIMIT 10");
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
            echo 'Brak elementów do wyświetlenia';
        }
    }
}
