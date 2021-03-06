'use strict';
import NavSticky from './layout/NavSticky.esm.js';
import SmoothTop from './layout/SmoothTop.esm.js';

class MainPage {
    constructor() {
        this.domObjects = {
            nav: document.querySelector('[data-page="nav"]'),
            pageUp: document.querySelector('[data-page="page_up"]'),
            main: document.querySelector('[data-page="main"]'),
        };
        console.log(this.domObjects);
        this.navSticky = new NavSticky(this.domObjects);
        this.smooth = new SmoothTop(this.domObjects.topPage);
    }
    init() {
        this.navSticky.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.domObjects.pageUp.addEventListener('click', () => this.smooth.run());
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const MAIN_PAGE = new MainPage();
    MAIN_PAGE.init();
});
