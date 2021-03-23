'use strict';
import ValidationForm from './abstract/ValidationForm.esm.js';

class Registration extends ValidationForm {
    /**
     * Obsługa formularza rejestracji.
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
            if (this.getStrenght() !== 3) {
                this.formError();
                this.formObjects.errorMessage.textContent = 'Zastosuj silne hasło.';
            } else {
                this.formParams = this.getValue();
                this.clearField();
                console.log(this.formParams);
            }
        } else {
            this.formObjects.errorMessage.textContent = 'Uzupełnij wszystkie pola.';
            this.formError();
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

    new Registration(formObjects).init();
});
