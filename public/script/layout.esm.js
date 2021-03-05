'use strict';
import { NavAnimation } from './layout/NavAnimation.esm.js';

class mainPage {
    constructor() {
        this.domElements = {
            nav: document.querySelector('[data-page="nav"]'),
            pageUp: document.querySelector('[data-page="page_up"]'),
            main: document.querySelector('[data-page="main"]'),
        };
        this.navAnimation = new NavAnimation(this.domElements);
    }
    init() {
        this.navAnimation.init();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const MAINPAGE = new mainPage();
    MAINPAGE.init();
});
