'use strict';
import {
    dataFetch,
    pageLoadingStatus
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {
    class WriteAbstract {
        constructor() {
            this.form = document.querySelector('[data-write="form"]');
            this.viewPoints = document.querySelector('[data-write="view_points"]');
            this.viewUser = document.querySelector('[data-write="view_user"]');
            this.inputSearch = document.querySelector('[data-write="input_search"]');
            this.textAreas = document.querySelectorAll('textarea');
            this.errors = [];
        };
        takePoints() {
            return parseInt(this.viewPoints.textContent);
        };
        checkError() {
            return (this.errors.length) ? true : false;
        };
        debounced(f, t) {
            let l;
            return (...a) => {
                const c = this;
                clearTimeout(l), l = setTimeout(() => f.apply(c, a), t)
            };
        };
        setingListUser(display) {
            this.viewUser.innerText = '';
            this.viewUser.style.display = `${display}`;
        };
    };

    class ValidationIdea extends WriteAbstract {
        constructor() {
            super();
            this.start();
        };
        start() {
            this.form.addEventListener('submit', event => {
                event.preventDefault();
                console.log(this.form)
            })
        };
    };

    class CalculatePointsIdea extends WriteAbstract {
        constructor() {
            super()
            this.formSelect = [...this.form.elements].filter(el => el.type === 'select-one');
            this.pointsIdea = null;
            this.ratingIdea = null;
            this.start();
        };
        start() {
            this.formSelect.forEach(se => se.addEventListener('mouseup', () => {
                this.downloadPoints();
                this.sumPoints();
                this.displayPoints();
            }));

        };
        downloadPoints() {
            this.pointsIdea = [...this.formSelect].map(this.filterNumber);
        };
        sumPoints() {
            this.ratingIdea = this.pointsIdea.filter(el => parseInt(el)).reduce((a, b) => a + b);
        };
        filterNumber(select) {
            return parseInt(select.value.replace(/\D/g, ''));
        };
        displayPoints() {
            this.viewPoints.innerText = `${this.ratingIdea}`;
        };
    };

    class NumberCharacters extends WriteAbstract {
        constructor() {
            super();
            this.viewElemnt = null;
            this.maxCharacters = null;
            this.numberSign = null;
            this.textLenght = null;
            this.start();
        }
        start() {
            this.textAreas.forEach(textArea => textArea.addEventListener('keyup', this.countCharacters.bind(this)));
        };
        countCharacters(event) {
            this.viewElemnt = event.target.nextElementSibling;
            this.maxCharacters = event.target.maxLength;
            this.textLenght = event.target.textLength;
            this.numberSign = this.maxCharacters - event.target.textLength;
            this.displayCount();
        };
        displayCount() {
            this.viewElemnt.innerHTML = (this.textLenght) ? `${this.numberSign}  &#8725;  ${this.maxCharacters}` : this.viewElemnt.innerHTML = '';
        };
    };

    class UserSearch extends WriteAbstract {
        constructor() {
            super();
            this.listUser = document.createDocumentFragment();
            this.li = null;
            this.request = {
                action: 'userSerch',
                select: 'name',
                name: null
            };

            this.start();
        }
        start() {
            this.inputSearch.addEventListener('input', this.debounced(this.search.bind(this), 500));
        };
        search(event) {
            (this.verificationSymbol(event.target.value)) ? this.errorSymbol(1): this.checkSearch(event.target.value);
        };
        verificationSymbol(char) {
            return /[^A-Z-ŚŁŻŹĆa-z-ęóąśłżźćń\s0-9]/gi.test(char);
        };
        errorSymbol(bool) {
            (bool) ? this.inputSearch.classList.add('errorSearch'): this.inputSearch.classList.remove('errorSearch');

        };
        checkSearch(inputText) {
            this.errorSymbol(0);
            (inputText.length >= 3) ? this.selectType(inputText): this.setingListUser('none');
        };
        selectType(inputText) {
            if (inputText * 1) {
                this.request.select = 'pass_number';
                this.request.name = inputText;
            } else {
                this.requestselect = 'name';
                this.request.name = inputText;
            };
            this.getUser();
        };
        getUser() {
            pageLoadingStatus(1);
            dataFetch('ajax.php', this.request).then(listUser => {
                this.renderList(listUser);
            }).finally(pageLoadingStatus(0));
        };
        renderList(listUser) {
            listUser.forEach(user => {
                this.li = document.createElement('li');
                this.li.setAttribute('data-user', `[${user.id_user},${user.id_area}]`);
                this.li.innerText = user.name;
                this.listUser.appendChild(this.li);
            })
            this.addListPage();
        };
        addListPage() {
            this.setingListUser('block');
            this.viewUser.appendChild(this.listUser);
        };

    };

    const SEARCHUSER = new UserSearch();
    const SIGN = new NumberCharacters();
    const RATINGIDEA = new CalculatePointsIdea();
    const WRITEIDEA = new ValidationIdea();
});