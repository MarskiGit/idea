'use strict';
import FieldValidation from './mod/FieldValidation.esm.js';
import Request from './mod/Request.esm.js';

class SignIn {
    #optionRequest = {
        ajax: {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        },
        url: 'ajax.php',
    };
    #formParams = {};
    #domObjects = {
        form: document.querySelector('[data-signin="form"]'),
        errorMessage: document.querySelector('[data-signin="form_error"]'),
    };
    /**
     * Obsługa fomularza logowania
     */
    constructor() {
        this.Filed = new FieldValidation(this.#domObjects);
        this.Request = new Request(this.#optionRequest);
    }
    init() {
        this.Filed.init();
        this.#eventListeners();

        // console.log(this.pass);
    }
    #eventListeners() {
        this.#domObjects.form.addEventListener('submit', this.#formValidation.bind(this));
    }
    #formValidation(event) {
        event.preventDefault();
        if (this.Filed.emptyFields()) {
            this.#formError(false);
            this.#formParams = this.Filed.getValue();
            console.log(this.#formParams);
        } else {
            this.#formError(true);
        }
    }
    #formError(flag) {
        this.#domObjects.errorMessage.textContent = flag ? 'Uzupełnij wszystie pola' : '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const SIGN_IN = new SignIn();
    SIGN_IN.init();
});
