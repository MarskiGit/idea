'use strict';
import {
    dataFetch,
    displayException,
    pageLoadingStatus
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {


    class AddUser {
        constructor() {
            this.form = document.querySelector('[data-form="form"]');
            this.inputs = [...this.form].filter(el => el.tagName === 'INPUT');
            this.select = [...this.form].filter(el => el.tagName === 'SELECT');
            this.message = this.form.children[1];
            this.request = {
                action: 'addUser'
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
            return 4 === elements.filter(e => e !== '').length ? 1 : 0;
        };
    };

    class LogOut {
        constructor() {
            this.btn = document.querySelector('[data-admin="logOut"]');
            this.request = {
                action: 'logoutUser'
            };
            this.start();
        }
        start() {
            this.btn.addEventListener('click', this.out.bind(this))
        };
        out() {
            pageLoadingStatus(1)
            dataFetch('ajax.php', this.request).then(res => {
                if (res[0].account * 1 === 1) {
                    location.replace('http://h.localhost/01_MOJE/01_GIT/idea/')
                }
            }).finally(pageLoadingStatus(0));
        };

    };


    const LOGOUT = new LogOut()
    const ADDUSER = new AddUser();
})