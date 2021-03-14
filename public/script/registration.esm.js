'use strict';
import FieldValidation from './mod/FieldValidation.esm.js';

class Registration {
    #domObjects = {
        form: document.querySelector('[data-form="registration"]'),
        errorMessage: document.querySelector('[data-form="error"]'),
        strengthMeter: document.querySelector('[data-form="strength-meter"]'),
        strengthMesage: document.querySelector('[data-form="strength-mesage"]'),
    };
    constructor() {
        this.FORM = new FieldValidation(this.#domObjects);
    }
    init() {
        this.FORM.init();
        this.#eventListeners();

        // console.log(this.pass);
    }
    #eventListeners() {
        this.#domObjects.form.addEventListener('submit', this.#formSubmit.bind(this));
    }
    #formSubmit(event) {
        event.preventDefault();
        this.FORM = new FieldValidation(this.#domObjects);

        if (this.FORM.emptyFields()) {
            this.FORM.getValue();

            console.log(this.FORM.getValue());
        } else {
            this.#domObjects.errorMessage.textContent = 'Uzupełnij wszystie pola';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const REG = new Registration();
    REG.init();
});
