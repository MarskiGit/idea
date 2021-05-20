'use strict';
import { setingRequest } from './modules/seting.esm.js';
import FormHandling from './modules/FormHandling.esm.js';

const areaObjects = {
    isPassword: false,
    request: 'addArea',
    form: document.querySelector('[data-form="area"]'),
    errorMessage: document.querySelector('[data-form="area_message"]'),
};
const userObjects = {
    isPassword: false,
    request: 'addUser',
    form: document.querySelector('[data-form="account"]'),
    errorMessage: document.querySelector('[data-form="account_message"]'),
};

const addArea = new FormHandling(areaObjects, setingRequest).init();
const addUser = new FormHandling(userObjects, setingRequest).init();

class Admin {
    constructor() {}
    init() {
        this.#factory();
        this.#eventListeners();
    }
    #eventListeners() {}
    #factory() {}
}

new Admin().init();
