'use strict';
import PasswordStrength from '../mod/PasswordStrength.esm.js';
import Request from '../mod/Request.esm.js';

export default class ValidationForm {
    #fieldsValue;
    #data;
    #params = {};
    /**
     * Klasa abstrakcyjna do obsługi formularzy.
     * Instancjie FieldValidation i Request.
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
        this.formParams = {};
        this.Request = new Request(this.setingRequest);
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.eventListeners();
        if (this.registration) {
            this.Pass = new PasswordStrength(this.formObjects.passInput, this.formObjects.strengthMessage, this.formObjects.strengthMeter);
            this.Pass.init();
        }
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
     * @returns Zwraca aktualną siłę hasła.
     */
    getStrenght() {
        return this.Pass.strengthPass;
    }
    /**
     * @returns Sprawdź, czy pola są puste. Zwraca wartość bool.
     */
    emptyFields = () => (this.#formData() === this.#fieldsValue.filter((e) => e !== '').length ? true : false);
    #emailChar = (t) =>
        new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(String(t).toLowerCase());
    #formData() {
        this.#data = new FormData(this.form);
        this.#fieldsValue = [...this.#data.values()];
        return this.#fieldsValue.length;
    }
}
