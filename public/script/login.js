'use strict';
import FetchAbstract from './mod/FetchAbstract.js';
document.addEventListener('DOMContentLoaded', function () {
    class Login extends FetchAbstract {
        constructor() {
            super();
            this.form = document.querySelector('[data-form="form"]');
            this.message = this.form.children[1];
            this.request = {
                action: 'loginUser',
            };
            this.start();
        }
        start() {
            this.form.addEventListener('submit', (event) => this.validationForm(event));
        }
        validationForm(event) {
            event.preventDefault();
            const form = new FormData(event.target);
            if (this.isFormValid([...form.values()])) {
                for (var pair of form.entries()) {
                    this.request[pair[0]] = pair[1];
                }
                this.sendRequest();
            } else {
                this.message.innerText = 'Uzupełnij wszystkie pola';
            }
        }
        answerFetch({ account }) {
            if (account * 1 === 1) {
                location.replace('http://h.localhost/01_MOJE/01_GIT/idea/');
            } else {
                this.message.innerHTML = 'Błędny login lub hasło';
            }
        }
        isFormValid(elements) {
            return 2 === elements.filter((e) => e !== '').length ? 1 : 0;
        }
    }

    const LOGIN = new Login();
});
