'use strict';
import { Config } from './modules/seting.esm.js';
import Api from './modules/Api.esm.js';
import FormHandling from './modules/FormHandling.esm.js';

const formDOM = {
    request: 'login',
    form: document.querySelector('[data-form="login"]'),
    errorMessage: document.querySelector('[data-form="message"]'),
};

class Login extends Api {
    #FormHandling;
    #inputList;
    constructor(formDOM) {
        super(formDOM.request);
        this.#FormHandling = new FormHandling(formDOM);
        this.#inputList = this.#FormHandling.getInputs(['INPUT']);
    }
    init() {
        this.#onBlur();
        this.#eventListeners();
    }
    responseAPI() {
        const { ok, title } = this.apiData;
        if (Boolean(ok)) {
            location.replace(Config.localhost);
        } else {
            this.#FormHandling.showMessage(`${title}`);
            // localStorage.setItem('key', 'value');
        }
    }
    #eventListeners() {
        this.#FormHandling.form.addEventListener('submit', this.#formValidation);
    }
    #formValidation = (event) => {
        event.preventDefault();
        if (this.#FormHandling.emptyFields()) {
            const { login, password } = this.#FormHandling.getValue();
            this.requestParam.login = login;
            this.requestParam.password = password;

            this.requestAPI();
        } else this.#FormHandling.showMessage('Uzupełnij wszystkie pola');
    };
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
}

new Login(formDOM).init();
