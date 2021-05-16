<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;

class AreaModel extends AbstractModel
{
    public function add(): array
    {
        if (!$this->isNameValid($this->requestParam['area_name'])) {
            return $this->notification([
                'ok' => false,
                'title' => 'Nazwa;',
                'account' => 'Minimum 3 znaki',
                'valid' => 'name'
            ]);
        }

        if ($this->isThere('area_name', $this->requestParam['area_name'], 'area')) {
            return $this->notification([
                'ok' => false,
                'title' => 'Ten',
                'account' => 'Obszar Już jest w bazie',
                'valid' => 'idArea'
            ]);
        }
        try {
            $stmt = $this->DB->prepare('INSERT INTO area (area_name) VALUES (:area_name)');
            $stmt->bindParam(':area_name', $this->requestParam['area_name'], PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Added Area');
        }

        return $this->notification(['ok' => true,]);
    }
}
