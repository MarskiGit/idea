'use strict';
import { setingRequest } from './modules/seting.esm.js';
import Registration from './modules/Registration.esm.js';

const areaObjects = {
    isPassword: false,
    request: 'addArea',
    form: document.querySelector('[data-registration="form_area"]'),
    errorMessage: document.querySelector('[data-registration="area_error"]'),
};
const userObjects = {
    isPassword: false,
    request: 'addUser',
    form: document.querySelector('[data-registration="form_account"]'),
    errorMessage: document.querySelector('[data-registration="account_error"]'),
};

const addArea = new Registration(areaObjects, setingRequest);

const addUser = new Registration(userObjects, setingRequest);
addArea.init();
addUser.init();

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
