'use strict';
export default class FieldValidation {
    #fieldsValue;
    #enteris;
    #fieldsLenght;
    #params = {};
    #strength = {
        empty: 'Wpisz hasło &#128533;',
        worst: 'Więcej znaków &#128530;',
        weak: 'Słabe &#128517;',
        medium: 'Średnie &#128532;',
        strong: 'Silne &#128512;',
    };
    constructor({ form, strengthMeter, strengthMesage }) {
        this.form = form;
        this.strengthMeter = strengthMeter;
        this.strengthMesage = strengthMesage;
        this.passInpute = [...this.form].filter((el) => el.name === 'password');

        // this.formData = new FormData(form);
        // this.#fieldsValue = [...this.form.values()];
        // this.#enteris = this.form.entries();
        // this.#fieldsLenght = this.#fieldsValue.length;
    }
    init() {
        this.#eventListeners();
    }

    emptyFields = () => (this.#fieldsLenght === this.#fieldsValue.filter((e) => e !== '').length ? true : false);
    #eventListeners() {
        this.passInpute[0].addEventListener('input', this.#passwordChanged.bind(this));
    }
    #passwordChanged(event) {
        let pwd = event.target.value;

        if (pwd.length == 0) {
            this.#passwordStatus('strong_0');
            this.strengthMesage.innerHTML = this.#strength.empty;
        } else if (false === this.#enoughRegex(pwd)) {
            this.#passwordStatus('strong_25');
            this.strengthMesage.innerHTML = this.#strength.worst;
        } else if (this.#strongRegex(pwd)) {
            this.#passwordStatus('strong_100');
            this.strengthMesage.innerHTML = this.#strength.strong;
        } else if (this.#mediumRegex(pwd)) {
            this.#passwordStatus('strong_75');
            this.strengthMesage.innerHTML = this.#strength.medium;
        } else {
            this.#passwordStatus('strong_50');
            this.strengthMesage.innerHTML = this.#strength.weak;
        }
    }
    #passwordStatus(clasa) {
        this.strengthMeter.className = '';
        this.strengthMeter.classList.add('strength', `${clasa}`);
    }
    #strongRegex = (t) => new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g').test(t);
    #mediumRegex = (t) => new RegExp('^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g').test(t);
    #enoughRegex = (t) => new RegExp('(?=.{8,}).*', 'g').test(t);
}
