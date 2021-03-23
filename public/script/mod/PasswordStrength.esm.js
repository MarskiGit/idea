'use strict';
export default class PasswordStrength {
    #strength = {
        empty: 'Wpisz hasło &#128533;',
        worst: 'Więcej znaków &#128530;',
        weak: 'Słabe &#128517;',
        medium: 'Średnie &#128532;',
        strong: 'Silne &#128512;',
    };
    /**
     * Klasa sprawdzająca siłę hasła.
     * @param {!object} passInpute Obiekt DOM input hasła.
     * @param {!object} strengthMessage Obiekt DOM span komunikatu tekstowego.
     * @param {!object} strengthMeter Obiekt DOM wizualny wskaźnik siły hasła.
     */
    constructor(passInpute, strengthMessage, strengthMeter) {
        this.passInpute = passInpute;
        this.strengthPass = 0;
        this.strengthMessage = strengthMessage;
        this.strengthMeter = strengthMeter;
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.#eventListeners();
    }
    #eventListeners() {
        if (this.strengthMeter) {
            this.passInpute.addEventListener('input', this.#checkPasswordStrength);
        }
    }
    #checkPasswordStrength = (event) => {
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
    };
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
    #strongRegex = (char) => new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g').test(char);
    #mediumRegex = (char) => new RegExp('^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g').test(char);
    #enoughRegex = (char) => new RegExp('(?=.{8,}).*', 'g').test(char);
}
