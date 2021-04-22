'use strict';
import FormHandling from './modules/FormHandling.esm.js';
import Request from './modules/Request.esm.js';

class Registration {
    #Request;
    #inputList;
    #request = {
        action: 'registration',
    };
    #setingRequest = {
        ajax: {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        },
        url: 'ajax.php',
    };
    /**
     * Obsługa formularza rejestracji.
     * Dziedziczy z FormHandling.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     */
    constructor(formObjects) {
        this.FormHandling = new FormHandling(formObjects);
        this.errorMessage = formObjects.errorMessage;

        this.#Request = new Request(this.#setingRequest);
        this.#inputList = this.FormHandling.getInputs(['INPUT']);
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.FormHandling.init();
        this.#onBlur();
        this.#eventListeners();
    }
    #eventListeners() {
        this.FormHandling.form.addEventListener('submit', this.#formValidation);
    }
    /**
     * Walidacja formularza.
     * @param {!object} event Obiekt zdarzenia submit.
     */
    #formValidation = (event) => {
        event.preventDefault();
        if (this.FormHandling.emptyFields()) {
            if (this.FormHandling.getStrenghtPass() !== 3) {
                this.errorMessage.textContent = 'Zastosuj silne hasło.';
                this.FormHandling.formError();
            } else {
                this.formParams = this.FormHandling.getValue();
                this.FormHandling.clearField();
                console.log(this.formParams);
            }
        } else {
            this.errorMessage.textContent = 'Uzupełnij wszystkie pola.';
            this.FormHandling.formError();
        }
    };
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const formObjects = {
        registration: true,
        form: document.querySelector('[data-registration="form"]'),
        errorMessage: document.querySelector('[data-registration="form_error"]'),
        strengthMeter: document.querySelector('[data-registration="strength_meter"]'),
        strengthMessage: document.querySelector('[data-registration="strength_message"]'),
    };

    new Registration(formObjects).init();
});
