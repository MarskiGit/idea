<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;


class CreatorSearchModel extends AjaxAbstractModel
{
    public function get(): array
    {
        $search = "%" . $this->requestParam['user_name'] . "%";
        try {
            $stmt = $this->DB->prepare("SELECT id_user, id_area, user_name FROM account WHERE " . $this->requestParam['select'] . " LIKE :name LIMIT 3");
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException) {
            throw new AjaxException('Błąd User Search IdeaModel');
        }
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
            $ok['ok'] = true;
            array_unshift($result, $ok);
            return $result;
        } else {
            $result[] = ['user_name' => 'Nie odnaleziono', 'ok' => false];
            return $this->notification($result);
        }
    }
}
