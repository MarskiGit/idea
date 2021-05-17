'use strict';
import PasswordCheck from './PasswordCheck.esm.js';

export default class FormHandling {
    #PasswordCheck;
    #fieldsValue;
    #data;
    #formObjects;
    #isPassword;
    #params = {};
    constructor(formObjects) {
        this.form = formObjects.form;
        this.getInputs = this.#findInputs();
        this.#formObjects = formObjects;
        this.#isPassword = formObjects.isPassword;
    }

    init() {
        this.#factory();
    }

    formError() {
        this.#formObjects.errorMessage.classList.add('span_error');
        setTimeout(() => this.#formObjects.errorMessage.classList.remove('span_error'), 2000);
    }
    clearField() {
        this.getInputs(['INPUT', 'TEXTAREA']).forEach((e) => (e.value = ''));
    }
    getValue() {
        for (const pair of this.#data.entries()) {
            this.#params[pair[0]] = pair[1];
        }
        return this.#params;
    }
    getInfoPass = () => this.#isPassword && this.#PasswordCheck.getInfo();
    emptyFields = () => (this.#formData() === this.#fieldsValue.filter((e) => e !== '').length ? true : false);
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
    #factory() {
        if (this.#isPassword) {
            this.#PasswordCheck = new PasswordCheck(
                this.getInputs(['INPUT'], 'password'),
                this.#formObjects.strengthMessage,
                this.#formObjects.strengthMeter,
                this.#formObjects.identicalMessage
            );
            this.#PasswordCheck.init();
        }
    }
    #formData() {
        this.#data = new FormData(this.form);
        this.#fieldsValue = [...this.#data.values()];
        console.log(this.#fieldsValue, this.#fieldsValue.length);
        return this.#fieldsValue.length;
    }
}

// #emailChar = (t) =>
// new RegExp(
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// ).test(String(t).toLowerCase());
