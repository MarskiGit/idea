'use strict';
import NavAnimation from './layout/NavAnimation.esm.js';

class MainPage {
    constructor() {
        this.domObjects = {
            nav: document.querySelector('[data-page="nav"]'),
            pageUp: document.querySelector('[data-page="page_up"]'),
            main: document.querySelector('[data-page="main"]'),
        };
        this.navAnimation = new NavAnimation(this.domObjects);
    }
    init() {
        this.navAnimation.init();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const MAIN_PAGE = new MainPage();
    MAIN_PAGE.init();
});
