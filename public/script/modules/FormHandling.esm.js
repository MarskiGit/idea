'use strict';
export default class FormHandling {
    #formObjects;
    #errorMessage;
    #fieldsValue;
    #data;
    #params = {};
    constructor(formObjects) {
        this.form = formObjects.form;
        this.getInputs = this.#findInputs();
        this.#formObjects = formObjects;
        this.#errorMessage = formObjects.errorMessage;
    }
    showMessage(messafe) {
        this.#errorMessage.textContent = `${messafe}`;
        this.#errorMessage.classList.add('span_error');
        setTimeout(() => this.#errorMessage.classList.remove('span_error'), 2000);
    }
    clearField(array) {
        this.getInputs(array).forEach((e) => (e.value = ''));
    }
    getValue() {
        for (const pair of this.#data.entries()) {
            this.#params[pair[0]] = pair[1];
        }
        return this.#params;
    }
    emptyFields = () => (this.#formData() === this.#fieldsValue.filter((e) => e !== '').length ? true : false);
    // nadmiarowy kod do poprawy
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
