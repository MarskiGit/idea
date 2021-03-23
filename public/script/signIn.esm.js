'use strict';
import ValidationForm from './abstract/ValidationForm.esm.js';

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
}

document.addEventListener('DOMContentLoaded', function () {
    const formObjects = {
        registration: false,
        form: document.querySelector('[data-signin="form"]'),
        errorMessage: document.querySelector('[data-signin="form_error"]'),
    };

    new SignIn(formObjects).init();
});
