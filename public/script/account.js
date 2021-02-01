'use strict';
import {
    dataFetch,
    displayException,
    pageLoadingStatus
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {


    class Login {
        constructor() {
            this.form = document.querySelector('[data-form="form"]');
            this.inputs = [...this.form].filter(el => el.tagName === 'INPUT');
            this.select = [...this.form].filter(el => el.tagName === 'SELECT');
            console.log(this.select)
            this.message = this.form.children[1];
            this.request = {
                action: 'addUser',

            };
            this.start();
        };
        start() {
            this.form.addEventListener('submit', this.validationForm.bind(this))
        };
        validationForm(event) {
            event.preventDefault();
            const form = new FormData(event.target);
            if (this.isFormValid([...form.values()])) {
                for (var pair of form.entries()) {
                    this.request[pair[0]] = pair[1]
                };
                this.send();
            } else {
                console.log(this.select)
                this.message.innerText = 'Uzupełnij wszystkie pola';
            };
        };
        send() {
            pageLoadingStatus(1)
            dataFetch('ajax.php', this.request).then(res => {
                if (Number.isInteger(res[0].account * 1)) {
                    this.message.innerHTML = `Utworzono konto o numerze ID: ${res[0].account}`;
                    this.inputs.forEach(inp => inp.value = '');
                    this.select[0].selectedIndex = 0;
                } else {
                    this.message.innerHTML = `${res[0].account}`;
                };
            }).finally(pageLoadingStatus(0));

        };
        isFormValid(elements) {
            return 3 === elements.filter(e => e !== '').length ? 1 : 0;
        };
    };

    const LOGIN = new Login();
})