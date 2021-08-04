'use strict';
import Layout from './layout.esm.js';
import Api from './modules/Api.esm.js';

class Index {
    #Layout;
    #url = '';
    #page;
    #pageAdmin;
    #userLogin;
    constructor() {
        this.#url = location.search;
        this.#Layout = new Layout();

        this.#init();
    }
    #init() {
        this.#Layout.init();
        this.#locationUrl();
        this.#factory();

        this.#userLogin = this.#getStorage('userLogin') || false;
        if (this.#userLogin) this.#countDown();

        console.warn('Aktualizacja: 04.08.2021 / 11:00');
    }
    #locationUrl() {
        if (this.#url === '') {
            this.#page = 'statistics';
        } else {
            this.#page = this.#url.replaceAll('?action=', '');
            if (this.#page.includes('admin')) {
                this.#page = 'admin';
                this.#pageAdmin = this.#url.replaceAll('?action=admin&admin=', '');
                this.#setStorage('userLogin', true);
            }
        }
    }
    async #factory() {
        switch (this.#page) {
            case 'statistics':
                const { default: TopTen } = await import('./statistics.esm.js');
                new TopTen(Api).init();
                break;
            case 'listOffers':
                const { default: ListOffers } = await import('./listOffers.esm.js');
                new ListOffers(Api).init();
                break;
            case 'formOffer':
                const { default: FormOffer } = await import('./formOffer.esm.js');
                new FormOffer(Api).init();
                break;
            case 'login':
                const { default: Login } = await import('./login.esm.js');
                new Login(Api).init();
                break;
            case 'admin':
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
    #setStorage(name, value) {
        localStorage.setItem(name, value);
    }
    #getStorage = (name) => localStorage.getItem(name);
}

new Index();
