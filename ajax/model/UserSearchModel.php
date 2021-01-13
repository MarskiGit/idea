<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;


class UserSearchModel extends AjaxAbstractModel
{
    public function get(): array
    {
        $search = "%" . $this->requestParam['name'] . "%";
        try {
            $stmt = $this->DB->prepare("SELECT id_user, id_area, name FROM user WHERE " . $this->requestParam['select'] . " LIKE :name ");
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Błąd User Search IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            return $result;
        } else {
            return $this->notification(['name' => 'Nie odnaleziono']);
        }
    }
}
