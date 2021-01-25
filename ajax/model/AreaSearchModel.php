<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;


class AreaSearchModel extends AjaxAbstractModel
{
    public function get(): array
    {
        $comma_separated = implode(",", $this->requestParam['area_name']);

        try {
            $stmt = $this->DB->prepare("SELECT area_name, id_area FROM area WHERE id_area IN (" . $comma_separated . ") LIMIT 3");
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd Area Search IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            return $result;
        } else {
            return $this->notification(['area_name' => 'Nie odnaleziono', 'row' => 'empty']);
        }
    }
}
