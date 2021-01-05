<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use PDO;
use PDOException;
use Exception;

class CreateIdeaModel extends AbstractModel
{
    public function retrievingRecords()
    {
        try {
            $stmt = $this->DB->query("SELECT * FROM seting_create");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception('Błąd List bazy danych');
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
