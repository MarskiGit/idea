'use strict';
import PasswordStrength from './PasswordStrength.esm.js';
import Request from './Request.esm.js';

export default class ValidationForm {
    #inputCollection;
    #fieldsValue;
    #data;
    #params = {};
    /**
     * Klasa abstrakcyjna do obsługi formularzy.
     * Instancjie Request.
     * @param {!object} formObjects
     */
    constructor(formObjects) {
        this.setingRequest = {
            ajax: {
                method: 'POST',
                mode: 'cors',
                cache: 'no-store',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            },
            url: 'ajax.php',
        };
        this.formObjects = formObjects;
        this.form = formObjects.form;
        this.registration = formObjects.registration;
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.#factory();
        this.eventListeners();
    }
    eventListeners() {
        this.formObjects.form.addEventListener('submit', this.formValidation);
    }
    /**
     * Wyświetla komunikat o błędzie.
     */
    formError() {
        this.formObjects.errorMessage.classList.add('span_error');
        setTimeout(() => this.formObjects.errorMessage.classList.remove('span_error'), 2000);
    }
    /**
     * Czyści pola formularza.
     */
    clearField() {
        [...this.formObjects.form].filter((e) => 'INPUT' === e.nodeName || 'TEXTAREA' === e.nodeName).forEach((e) => (e.value = ''));
    }
    /**
     *
     * @returns Zwraca obiekt z danymi formularza.
     */
    getValue() {
        for (const pair of this.#data.entries()) {
            this.#params[pair[0]] = pair[1];
        }
        return this.#params;
    }
    /**
     * @returns Zwraca siłę hasła | Number.
     */
    getStrenghtPass() {
        return this.Pass.getStrength();
    }
    /**
     * @returns Sprawdź, czy pola są puste | Boolean.
     */
    emptyFields = () => (this.#formData() === this.#fieldsValue.filter((e) => e !== '').length ? true : false);
    /**
     * Dodaje efekt Css inputów formularza
     */
    getInputCollection() {
        this.#inputCollection = [...this.formObjects.form].filter((e) => {
            if ('INPUT' === e.nodeName) return e;
        });
        return this.#inputCollection;
    }
    /**
     * Fabryka obiektów.
     */
    #factory() {
        this.Request = new Request(this.setingRequest);
        if (this.registration) {
            this.Pass = new PasswordStrength(this.formObjects.passInput, this.formObjects.strengthMessage, this.formObjects.strengthMeter);
            this.Pass.init();
        }
    }
    #formData() {
        this.#data = new FormData(this.form);
        this.#fieldsValue = [...this.#data.values()];
        return this.#fieldsValue.length;
    }
}

// #emailChar = (t) =>
// new RegExp(
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// ).test(String(t).toLowerCase());
