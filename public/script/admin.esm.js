'use strict';

import FormAreaHandling from './modules/admin/FormAreaHandling.esm.js';
import FormAccountHandling from './modules/admin/FormAccountHandling.esm.js';

const areaObjects = {
    request: 'addArea',
    form: document.querySelector('[data-form="area"]'),
    errorMessage: document.querySelector('[data-form="area_message"]'),
};
const userObjects = {
    request: 'addUser',
    form: document.querySelector('[data-form="account"]'),
    errorMessage: document.querySelector('[data-form="account_message"]'),
};

class Admin {
    constructor() {}
    init() {
        this.#factory();
        this.#eventListeners();
    }
    #eventListeners() {}
    #factory() {
        if (areaObjects.form) {
            new FormAreaHandling(areaObjects).init();
        }
        if (userObjects.form) {
            new FormAccountHandling(userObjects).init();
        }
    }
}

new Admin().init();
