'use strict';
import NavSticky from './layout/NavSticky.esm.js';
import SmoothTop from './layout/SmoothTop.esm.js';

class Layout {
    #domObjects = {
        home: document.querySelector('[data-page="home_nav"]'),
        nav: document.querySelector('[data-page="nav"]'),
        pageUp: document.querySelector('[data-page="page_up"]'),
        main: document.querySelector('[data-page="main"]'),
    };
    constructor() {
        this.navSticky = new NavSticky(this.#domObjects);
        this.smooth = new SmoothTop(this.#domObjects.topPage);
    }
    init() {
        this.navSticky.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#domObjects.pageUp.addEventListener('click', () => this.smooth.run());
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const MAIN_PAGE = new Layout();
    MAIN_PAGE.init();
});
