'use strict';
import ValidationForm from './modules/ValidationForm.esm.js';

class SignIn extends ValidationForm {
    #request = {
        action: 'signIn',
    };
    /**
     * Obsługa formularza logowania.
     * Dziedziczy z ValidationForm.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     */
    constructor(formObjects) {
        super(formObjects);
        this.onBlur();
    }
    /**
     * Walidacja formularza.
     * @param {!object} event Obiekt zdarzenia submit.
     */
    formValidation = (event) => {
        event.preventDefault();
        if (this.emptyFields()) {
            this.formParams = this.getValue();
            this.clearField();
            console.log(this.formParams);
        } else {
            this.formError();
        }
    };
    onBlur() {
        this.getInputCollection().forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const formObjects = {
        registration: false,
        form: document.querySelector('[data-signin="form"]'),
        errorMessage: document.querySelector('[data-signin="form_error"]'),
    };

    new SignIn(formObjects).init();
});
