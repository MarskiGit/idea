<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;


class AreaSearchModel extends AbstractModel
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
            $ok['ok'] = true;
            array_unshift($result, $ok);
            return $result;
        } else {
            $result[] = ['area_name' => 'Nie odnaleziono', 'ok' => false];
            return $this->notification($result);
        }
    }
}
