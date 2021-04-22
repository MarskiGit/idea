'use strict';
import FormHandling from './modules/FormHandling.esm.js';
import Request from './modules/Request.esm.js';

class SignIn {
    #Request;
    #inputList;
    #request = {
        action: 'signIn',
    };
    #setingRequest = {
        ajax: {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        },
        url: 'ajax.php',
    };
    /**
     * Obsługa formularza logowania.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     */
    constructor(formObjects) {
        this.FormHandling = new FormHandling(formObjects);

        this.#Request = new Request(this.#setingRequest);
        this.#inputList = this.FormHandling.getInputs(['INPUT']);
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.FormHandling.init();
        this.#onBlur();
        this.#eventListeners();
    }
    #eventListeners() {
        this.FormHandling.form.addEventListener('submit', this.#formValidation);
    }
    /**
     * Walidacja formularza.
     * @param {!object} event Obiekt zdarzenia submit.
     */
    #formValidation = (event) => {
        event.preventDefault();
        if (this.FormHandling.emptyFields()) {
            this.formParams = this.FormHandling.getValue();
            this.FormHandling.clearField();
            console.log(this.formParams);
        } else {
            this.FormHandling.formError();
        }
    };
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const formObjects = {
        registration: false,
        form: document.querySelector('[data-signin="form"]'),
        errorMessage: document.querySelector('[data-signin="form_error"]'),
    };

    new SignIn(formObjects).init();
});
