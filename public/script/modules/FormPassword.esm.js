'use strict';
export default class FormPassword {
    #userMessage = {
        empty: 'Wpisz hasło &#128533;',
        worst: 'Więcej znaków &#128530;',
        weak: 'Słabe &#128517;',
        medium: 'Średnie &#128532;',
        strong: 'Silne &#128512;',
    };
    #isIdentical;
    #pwd;
    #strengthPass = 0;
    #inputPassword;
    #repetInputpassword;
    #strengthMessage;
    #strengthMeter;
    #identicalMessage;
    #identPwd;
    #infoPass;
    constructor(strengthMessage, strengthMeter, identicalMessage) {
        this.#strengthMessage = strengthMessage;
        this.#strengthMeter = strengthMeter;
        this.#identicalMessage = identicalMessage;
    }
    init(inputs) {
        this.#inputPassword = inputs[0];
        this.#repetInputpassword = inputs[1];
        this.#eventListeners();
    }
    getInfo = () =>
        (this.#infoPass = {
            strength: this.#strengthPass,
            identical: this.#isIdentical,
        });
    #eventListeners() {
        this.#inputPassword.addEventListener('input', this.#checkStrength);
        this.#repetInputpassword.addEventListener('input', this.#checkIdentical);
    }
    #checkStrength = (event) => {
        this.#pwd = event.target.value;

        this.#testIdentical();
        if (this.#pwd.length == 0) {
            this.#displayStatus(0);
            this.#strengthPass = 0;
            this.#strengthMessage.innerHTML = this.#userMessage.empty;
        } else if (false === this.#enoughRegex(this.#pwd)) {
            this.#displayStatus(25);
            this.#strengthPass = 0;
            this.#strengthMessage.innerHTML = this.#userMessage.worst;
        } else if (this.#strongRegex(this.#pwd)) {
            this.#displayStatus(100);
            this.#strengthPass = 3;
            this.#strengthMessage.innerHTML = this.#userMessage.strong;
        } else if (this.#mediumRegex(this.#pwd)) {
            this.#displayStatus(75);
            this.#strengthPass = 2;
            this.#strengthMessage.innerHTML = this.#userMessage.medium;
        } else {
            this.#displayStatus(50);
            this.#strengthPass = 1;
            this.#strengthMessage.innerHTML = this.#userMessage.weak;
        }
    };
    #displayStatus(status) {
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
    #checkIdentical = (event) => {
        this.#identPwd = event.target.value;
        this.#testIdentical();
    };
    #testIdentical() {
        if (this.#pwd !== this.#identPwd) {
            this.#identicalMessage.innerHTML = 'Hasła są różne';
            this.#isIdentical = false;
        } else if (this.#identPwd.length) {
            this.#isIdentical = true;
            this.#identicalMessage.innerHTML = 'OK';
        }
    }
    #strongRegex = (char) => new RegExp('^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g').test(char);
    #mediumRegex = (char) => new RegExp('^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g').test(char);
    #enoughRegex = (char) => new RegExp('(?=.{8,}).*', 'g').test(char);
}
