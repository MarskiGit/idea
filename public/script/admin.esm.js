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

export default class Admin {
    #page;

    init(adminPage) {
        this.#page = adminPage;

        this.#factory();
        this.#eventListeners();
    }
    #eventListeners() {}
    #factory() {
        switch (this.#page) {
            case 'home':
                break;
            case 'points':
                break;
            case 'management':
                break;
            case 'area':
                new FormAreaHandling(areaObjects).init();
                break;
            case 'user':
                new FormAccountHandling(userObjects).init();
                break;

            default:
                break;
        }
    }
}
