'use strict';
import FieldValidation from './mod/FieldValidation.esm.js';
import Request from './mod/Request.esm.js';

class Registration {
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
        form: document.querySelector('[data-registration="form"]'),
        errorMessage: document.querySelector('[data-registration="form_error"]'),
        strengthMeter: document.querySelector('[data-registration="strength-meter"]'),
        strengthMessage: document.querySelector('[data-registration="strength-message"]'),
    };
    /**
     * Obsługa fomularza rejestracji
     */
    constructor() {
        this.Filed = new FieldValidation(this.#domObjects);
        this.Request = new Request(this.#optionRequest);
    }
    init() {
        this.Filed.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#domObjects.form.addEventListener('submit', this.#formValidation.bind(this));
    }
    #formValidation(event) {
        event.preventDefault();

        if (this.Filed.emptyFields()) {
            this.#formError(false);
            this.#formParams = this.Filed.getValue();
            if (this.Filed.strengthPass !== 3) this.#domObjects.errorMessage.textContent = `Zastosuj silne hasło`;
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
    const REG = new Registration();
    REG.init();
});
