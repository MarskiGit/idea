'use strict';
import FormValidation from './FormValidation.esm.js';
import Request from './Request.esm.js';

export default class FormHandling {
    #Request;
    #params;
    #request = {};
    #inputList;
    constructor(formObjects, setingRequest) {
        this.FormValidation = new FormValidation(formObjects);
        this.#params = formObjects.request;

        this.#Request = new Request(setingRequest);
        this.#inputList = this.FormValidation.getInputs(['INPUT']);
    }

    init() {
        this.FormValidation.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.FormValidation.form.addEventListener('submit', this.#handling);
    }
    #handling = (event) => {
        event.preventDefault();
        if (this.FormValidation.emptyFields()) {
            this.#sendRequest();
        } else this.FormValidation.showMessage('Uzupełnij wszystkie pola.');
    };
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#request = {
            request: this.#params,
            ...this.FormValidation.getValue(),
        };
        this.#Request
            .getJson(this.#request)
            .then((data) => {
                const { ok, title } = this.#Request.getData(data);
                console.log(ok, title);
                if (ok) {
                    this.FormValidation.clearField();
                    this.FormValidation.showMessage(`${title}`);
                } else {
                    this.FormValidation.showMessage(`${title}`);
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
}
