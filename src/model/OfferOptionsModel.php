<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\IdeaException;
use PDO;
use PDOException;

class OfferOptionsModel extends AbstractModel
{
    public function get()
    {
        try {
            $stmt = $this->DB->query('SELECT * FROM offer_option');
            $stmt->execute();
        } catch (PDOException $e) {
            throw new IdeaException('Error Offer Option MODEL Get');
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
