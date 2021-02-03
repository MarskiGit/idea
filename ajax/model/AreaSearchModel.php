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
        $search = "%" . $this->requestParam['area_name'] . "%";

        try {
            $stmt = $this->DB->prepare('SELECT area_name, id_area FROM area WHERE area_name LIKE :name LIMIT 3');
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            return $result;
        } else {
            $result[] = ['area_name' => 'Nie odnaleziono', 'row' => 'empty'];
            return $this->notification($result);
        }
    }
}
