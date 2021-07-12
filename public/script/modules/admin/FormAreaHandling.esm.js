'use strict';
import FormHandling from '../FormHandling.esm.js';
import AjaxRequest from '../AjaxRequest.esm.js';

export default class FormAreaHandling {
    #FormHandling;
    #AjaxRequest;
    #requestParam = {};
    constructor(formObjects) {
        this.#FormHandling = new FormHandling(formObjects);
        this.#AjaxRequest = new AjaxRequest(formObjects.request);
    }
    init() {
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
