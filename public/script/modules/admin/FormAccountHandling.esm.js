'use strict';
import FormHandling from '../FormHandling.esm.js';
import FormPassword from '../FormPassword.esm.js';
import AjaxRequest from '../AjaxRequest.esm.js';

export default class FormAccountHandling {
    #FormHandling;
    #FormPassword;
    #AjaxRequest;
    #requestParam = {};
    constructor(formObjects) {
        this.#FormHandling = new FormHandling(formObjects);
        this.#FormPassword = new FormPassword();
        this.#AjaxRequest = new AjaxRequest(formObjects.request);
    }

    init() {
        // this.#FormPassword.init(this.#inputList);
        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormHandling.form.addEventListener('submit', this.#handling);
    }
    #handling = (event) => {
        event.preventDefault();
        if (this.#FormHandling.emptyFields()) {
            this.#sendRequest();
        } else this.#FormHandling.showMessage('Uzupełnij wszystkie pola.');
    };
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#requestParam = { ...this.#FormHandling.getValue() };
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                const { ok, title } = this.#AjaxRequest.getData(data);
                console.log(ok, title);
                if (ok) {
                    this.#FormHandling.clearField();
                    this.#FormHandling.showMessage(`${title}`);
                } else {
                    this.#FormHandling.showMessage(`${title}`);
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
}
