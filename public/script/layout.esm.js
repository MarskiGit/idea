'use strict';
import NavSticky from './modules/layout/NavSticky.esm.js';
import SmoothTop from './modules/layout/SmoothTop.esm.js';

const layoutDOM = {
    home: document.querySelector('[data-page="home_nav"]'),
    nav: document.querySelector('[data-page="nav"]'),
    pageUp: document.querySelector('[data-page="page_up"]'),
    main: document.querySelector('[data-page="main"]'),
};

export default class Layout {
    #layoutDOM = layoutDOM;
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
