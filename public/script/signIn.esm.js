'use strict';
import AbstractForm from './abstract/AbstractForm.esm.js';

class SignIn extends AbstractForm {
    /**
     * Obsługa formularza logowania.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     */
    constructor(formObjects) {
        super(formObjects);
    }
    formValidation = (event) => {
        event.preventDefault();
        if (this.Filed.emptyFields()) {
            this.formParams = this.Filed.getValue();
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

    const SIGN_IN = new SignIn(formObjects);
    SIGN_IN.init();
});
