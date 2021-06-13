'use strict';
import FormValidation from './FormValidation.esm.js';
import FormPassword from './FormPassword.esm.js';
import AjaxRequest from './AjaxRequest.esm.js';

const formObjects = {
    request: 'addUser',
    form: document.querySelector('[data-form="admin"]'),
    errorMessage: document.querySelector('[data-form="admin_message"]'),
    strengthMeter: document.querySelector('[data-registration="strength_meter"]'),
    strengthMessage: document.querySelector('[data-registration="strength_message"]'),
    identicalMessage: document.querySelector('[data-registration="identical_message"]'),
};

class FormHandling {
    #FormValidation;
    #FormPassword;
    #AjaxRequest;
    #request;
    #requestParams = {};
    #inputList;
    constructor(formObjects) {
        this.#FormValidation = new FormValidation(formObjects);
        this.#FormPassword = new FormPassword(formObjects.strengthMessage, formObjects.strengthMeter, formObjects.identicalMessage);
        this.#request = formObjects.request;

        this.#AjaxRequest = new AjaxRequest();
        this.#inputList = this.#FormValidation.getInputs(['INPUT'], 'password');
    }
    init() {
        this.#FormPassword.init(this.#inputList);
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
        this.#requestParams = {
            request: this.#request,
            ...this.#FormValidation.getValue(),
        };
        this.#AjaxRequest
            .getJson(this.#requestParams)
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

new FormHandling(formObjects).init();
