'use strict';
import PasswordCheck from './PasswordCheck.esm.js';

export default class FormHandling {
    #PasswordCheck;
    #fieldsValue;
    #data;
    #formObjects;
    #registration;
    #params = {};
    /**
     * Klasa abstrakcyjna do obsługi formularzy.
     * @param {!object} formObjects Elementy formularza.
     */
    constructor(formObjects) {
        this.form = formObjects.form;
        this.getInputs = this.#findInputs();
        this.#formObjects = formObjects;
        this.#registration = formObjects.registration;
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.#factory();
    }
    /**
     * Wyświetla komunikat o błędzie.
     */
    formError() {
        this.#formObjects.errorMessage.classList.add('span_error');
        setTimeout(() => this.#formObjects.errorMessage.classList.remove('span_error'), 2000);
    }
    /**
     * Czyści pola formularza.
     */
    clearField() {
        this.getInputs(['INPUT', 'TEXTAREA']).forEach((e) => (e.value = ''));
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
    getStrenghtPass = () => this.#PasswordCheck.getStrength();
    /**
     * @returns Sprawdź, czy pola są puste | Boolean.
     */
    emptyFields = () => (this.#formData() === this.#fieldsValue.filter((e) => e !== '').length ? true : false);
    /**
     * Zwraca Tablice Elementów formularza
     */
    #findInputs() {
        const collection = [...this.form];

        return function (name, typ = false) {
            const find = collection.filter((i) => {
                for (const text of name) {
                    if (text.toUpperCase() === i.nodeName || text === i.localName) return i;
                }
            });
            if (typ) {
                return find.filter((i) => {
                    if (i.type === typ) return i;
                });
            }
            return find;
        };
    }
    /**
     * Fabryka obiektów.
     */
    #factory() {
        if (this.#registration) {
            this.#PasswordCheck = new PasswordCheck(
                this.getInputs(['INPUT'], 'password'),
                this.#formObjects.strengthMessage,
                this.#formObjects.strengthMeter
            );
            this.#PasswordCheck.init();
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
