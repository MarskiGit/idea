<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractModel;
use Idea\exception\ApiException;
use PDO;
use PDOException;

class OfferFormModel extends AbstractModel
{
    public function create(array $requestParam): array
    {
        $topic = $this->escape($requestParam['topic']);
        $after_value = $this->escape($requestParam['after_value']);
        $before_value = $this->escape($requestParam['before_value']);
        $array_users = $this->jsonSQL($requestParam['array_users']);
        $rating_user = $this->jsonSQL($requestParam['rating_user']);


        try {
            $stmt = $this->DB->prepare('INSERT INTO idea (id_area, topic, after_value, before_value, array_users,  rating_user ) VALUES (:id_area, :topic, :after_value, :before_value, :array_users, :rating_user)');
            $stmt->bindValue(':id_area', (int)$requestParam['id_area'], PDO::PARAM_INT);
            $stmt->bindValue(':topic', $topic, PDO::PARAM_STR);
            $stmt->bindValue(':after_value', $after_value, PDO::PARAM_STR);
            $stmt->bindValue(':after_value', $after_value, PDO::PARAM_STR);
            $stmt->bindValue(':before_value', $before_value, PDO::PARAM_STR);
            $stmt->bindValue(':array_users', $array_users, PDO::PARAM_STR);
            $stmt->bindValue(':rating_user', $rating_user, PDO::PARAM_STR);
            try {
                $this->DB->beginTransaction();
                $stmt->execute();
                $id = intval($this->DB->lastInsertId());
                $this->DB->commit();
            } catch (PDOException $e) {
                $this->DB->rollback();
                throw new ApiException('Error FormOffer MODEL Create');
            }
            $stmt->closeCursor();
        } catch (PDOException $e) {
            throw new ApiException('Error FormOffer MODEL Create Idea');
        }
        if ($id) {
            $userIdea = $this->userIdea($id, (int)$requestParam['id_area'], $requestParam);
            $addet = date("ynj") . "/" . $id;
            if ($userIdea) {
                $this->createDate($id, $addet);
                $this->response = [
                    'ok' => true,
                    'title' => "Dodano pomyślmie. Numer: " . $addet,
                ];
                return $this->responseAPI();
            } else {
                $this->response = [
                    'ok' => true,
                    'title' => 'Błąd dodawania',
                ];
                return $this->responseAPI();
            }
        } else {
            $this->response = [
                'ok' => true,
                'title' => 'Błąd dodawania',
            ];
            return $this->responseAPI();
        }
    }
    private function userIdea(int $id, int $id_area, array $requestParam): bool
    {
        $lenght_users = count($requestParam['array_users']);
        $qPart = array_fill(0, $lenght_users, "(?, ?, ?)");
        try {
            $query = "INSERT INTO user_idea (id_idea, id_area, id_account) VALUES ";
            $query .=  implode(",", $qPart);
            $stmt = $this->DB->prepare($query);
            $i = 1;
            foreach ($requestParam['array_users'] as $item) {
                $stmt->bindValue($i++, $id, PDO::PARAM_INT);
                $stmt->bindValue($i++, $id_area, PDO::PARAM_INT);
                $stmt->bindValue($i++, $item, PDO::PARAM_INT);
            }
            $stmt->execute();
        } catch (PDOException $e) {
            throw new ApiException('Error FormOffer MODEL User Idea');
        }
        return true;
    }
    private function createDate($id_idea, string $addet): void
    {
        try {
            $stmt = $this->DB->prepare("UPDATE idea SET token_idea = :token_idea WHERE id_idea = " . $id_idea . "");
            $stmt->bindValue(':token_idea', $addet, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            dump($e);
            throw new ApiException('Error FormOffer MODEL Create Date');
        }
    }
}
