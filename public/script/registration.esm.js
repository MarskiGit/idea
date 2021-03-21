'use strict';
import AbstractForm from './abstract/AbstractForm.esm.js';

class Registration extends AbstractForm {
    /**
     * Obsługa formularza rejestracji.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     */
    constructor(formObjects) {
        super(formObjects);
    }
    formValidation = (event) => {
        event.preventDefault();
        if (this.Filed.emptyFields()) {
            this.formError(false);
            if (this.Filed.getStrenght() !== 3) {
                this.formObjects.errorMessage.textContent = `Zastosuj silne hasło`;
            } else {
                this.formParams = this.Filed.getValue();
                this.clearField();
                console.log(this.formParams);
            }
        } else {
            this.formError(true);
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const formObjects = {
        registration: true,
        form: document.querySelector('[data-registration="form"]'),
        errorMessage: document.querySelector('[data-registration="form_error"]'),
        strengthMeter: document.querySelector('[data-registration="strength-meter"]'),
        strengthMessage: document.querySelector('[data-registration="strength-message"]'),
        passInput: document.querySelector('[data-registration="password"]'),
    };

    const REG = new Registration(formObjects);
    REG.init();
});
