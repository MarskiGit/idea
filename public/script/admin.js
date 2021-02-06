'use strict';
import FetchAbstract from './mod/FetchAbstract.js';
document.addEventListener('DOMContentLoaded', function () {


    class AddUser extends FetchAbstract {
        constructor() {
            super();
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
                    this.request[pair[0]] = pair[1];
                };
                this.sendRequest();
            } else {
                this.message.innerText = 'Uzupełnij wszystkie pola';
            };
        };
        answerFetch({
            account
        }) {
            if (Number.isInteger(account * 1)) {
                this.message.innerHTML = `Utworzono konto o numerze ID: ${account}`;
                this.inputs.forEach(inp => inp.value = '');
                this.select[0].selectedIndex = 0;
            } else {
                this.message.innerHTML = `${account}`;
            };
        };
        isFormValid = elements => 4 === elements.filter(e => e !== '').length ? 1 : 0;
    };

    class LogOut extends FetchAbstract {
        constructor() {
            super();
            this.btn = document.querySelector('[data-admin="logOut"]');
            this.request = {
                action: 'logoutUser'
            };
            this.start();
        }
        start() {
            this.btn.addEventListener('click', this.sendRequest.bind(this))
        };
        answerFetch({
            account
        }) {
            if (account * 1 === 1) {
                location.replace('http://h.localhost/01_MOJE/01_GIT/idea/')
            };
        };
    };


    const LOGOUT = new LogOut()
    const ADDUSER = new AddUser();
})