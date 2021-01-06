<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use PDO;
use PDOException;
use Exception;

class RatingSettingModel extends AbstractModel
{
    public function getSetings()
    {
        try {
            $stmt = $this->DB->query('SELECT * FROM rating_setting');
            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception('Błąd Ustawień');
        }

        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $param[] = $row;
            }
            return $param;
        } else {
            echo 'Brak elementów do wyświetlenia';
        }
    }
}
