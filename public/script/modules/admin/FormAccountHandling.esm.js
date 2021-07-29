'use strict';
import Api from '../Api.esm.js';
import FormHandling from '../FormHandling.esm.js';
import FormPassword from '../FormPassword.esm.js';

export default class FormAccountHandling {
    #Api;
    #FormHandling;
    #FormPassword;
    #requestParam;
    constructor(formObjects) {
        this.#requestParam = {
            request: formObjects.request,
        };

        this.#Api = new Api();
        this.#FormHandling = new FormHandling(formObjects);
        this.#FormPassword = new FormPassword();
    }

    init() {
        // this.#FormPassword.init(this.#inputList);
        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormHandling.form.addEventListener('submit', this.#validation);
    }
    #validation = (event) => {
        event.preventDefault();
        if (this.#FormHandling.emptyFields()) {
            this.#requestAPI();
        } else this.#FormHandling.showMessage('Uzupełnij wszystkie pola.');
    };
    #requestAPI = () => {
        document.body.style.cursor = 'progress';

        console.log(this.#FormHandling.getValue());
        // this.#Api
        //     .getJson(this.#requestParam)
        //     .then((data) => {
        //         this.apiData = data;
        //         this.#responseAPI();
        //     })
        //     .finally((document.body.style.cursor = 'default'));
    };
    #responseAPI() {
        const { ok, title } = this.apiData;
        if (Boolean(ok)) {
            this.#FormHandling.clear();
            this.#FormHandling.showMessage(`${title}`);
        } else {
            this.#FormHandling.showMessage(`${title}`);
        }
    }
}
