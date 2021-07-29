'use strict';
import NavSticky from './modules/layout/NavSticky.esm.js';
import SmoothTop from './modules/layout/SmoothTop.esm.js';

const layoutDOM = {
    home: document.querySelector('[data-page="home_nav"]'),
    nav: document.querySelector('[data-page="nav"]'),
    pageUp: document.querySelector('[data-page="page_up"]'),
    main: document.querySelector('[data-page="main"]'),
    message: document.querySelector('[data-js="private"]'),
};

class Layout {
    #layoutDOM;
    #NavSticky;
    #Smooth;

    #message;
    constructor(layoutDOM) {
        this.#layoutDOM = layoutDOM;
        this.#message = layoutDOM.message;
        this.#NavSticky = new NavSticky(layoutDOM);
        this.#Smooth = new SmoothTop();
        console.warn('Aktualizacja: 29.07.2021 / 14:00');
    }
    init() {
        this.#NavSticky.init();
        this.#eventListeners();
        this.#noJS();
    }
    #eventListeners() {
        this.#layoutDOM.pageUp.addEventListener('click', () => this.#Smooth.init());
    }
    #noJS() {
        this.#message.style.display = 'none';
    }
}

new Layout(layoutDOM).init();
