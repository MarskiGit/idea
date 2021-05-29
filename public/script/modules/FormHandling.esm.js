'use strict';
import FormValidation from './FormValidation.esm.js';
import Request from './Request.esm.js';

export default class FormHandling {
    #Ajax;
    #isPassword;
    #params;
    #request = {};
    #inputList;
    constructor(formObjects, setingRequest) {
        this.FormValidation = new FormValidation(formObjects);
        this.#isPassword = formObjects.isPassword;
        this.#params = formObjects.request;

        this.#Ajax = new Request(setingRequest);
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
            if (this.#isPassword) {
                const { strength, identical } = this.FormValidation.getInfoPass();
                if (strength === 3) {
                    if (identical) {
                        this.#sendRequest();
                    } else this.FormValidation.showMessage('Zastosuj takie same hasła');
                } else this.FormValidation.showMessage('Hasło musi być silne');
            } else {
                this.#sendRequest();
            }
        } else this.FormValidation.showMessage('Uzupełnij wszystkie pola.');
    };
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#request = {
            request: this.#params,
            ...this.FormValidation.getValue(),
        };
        this.#Ajax
            .getJson(this.#request)
            .then((data) => {
                if (data.ok === true) {
                    this.FormValidation.clearField();
                    this.FormValidation.showMessage('Dodano z powodzeniem');
                } else {
                    this.FormValidation.showMessage(`${data.title}: ${data.account}`);
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
}
