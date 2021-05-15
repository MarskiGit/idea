'use strict';
export default class PasswordCheck {
    #userMessage = {
        empty: 'Wpisz hasło &#128533;',
        worst: 'Więcej znaków &#128530;',
        weak: 'Słabe &#128517;',
        medium: 'Średnie &#128532;',
        strong: 'Silne &#128512;',
    };
    #strengthPass = 0;
    #inputPassword;
    #repetInputpassword;
    #strengthMessage;
    #strengthMeter;
    /**
     * Klasa sprawdzająca siłę hasła.
     * @param {!object} inpute Tablica input
     * @param {!object} strengthMessage Obiekt DOM span komunikatu tekstowego.
     * @param {!object} strengthMeter Obiekt DOM wizualny wskaźnik siły hasła.
     */
    constructor(inputs, strengthMessage, strengthMeter) {
        this.#inputPassword = inputs[0];
        this.#repetInputpassword = inputs[1];
        this.#strengthMessage = strengthMessage;
        this.#strengthMeter = strengthMeter;
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.#eventListeners();
    }
    /**
     *
     * @returns Zwraca siłę hasła | Number.
     */
    getStrength = () => this.#strengthPass;
    #eventListeners() {
        this.#inputPassword.addEventListener('input', this.#checkStrength);
    }
    #checkStrength = (event) => {
        let pwd = event.target.value;

        if (pwd.length == 0) {
            this.#statusDisplay(0);
            this.#strengthPass = 0;
            this.#strengthMessage.innerHTML = this.#userMessage.empty;
        } else if (false === this.#enoughRegex(pwd)) {
            this.#statusDisplay(25);
            this.#strengthPass = 0;
            this.#strengthMessage.innerHTML = this.#userMessage.worst;
        } else if (this.#strongRegex(pwd)) {
            this.#statusDisplay(100);
            this.#strengthPass = 3;
            this.#strengthMessage.innerHTML = this.#userMessage.strong;
        } else if (this.#mediumRegex(pwd)) {
            this.#statusDisplay(75);
            this.#strengthPass = 2;
            this.#strengthMessage.innerHTML = this.#userMessage.medium;
        } else {
            this.#statusDisplay(50);
            this.#strengthPass = 1;
            this.#strengthMessage.innerHTML = this.#userMessage.weak;
        }
    };
    #statusDisplay(status) {
        switch (status) {
            case 0:
                this.#strengthMeter.className = '';
                this.#strengthMeter.classList.add('strength', 'strong_0');
                break;
            case 25:
                this.#strengthMeter.className = '';
                this.#strengthMeter.classList.add('strength', 'strong_25');
                break;
            case 50:
                this.#strengthMeter.className = '';
                this.#strengthMeter.classList.add('strength', 'strong_50');
                break;
            case 75:
                this.#strengthMeter.className = '';
                this.#strengthMeter.classList.add('strength', 'strong_75');
                break;
            case 100:
                this.#strengthMeter.className = '';
                this.#strengthMeter.classList.add('strength', 'strong_100');
                break;
        }
    }
    #isIdentical() {}
    #strongRegex = (char) => new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g').test(char);
    #mediumRegex = (char) => new RegExp('^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g').test(char);
    #enoughRegex = (char) => new RegExp('(?=.{8,}).*', 'g').test(char);
}
