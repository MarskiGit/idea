<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;

class IdeaWrite extends AbstractModel
{
    public function addIdea()
    {
        try {
            $stmt = $this->DB->prepare('INSERT INTO idea (id_area, after_value, before_value, number_users, pkt_user ) VALUES (:id_area, :after_value, :before_value, :number_users, :pkt_user)');
            $stmt->bindValue(':id_area', $this->requestParam['id_area'], PDO::PARAM_INT);
            $stmt->bindValue(':after_value', $this->requestParam['after_value'], PDO::PARAM_STR);
            $stmt->bindValue(':before_value', $this->requestParam['before_value'], PDO::PARAM_STR);
            $stmt->bindValue(':number_users', $this->requestParam['number_users'], PDO::PARAM_INT);
            $stmt->bindValue(':pkt_user', $this->requestParam['pktUser'], PDO::PARAM_INT);
            $stmt->execute();
            $stmt->closeCursor();
        } catch (PDOException $e) {
            throw new AjaxException('Error: Dodawanie pomysłu');
        }
        $this->userIdea();
        return $this->notification(['ok' => true]);
    }
    private function userIdea()
    {
        try {
            $stmt = $this->DB->prepare('INSERT INTO user_idea (id_idea, id_account ) VALUES (:id_idea, :id_account)');
            $stmt->bindValue(':id_idea', $this->requestParam['id_idea'], PDO::PARAM_INT);
            $stmt->bindValue(':id_account', $this->requestParam['id_account'], PDO::PARAM_INT);
            $stmt->execute();
            $stmt->closeCursor();
        } catch (PDOException $e) {
            throw new AjaxException('Error: Dodawanie pomysłu');
        }
        // return $this->notification(['ok' => true]);
    }
}

//  $stmt->bindValue(':id_users', $this->requestParam['idUsers'], PDO::PARAM_STR);