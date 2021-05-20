'use strict';
import { setingRequest, localhost } from './modules/seting.esm.js';
import FormValidation from './modules/FormValidation.esm.js';
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
    constructor(formObjects, setingRequest) {
        this.FormValidation = new FormValidation(formObjects);
        this.errorMessage = formObjects.errorMessage;
        this.#request.request = formObjects.request;

        this.#Ajax = new Request(setingRequest);
        this.#inputList = this.FormValidation.getInputs(['INPUT']);
    }

    init() {
        this.FormValidation.init();
        this.#onBlur();
        this.#eventListeners();
    }
    #eventListeners() {
        this.FormValidation.form.addEventListener('submit', this.#formHandling);
    }
    #formHandling = (event) => {
        event.preventDefault();
        if (this.FormValidation.emptyFields()) {
            this.formParams = this.FormValidation.getValue();
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
                        this.FormValidation.formError();
                    }
                })
                .finally((document.body.style.cursor = 'default'));
        } else {
            this.FormValidation.formError();
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
