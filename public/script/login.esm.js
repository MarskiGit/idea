'use strict';
import { localhost } from './modules/seting.esm.js';
import FormHandling from './modules/FormHandling.esm.js';
import AjaxRequest from './modules/AjaxRequest.esm.js';

const formDOM = {
    request: 'login',
    form: document.querySelector('[data-form="login"]'),
    errorMessage: document.querySelector('[data-form="message"]'),
};

class Login {
    #FormHandling;
    #AjaxRequest;
    #inputList;
    #requestParam = {};
    constructor(formDOM) {
        this.#FormHandling = new FormHandling(formDOM);
        this.#AjaxRequest = new AjaxRequest(formDOM.request);
        this.#inputList = this.#FormHandling.getInputs(['INPUT']);
    }
    init() {
        this.#onBlur();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormHandling.form.addEventListener('submit', this.#formValidation);
    }
    #formValidation = (event) => {
        event.preventDefault();
        if (this.#FormHandling.emptyFields()) {
            this.#requestParam = { ...this.#FormHandling.getValue() };
            this.#sendRequest();
        } else this.#FormHandling.showMessage('Uzupełnij wszystkie pola');
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
                    this.#FormHandling.showMessage(`${title}`);
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

new Login(formDOM).init();
