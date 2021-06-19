<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\AccountModel;
use Idea\model\AreaModel;
use Idea\model\OfferOptionModel;


class PageController extends AbstractController
{
    protected function formOffer_Idea(): void
    {
        $offerRating = new OfferOptionModel();
        $offerParams = [
            'offerRating' => $offerRating->get(),
        ];
        $this->View->formOffer($offerParams);
    }
    protected function listOffers_Idea(): void
    {
        $this->View->listOffers();
    }
    protected function statistics_Idea(): void
    {
        $this->View->statistics();
    }
    protected function login_Idea(): void
    {
        $this->View->login();
    }
    protected function logout_Idea(): void
    {
        AccountModel::logout();
        header("location:" . HTTP_SERVER);
    }

    // Sekcja administratora
    protected function admin_Idea(): void
    {
        echo '<main data-page="main">';
        if (intval($this->account['rang']) === 2) {

            $admin_GET = $this->Request->getParam_GET('admin', 'home');
            $adminParams = [
                'actve_link' => $admin_GET,
            ];
            $this->View->panel_Admin($adminParams);

            switch ($admin_GET) {
                case 'home':
                    $this->View->home_Admin();
                    break;
                case 'points':
                    $this->View->points_Admin();
                    break;
                case 'management':
                    $this->View->management_Admin();
                    break;
                case 'area':
                    $this->area_Admin();
                    break;
                case 'user':
                    $this->user_Admin();
                    break;
                default:
                    $this->View->home_Admin();
                    break;
            }
        } else {
            echo 'Brak dostępu';
        }
        echo '</main>';
    }
    private function area_Admin(): void
    {
        $area = new AreaModel();
        $areaParams = [
            'areaList' => $area->get(),
        ];
        $this->View->area_Admin($areaParams);
    }
    private function user_Admin(): void
    {
        $user = new AccountModel();
        $userParams = [
            'userList' => $user->get(),
        ];
        $this->View->user_Admin($userParams);
    }
}

// Sekcja Moderatora
