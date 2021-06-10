'use strict';
import { setingRequest } from '../seting.esm.js';
import FormValidation from '../FormValidation.esm.js';
import Request from '../Request.esm.js';

export default class FormAreaHandling {
    #FormValidation;
    #params;
    #Request;
    #request = {};
    constructor(formObjects) {
        this.#FormValidation = new FormValidation(formObjects);
        this.#params = formObjects.request;
        this.#Request = new Request(setingRequest);
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
        this.#request = {
            request: this.#params,
            ...this.#FormValidation.getValue(),
        };
        this.#Request
            .getJson(this.#request)
            .then((data) => {
                const { ok, title } = this.#Request.getData(data);
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
