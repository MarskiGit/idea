'use strict';
import FormValidation from '../FormValidation.esm.js';
import AjaxRequest from '../AjaxRequest.esm.js';

export default class FormAreaHandling {
    #FormValidation;
    #request;
    #AjaxRequest;
    #requestParam = {};
    constructor(formObjects) {
        this.#FormValidation = new FormValidation(formObjects);
        this.#request = formObjects.request;
        this.#AjaxRequest = new AjaxRequest();
    }
    init() {
        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormValidation.form.addEventListener('submit', this.#handling);
    }
    #handling = (event) => {
        event.preventDefault();
        if (this.#FormValidation.emptyFields()) {
            this.#sendRequest();
        } else this.#FormValidation.showMessage('Uzupełnij wszystkie pola.');
    };
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#requestParam = {
            request: this.#request,
            ...this.#FormValidation.getValue(),
        };
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                const { ok, title } = this.#AjaxRequest.getData(data);
                if (ok) {
                    this.#FormValidation.clearField();
                    this.#FormValidation.showMessage(`${title}`);
                } else {
                    this.#FormValidation.showMessage(`${title}`);
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
}
