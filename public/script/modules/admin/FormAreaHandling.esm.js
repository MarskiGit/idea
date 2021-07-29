'use strict';
import Api from '../Api.esm.js';
import FormHandling from '../FormHandling.esm.js';

export default class FormAreaHandling {
    #requestParam;
    #Api;
    #FormHandling;
    constructor(formObjects) {
        this.#requestParam = {
            request: formObjects.request,
        };

        this.#Api = new Api();
        this.#FormHandling = new FormHandling(formObjects);
    }
    init() {
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
        const { area_name } = this.#FormHandling.getValue();
        this.#requestParam.area_name = area_name;
        this.#Api
            .getJson(this.#requestParam)
            .then((data) => {
                this.apiData = data;
                this.#responseAPI();
            })
            .finally((document.body.style.cursor = 'default'));
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
