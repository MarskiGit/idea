'use strict';
import { Config } from './modules/config.esm.js';
import { handleRequestParams } from './modules/modules.esm.js';
import { storage } from './modules/modules.esm.js';
import FormHandling from './modules/FormHandling.esm.js';

const formDOM = {
    request: 'login',
    form: document.querySelector('[data-form="login"]'),
    errorMessage: document.querySelector('[data-form="message"]'),
    submitButton: document.querySelector('[data-form="btn_submit"]'),
};

export default class Login {
    #requestParam = handleRequestParams(formDOM.request);
    #Api;
    #Api_data;

    #FormHandling = new FormHandling(formDOM);
    #inputList;

    init(Api) {
        this.#Api = new Api();
        this.#inputList = this.#FormHandling.getInputs(['INPUT']);
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
            this.#requestParam.set('login', login);
            this.#requestParam.set('password', password);
            this.#Api_request();
        } else this.#FormHandling.showMessage('Uzupełnij wszystkie pola');
    };
    #Api_request = () => {
        document.body.style.cursor = 'progress';
        this.#Api
            .postJson(this.#requestParam.getPost())
            .then((data) => {
                this.#Api_data = data;
                this.#Api_response();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #Api_response() {
        const { ok, title } = this.#Api_data;
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
