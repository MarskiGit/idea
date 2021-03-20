'use strict';
export default class FieldValidation {
    #fieldsValue;
    #data;
    #params = {};
    #strength = {
        empty: 'Wpisz hasło &#128533;',
        worst: 'Więcej znaków &#128530;',
        weak: 'Słabe &#128517;',
        medium: 'Średnie &#128532;',
        strong: 'Silne &#128512;',
    };
    /**
     *  Walidacja pól formularza
     */
    constructor({ form, strengthMeter = 0, strengthMessage = 0 }) {
        this.form = form;
        this.strengthMeter = strengthMeter;
        this.strengthMessage = strengthMessage;
        this.passInpute = [...this.form].filter((el) => el.name === 'password');
        this.strengthPass = 0;
    }
    init() {
        this.#eventListeners();
    }
    getValue() {
        for (const pair of this.#data.entries()) {
            this.#params[pair[0]] = pair[1];
        }
        return this.#params;
    }
    emptyFields = () => (this.#formData() === this.#fieldsValue.filter((e) => e !== '').length ? true : false);
    #eventListeners() {
        if (this.strengthMeter) {
            this.passInpute[0].addEventListener('input', this.#checkPasswordStrength.bind(this));
        }
    }
    #checkPasswordStrength(event) {
        let pwd = event.target.value;

        if (pwd.length == 0) {
            this.#passwordStatus(0);
            this.strengthPass = 0;
            this.strengthMessage.innerHTML = this.#strength.empty;
        } else if (false === this.#enoughRegex(pwd)) {
            this.#passwordStatus(25);
            this.strengthPass = 0;
            this.strengthMessage.innerHTML = this.#strength.worst;
        } else if (this.#strongRegex(pwd)) {
            this.#passwordStatus(100);
            this.strengthPass = 3;
            this.strengthMessage.innerHTML = this.#strength.strong;
        } else if (this.#mediumRegex(pwd)) {
            this.#passwordStatus(75);
            this.strengthPass = 2;
            this.strengthMessage.innerHTML = this.#strength.medium;
        } else {
            this.#passwordStatus(50);
            this.strengthPass = 1;
            this.strengthMessage.innerHTML = this.#strength.weak;
        }
    }
    #passwordStatus(status) {
        switch (status) {
            case 0:
                this.strengthMeter.className = '';
                this.strengthMeter.classList.add('strength', 'strong_0');
                break;
            case 25:
                this.strengthMeter.className = '';
                this.strengthMeter.classList.add('strength', 'strong_25');
                break;
            case 50:
                this.strengthMeter.className = '';
                this.strengthMeter.classList.add('strength', 'strong_50');
                break;
            case 75:
                this.strengthMeter.className = '';
                this.strengthMeter.classList.add('strength', 'strong_75');
                break;
            case 100:
                this.strengthMeter.className = '';
                this.strengthMeter.classList.add('strength', 'strong_100');
                break;
        }
    }
    #strongRegex = (t) => new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g').test(t);
    #mediumRegex = (t) => new RegExp('^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g').test(t);
    #enoughRegex = (t) => new RegExp('(?=.{8,}).*', 'g').test(t);
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
