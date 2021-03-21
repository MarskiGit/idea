<?php

declare(strict_types=1);

namespace Ajax\model;

use Ajax\model\AjaxAbstractModel;
use Ajax\exception\AjaxException;
use PDO;
use PDOException;

class IdeaWrite extends AjaxAbstractModel
{
    public function add()
    {
        try {
            $stmt = $this->DB->prepare('INSERT INTO idea (id_area, id_users, before_value, after_value, date_added, pkt_user, savings) VALUES (:id_area, :id_users, :before_value, :after_value, :date_added, :pkt_user, :savings)');
            $stmt->bindValue(':id_area', $this->requestParam['idArea'], PDO::PARAM_INT);
            $stmt->bindValue(':id_users', $this->requestParam['idUsers'], PDO::PARAM_STR);
            $stmt->bindValue(':before_value', $this->requestParam['before'], PDO::PARAM_STR);
            $stmt->bindValue(':after_value', $this->requestParam['after'], PDO::PARAM_STR);
            $stmt->bindValue(':date_added', $this->requestParam['dateAdded'], PDO::PARAM_STR);
            $stmt->bindValue(':pkt_user', $this->requestParam['pktUser'], PDO::PARAM_INT);
            $stmt->bindValue(':savings', $this->requestParam['savings'], PDO::PARAM_INT);
            $stmt->execute();
            $stmt->closeCursor();
        } catch (PDOException) {
            throw new AjaxException('Error: Dodawanie pomysłu');
        }
        return $this->notification(['ok' => true]);
    }
}
