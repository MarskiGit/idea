<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\AccountModel;
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
        $this->View->list();
    }
    protected function homeIdea(): void
    {
        $this->View->home();
    }
    protected function loginIdea(): void
    {
        $_SESSION['token'] = $this->token();
        $this->View->login($_SESSION['token']);
    }
    protected function logoutIdea(): void
    {
        $account = new AccountModel();
        $status = $account->logout();
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
                case 'area':
                    $this->View->areaAdmin();
                    break;
                case 'user':
                    $this->View->userAdmin();
                    break;
                case 'statistics':
                    $this->View->statisticsAdmin();
                    break;
                default:
                    $this->View->homeAdmin();
                    break;
            }
        }
        echo '</main>';
    }
    // protected function modIdea(): void
    // {
    //     $admin_GET = $this->Request->getParam_GET('mod', self::DEFAULT_ACTION_HTML);
    //     echo '<main data-page="main">';
    //     $this->View->Mod();
    //     if (intval($this->account['rang']) === 1) {

    //         switch ($admin_GET) {
    //             case 'management ':
    //                 $this->View->managementAdmin();
    //                 break;
    //             case 'area':
    //                 $this->View->areaAdmin();
    //                 break;
    //             case 'user':
    //                 $this->View->userAdmin();
    //                 break;
    //             case 'statistics':
    //                 $this->View->statisticsAdmin();;
    //                 break;
    //             default:
    //                 $this->View->homeAdmin();
    //                 break;
    //         }
    //     }
    //     echo '</main>';
    // }
}
