<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\Csrf;
use Idea\model\AccountModel;
use Idea\model\AreaModel;
use Idea\model\RatingSettingsIdeaModel;

class PageController extends AbstractController
{
    protected function ideaIdea(): void
    {
        $ideaRating = new RatingSettingsIdeaModel();
        $this->View->addIdea($ideaRating->get());
    }
    protected function listIdea(): void
    {
        Csrf::setNewToken('list');
        $listParams = [
            'listSessionToken' => Csrf::viewToken('list'),
        ];
        $this->View->list($listParams);
    }
    protected function homeIdea(): void
    {

        $this->View->home();
    }
    protected function loginIdea(): void
    {
        Csrf::setNewToken('login');
        $loginParams = [
            'loginTokenInput' => Csrf::getInputToken('login'),
        ];
        $this->View->login($loginParams);
    }
    protected function logoutIdea(): void
    {
        AccountModel::logout();
        header("location: index.php");
    }
    protected function adminIdea(): void
    {
        $admin_GET = $this->Request->getParam_GET('admin', 'home');

        $adminParams = [
            'actve_link' => $admin_GET,
        ];

        echo '<main data-page="main">';
        $this->View->admin($adminParams);
        if (intval($this->account['rang']) === 2) {

            switch ($admin_GET) {
                case 'home':
                    $this->View->homeAdmin();
                    break;
                case 'points':
                    $this->View->pointsAdmin();
                    break;
                case 'management':
                    $this->View->managementAdmin();
                    break;
                case 'area':
                    $this->area();
                    break;
                case 'user':
                    $this->user();
                    break;
                default:
                    $this->View->homeAdmin();
                    break;
            }
        }
        echo '</main>';
    }
    private function area(): void
    {
        $area = new AreaModel();
        $areaParams = [
            'areaList' => $area->get(),
        ];
        $this->View->areaAdmin($areaParams);
    }
    private function user(): void
    {
        $user = new AccountModel();
        $areaParams = [
            'userList' => $user->get(),
        ];
        $this->View->userAdmin($areaParams);
    }
}
