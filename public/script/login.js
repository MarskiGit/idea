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
            this.message = this.form.children[1];
            this.request = {
                action: 'loginUser',

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
                this.message.innerText = 'Uzupełnij wszystkie pola';
            };
        };
        send() {
            pageLoadingStatus(1)
            dataFetch('ajax.php', this.request).then(res => {
                if (res.answer * 1 === 1) {
                    location.reload();
                } else {
                    this.message.innerHTML = 'Błędny login lub hasło';
                };
            }).finally(pageLoadingStatus(0));

        };
        isFormValid(elements) {
            return 2 === elements.filter(e => e !== '').length ? 1 : 0;
        };
    };

    const LOGIN = new Login();
})