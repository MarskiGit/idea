<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\IdeaException;
use PDO;
use PDOException;


class RatingSettingsIdeaModel extends AbstractModel
{
    public function get()
    {
        try {
            $stmt = $this->DB->query('SELECT * FROM rating_setting');
            $stmt->execute();
        } catch (PDOException) {
            throw new IdeaException('Błąd Ustawień Oceny');
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
