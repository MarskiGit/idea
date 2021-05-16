'use strict';
import FormHandling from '../FormHandling.esm.js';
import Request from '../Request.esm.js';

export default class Registration {
    #Ajax;
    #inputList;
    #params;
    #request = {};
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
    };

    /**
     * Obsługa formularza rejestracji.
     * Dziedziczy z FormHandling.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     */
    constructor(formObjects) {
        this.FormHandling = new FormHandling(formObjects);
        this.errorMessage = formObjects.errorMessage;
        this.#params = formObjects.request;

        this.#setingRequest.url = formObjects.url;

        this.#Ajax = new Request(this.#setingRequest);
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
            this.formParams = this.FormHandling.getValue();
            this.#request = {
                request: this.#params,
                ...this.formParams,
            };

            document.body.style.cursor = 'progress';
            this.#Ajax
                .getJson(this.#request)
                .then((data) => {
                    if (data.ok === true) {
                        this.FormHandling.clearField();
                        this.$showMasage('Dodano z powodzeniem');
                    } else {
                        this.$showMasage(`${data.title}: ${data.account}`);
                        console.log(data);
                    }
                })
                .finally((document.body.style.cursor = 'default'));
        } else {
            this.$showMasage('Uzupełnij wszystkie pola.');
        }
    };
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
    $showMasage(messafe) {
        this.errorMessage.textContent = `${messafe}`;
        this.FormHandling.formError();
    }
}

// new Registration(formObjects).init();
