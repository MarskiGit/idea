'use strict';
import { localhost } from './modules/seting.esm.js';
import FormValidation from './modules/FormValidation.esm.js';
import AjaxRequest from './modules/AjaxRequest.esm.js';

const formObjects = {
    request: 'login',
    form: document.querySelector('[data-form="login"]'),
    errorMessage: document.querySelector('[data-form="message"]'),
};

class Login {
    #request = {};
    #FormValidation;
    #AjaxRequest;
    #inputList;
    #requestParam;
    #date;
    constructor(formObjects) {
        this.#request.request = formObjects.request;
        this.#FormValidation = new FormValidation(formObjects);
        this.#AjaxRequest = new AjaxRequest();
        this.#inputList = this.#FormValidation.getInputs(['INPUT']);
        this.#date = new Date();
    }
    init() {
        this.#onBlur();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormValidation.form.addEventListener('submit', this.#formHandling);
    }
    #formHandling = (event) => {
        event.preventDefault();
        if (this.#FormValidation.emptyFields()) {
            this.#requestParam = { ...this.#request, ...this.#FormValidation.getValue() };
            this.#sendRequest();
        } else this.#FormValidation.showMessage('Uzupełnij wszystkie pola');
    };
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                const { ok, title } = this.#AjaxRequest.getData(data);
                if (ok) {
                    location.replace(localhost);
                } else {
                    this.#FormValidation.showMessage(`${title}`);
                    // localStorage.setItem('key', 'value');
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
}

new Login(formObjects).init();
