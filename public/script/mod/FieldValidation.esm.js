'use strict';
import PasswordStrength from './PasswordStrength.esm.js';
export default class FieldValidation {
    #fieldsValue;
    #data;
    #params = {};
    /**
     * Walidacja pól formularza.
     * @param {!object} formObjects Obiekt z danymi do obsługi formularza.
     */
    constructor(formObjects) {
        this.formObjects = formObjects;
        this.form = this.formObjects.form;
        this.registration = this.formObjects.registration;
    }
    init() {
        if (this.registration) {
            this.Pass = new PasswordStrength(this.formObjects.passInput, this.formObjects.strengthMessage, this.formObjects.strengthMeter);
            this.Pass.init();
        }
    }
    /**
     * @returns Pobierz dane wpisane w formularzu.
     */
    getValue() {
        for (const pair of this.#data.entries()) {
            this.#params[pair[0]] = pair[1];
        }
        return this.#params;
    }
    /**
     * @returns Pobierz aktualną siłę hasła.
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
