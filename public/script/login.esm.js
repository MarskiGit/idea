'use strict';
import { setingRequest, localhost } from './modules/seting.esm.js';
import FormHandling from './modules/FormHandling.esm.js';
import Request from './modules/Request.esm.js';

const formObjects = {
    registration: false,
    request: 'signIn',
    form: document.querySelector('[data-signin="form"]'),
    errorMessage: document.querySelector('[data-signin="form_error"]'),
};

class Login {
    #Ajax;
    #inputList;
    #request = {};

    /**
     * Obsługa formularza logowania.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     */
    constructor(formObjects, setingRequest) {
        this.FormHandling = new FormHandling(formObjects);
        this.errorMessage = formObjects.errorMessage;
        this.#request.request = formObjects.request;

        this.#Ajax = new Request(setingRequest);
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
            this.#request = {
                request: 'login',
                ...this.formParams,
            };

            document.body.style.cursor = 'progress';
            this.#Ajax
                .getJson(this.#request)
                .then((data) => {
                    if (data.ok === true) {
                        location.replace(localhost);
                    } else {
                        this.errorMessage.textContent = 'Podano błędne dane logowania';
                        this.FormHandling.formError();
                    }
                })
                .finally((document.body.style.cursor = 'default'));
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

new Login(formObjects, setingRequest).init();
