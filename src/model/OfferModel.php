<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\AjaxException;
use PDO;
use PDOException;
// token tymczasowe rozwiązanei identyfikujące pomysł. dopuki brak procedury z tranzakcja
class OfferModel extends AbstractModel
{
    public function create(array $requestParam): array
    {
        $array_users = $this->arraySQL($requestParam['array_users']);
        $others_value = $this->arraySQL($requestParam['saving']);
        $after_value = $this->escape($requestParam['after_value']);
        $before_value = $this->escape($requestParam['before_value']);

        try {
            $stmt = $this->DB->prepare('INSERT INTO idea (id_area, after_value, before_value, array_users, others_value, pkt_user ) VALUES (:id_area, :after_value, :before_value, :array_users, :others_value, :pkt_user)');
            $stmt->bindValue(':id_area', (int)$requestParam['id_area'], PDO::PARAM_INT);
            $stmt->bindValue(':after_value', $after_value, PDO::PARAM_STR);
            $stmt->bindValue(':before_value', $before_value, PDO::PARAM_STR);
            $stmt->bindValue(':array_users', $array_users, PDO::PARAM_STR);
            $stmt->bindValue(':others_value', $others_value, PDO::PARAM_STR);
            $stmt->bindValue(':pkt_user', (int)$requestParam['pkt_user'], PDO::PARAM_INT);
            try {
                $this->DB->beginTransaction();
                $stmt->execute();
                $id = intval($this->DB->lastInsertId());
                $this->DB->commit();
            } catch (PDOException $e) {
                $this->DB->rollback();
                throw new AjaxException('Error: Numer Pomysłu');
            }
            $stmt->closeCursor();
        } catch (PDOException $e) {
            throw new AjaxException('Error: Dodawanie Pomysłu');
        }
        if ($id) {
            $userIdea = $this->userIdea($id, $requestParam);
            return $this->notification([
                'ok' => $userIdea,
                'title' => 'Dodano pomyślmie',
            ]);
        } else {
            return $this->notification(['ok' => false, 'title' => 'Dupa',]);
        }
    }
    private function userIdea(int $id, array $requestParam): bool
    {
        $lenght_users = count($requestParam['array_users']);
        $pkt_real = $requestParam['pkt_user'] / $lenght_users;
        try {
            $query = "INSERT INTO user_idea (id_idea, id_account, pkt_real) VALUES ";
            $qPart = array_fill(0, $lenght_users, "(?, ?, ?)");
            $query .=  implode(",", $qPart);
            $stmt = $this->DB->prepare($query);
            $i = 1;
            foreach ($requestParam['array_users'] as $item) {
                $stmt->bindValue($i++, $id, PDO::PARAM_INT);
                $stmt->bindValue($i++, $item, PDO::PARAM_INT);
                $stmt->bindValue($i++, $pkt_real, PDO::PARAM_INT);
            }
            $stmt->execute();
        } catch (PDOException $e) {
            throw new AjaxException('Error: Dodawanie Pomysłu');
        }

        return true;
    }
}
