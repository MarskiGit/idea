'use strict';
import NavSticky from './modules/layout/NavSticky.esm.js';
import SmoothTop from './modules/layout/SmoothTop.esm.js';

const layoutDOM = {
    home: document.querySelector('[data-page="home_nav"]'),
    nav: document.querySelector('[data-page="nav"]'),
    main: document.querySelector('[data-page="main"]'),
    list: document.querySelector('[data-menu="list"]'),
};

export default class Layout {
    #NavSticky = new NavSticky(layoutDOM);
    #Smooth = new SmoothTop();

    init() {
        this.#NavSticky.init();
        this.#eventListeners();
    }
    #eventListeners() {
        //this.#layoutDOM.pageUp.addEventListener('click', () => this.#Smooth.init());
    }
}
