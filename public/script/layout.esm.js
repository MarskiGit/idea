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
    /**
     * Fabryka zarządzająca wyglądem strony.
     */
    constructor() {
        this.NavSticky = new NavSticky(this.#domObjects);
        this.Smooth = new SmoothTop();
    }
    init() {
        this.NavSticky.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#domObjects.pageUp.addEventListener('click', () => this.Smooth.animation());
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new Layout().init();
});
