'use strict';
import { Config, CreateRequest } from './modules/seting.esm.js';
import { storage } from './modules/seting.esm.js';
import FormHandling from './modules/FormHandling.esm.js';

const formDOM = {
    request: 'login',
    form: document.querySelector('[data-form="login"]'),
    errorMessage: document.querySelector('[data-form="message"]'),
};

export default class Login {
    #requestParam;
    #Api;
    #FormHandling;
    #inputList;
    constructor(Api) {
        this.#requestParam = CreateRequest(formDOM.request);
        this.#Api = new Api();
        this.#FormHandling = new FormHandling(formDOM);
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
            const { login, password } = this.#FormHandling.getValue();
            this.#requestParam.add('login', login);
            this.#requestParam.add('password', password);
            this.#requestAPi();
        } else this.#FormHandling.showMessage('Uzupełnij wszystkie pola');
    };
    #requestAPi = () => {
        document.body.style.cursor = 'progress';
        this.#Api
            .getJson(this.#requestParam.get())
            .then((data) => {
                this.apiData = data;
                this.#responseAPI();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #responseAPI() {
        const { ok, title } = this.apiData;
        if (Boolean(ok)) {
            storage.saveItems('userLogin', true);
            location.replace(Config.localhost);
        } else {
            this.#FormHandling.showMessage(`${title}`);
            // localStorage.setItem('key', 'value');
        }
    }
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
}
