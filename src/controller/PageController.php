<?php

declare(strict_types=1);

namespace Idea\controller;

use Idea\model\CsrfModel;
use Idea\model\AccountModel;
use Idea\model\AreaModel;
use Idea\model\OfferOptionModel;
use Idea\model\StatisticsModel;

class PageController extends AbstractController
{
    protected function formOfferIdea(): void
    {
        $offerRating = new OfferOptionModel();
        CsrfModel::setNewToken('formoffer');
        $offerParams = [
            'formofferToken' => CsrfModel::viewToken('formoffer'),
            'offerRating' => $offerRating->get(),
        ];
        $this->View->formOffer($offerParams);
    }
    protected function listOffersIdea(): void
    {
        CsrfModel::setNewToken('listoffers');
        $listParams = [
            'listoffersToken' => CsrfModel::viewToken('listoffers'),
        ];
        $this->View->listOffers($listParams);
    }
    protected function statisticsIdea(): void
    {
        $stat = new StatisticsModel();
        $homeParams = [
            'topTenUser' => $stat->getTopUser(),
        ];
        $this->View->statistics($homeParams);
    }
    protected function loginIdea(): void
    {
        CsrfModel::setNewToken('login');
        $loginParams = [
            'loginTokenInput' => CsrfModel::getInputToken('login'),
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
