<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;


class CreatorSearchModel extends AbstractModel
{
    public function get(): array
    {
        $search = "%" . $this->requestParam['full_name'] . "%";
        try {
            $stmt = $this->DB->prepare("SELECT id_account, id_area, full_name FROM account WHERE " . $this->requestParam['select'] . " LIKE :name LIMIT 3");
            $stmt->bindValue(':name', $search, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
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
            $result[] = ['full_name' => 'Nie odnaleziono', 'ok' => false];
            return $this->notification($result);
        }
    }
}
