'use strict';
import { Config } from './modules/seting.esm.js';
import FormAreaHandling from './modules/admin/FormAreaHandling.esm.js';
import FormAccountHandling from './modules/admin/FormAccountHandling.esm.js';

function FormElement(request, form, errorMessage) {
    this.request = request;
    this.form = form;
    this.errorMessage = errorMessage;
}

const areaObjects = new FormElement('addArea', document.querySelector('[data-form="area"]'), document.querySelector('[data-form="area_message"]'));
const userObjects = new FormElement('addUser', document.querySelector('[data-form="account"]'), document.querySelector('[data-form="account_message"]'));

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
