'use strict';
import { storage } from './modules/modules.esm.js';
import Layout from './layout.esm.js';
import Api from './modules/Api.esm.js';

class Index {
    #Layout = new Layout();
    #url = location.search;
    #page;
    #pageAdmin;
    #userLogin = storage.getItems('userLogin');
    #pages = ['listOffers', 'formOffer', 'login', 'admin'];

    init() {
        this.#Layout.init();
        this.#checkLocationUrl();
        this.#factory();

        if (this.#userLogin) this.#countDown();

        console.warn('Aktualizacja: 19.09.2021 / 19:30');
    }
    #checkLocationUrl() {
        let page = this.#url.replaceAll('?action=', '');
        if (page.includes('admin')) page = 'admin';

        const pgeIsExist = this.#pages.includes(page);

        if (pgeIsExist) {
            this.#page = page;
            if (this.#page.includes('admin')) {
                this.#page = 'admin';
                this.#pageAdmin = this.#url.replaceAll('?action=admin&admin=', '');
            }
        } else {
            this.#page = 'statistics';
        }
    }
    async #factory() {
        switch (this.#page) {
            case 'statistics':
                const { default: StatisticsController } = await import('./statisticsController.esm.js');
                new StatisticsController().init(Api);
                break;
            case 'listOffers':
                const { default: OfferController } = await import('./offersController.esm.js');
                new OfferController().init();
                break;
            case 'formOffer':
                const { default: FormOffer } = await import('./formOffer.esm.js');
                new FormOffer().init(Api);
                break;
            case 'login':
                const { default: Login } = await import('./login.esm.js');
                new Login().init(Api);
                break;
            case 'admin':
                storage.saveItems('userLogin', true);
                const { default: Admin } = await import('./admin.esm.js');
                new Admin().init(this.#pageAdmin);
                break;

            default:
                break;
        }
    }
    async #countDown() {
        const { default: CountDown } = await import('./countdown.esm.js');
        new CountDown().init();
    }
}

new Index().init();
