'use strict';
import { setingRequest, localhost } from './modules/seting.esm.js';
import FormValidation from './modules/FormValidation.esm.js';
import Request from './modules/Request.esm.js';

const formObjects = {
    isPassword: false,
    request: 'signIn',
    form: document.querySelector('[data-form="login"]'),
    errorMessage: document.querySelector('[data-form="message"]'),
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
                .then((data) => (data.ok === true ? location.replace(localhost) : this.FormValidation.showMessage('Podano błędne dane logowania')))
                .finally((document.body.style.cursor = 'default'));
        } else this.FormValidation.showMessage('Uzupełnij wszystkie pola');
    };
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
}

new Login(formObjects, setingRequest).init();
