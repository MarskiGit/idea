'use strict';
import NavSticky from './modules/layout/NavSticky.esm.js';
import SmoothTop from './modules/layout/SmoothTop.esm.js';

const domObjects = {
    home: document.querySelector('[data-page="home_nav"]'),
    nav: document.querySelector('[data-page="nav"]'),
    pageUp: document.querySelector('[data-page="page_up"]'),
    main: document.querySelector('[data-page="main"]'),
};

class Layout {
    #domObjects;
    #NavSticky;
    #Smooth;
    constructor(domObjects) {
        this.#domObjects = domObjects;
        this.#NavSticky = new NavSticky(domObjects);
        this.#Smooth = new SmoothTop();
    }
    init() {
        this.#NavSticky.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#domObjects.pageUp.addEventListener('click', () => this.#Smooth.init());
    }
}

new Layout(domObjects).init();
