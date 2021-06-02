'use strict';
import FormValidation from './FormValidation.esm.js';
import Request from './Request.esm.js';

export default class FormHandling {
    #Request;
    #isPassword;
    #params;
    #request = {};
    #inputList;
    constructor(formObjects, setingRequest) {
        this.FormValidation = new FormValidation(formObjects);
        this.#isPassword = formObjects.isPassword;
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
                    // localStorage.setItem('key', 'value');
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
}
