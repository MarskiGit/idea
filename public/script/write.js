'use strict';
import {
    dataFetch,
    displayException,
    pageLoadingStatus
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {
    class WriteAbstract {
        constructor() {
            this.form = document.querySelector('[data-write="form"]');
            this.viewPoints = document.querySelector('[data-write="view_points"]');
            this.viewCreator = document.querySelector('[data-write="view_creator"]');
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
        viewListUser(display) {
            this.viewCreator.innerText = '';
            this.viewCreator.style.display = `${display}`;
        };
        filterNumber(select) {
            return parseInt(select.value.replace(/\D/g, ''));
        };
        verificationSymbol(char) {
            return /[^A-Z-ŚŁŻŹĆa-z-ęóąśłżźćń\s0-9]/gi.test(char);
        };
    };

    class Validation extends WriteAbstract {
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

    class CalculatePoints extends WriteAbstract {
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
        displayPoints() {
            this.viewPoints.innerText = `${this.ratingIdea}`;
        };
    };

    class NumberCharacters extends WriteAbstract {
        constructor() {
            super();
            this.viewCount = null;
            this.maxCharacters = null;
            this.numberSign = null;
            this.textLenght = null;
            this.start();
        }
        start() {
            this.textAreas.forEach(textArea => textArea.addEventListener('keyup', this.calculateNumberCharacters.bind(this)));
        };
        calculateNumberCharacters(event) {
            this.viewCount = event.target.nextElementSibling;
            this.maxCharacters = event.target.maxLength;
            this.textLenght = event.target.textLength;
            this.numberSign = this.maxCharacters - event.target.textLength;
            this.displayCount();
        };
        displayCount() {
            this.viewCount.innerHTML = (this.textLenght) ? `${this.numberSign}  &#8725;  ${this.maxCharacters}` : this.viewCount.innerHTML = '';
        };
    };

    class CreatorSearch extends WriteAbstract {
        constructor() {
            super();
            this.listUser = document.createDocumentFragment();
            this.li = null;
            this.request = {
                action: 'creatorSearch',
                select: 'name',
                name: null
            };
            this.start();
        }
        start() {
            this.inputSearch.addEventListener('input', this.debounced(this.search.bind(this), 500));
        };
        search({
            target
        }) {
            (this.verificationSymbol(target.value)) ? this.errorSymbol(1): this.checkSearch(target.value);
        };
        errorSymbol(bool) {
            if (bool) {
                this.inputSearch.labels[0].style.color = 'red';
                this.inputSearch.labels[0].textContent = 'Tylko znaki alfabetu i cyfry';
                this.inputSearch.classList.add('errorSearch');
            } else {
                this.inputSearch.labels[0].style.color = '';
                this.inputSearch.labels[0].textContent = 'Wyszukaj i kliknij:';
                this.inputSearch.classList.remove('errorSearch');
            };
        };
        checkSearch(inputText) {
            this.errorSymbol(0);
            (inputText.length >= 3) ? this.typeValueSought(inputText): this.viewListUser('none');
        };
        typeValueSought(inputText) {
            (inputText * 1) ? this.request.select = 'pass_number': this.request.select = 'name';
            this.request.name = inputText;
            this.sendRequest();
        };
        sendRequest() {
            pageLoadingStatus(1);
            dataFetch('ajax.php', this.request).then(listUser => {
                (listUser.exception) ? displayException(listUser): this.renderList(listUser);
            }).finally(pageLoadingStatus(0));
        };
        renderList(listUser) {
            listUser.forEach(user => {
                const {
                    name,
                    row,
                    id_user,
                    id_area
                } = user;
                this.li = document.createElement('li');
                this.li.setAttribute('class', `${(row)? 'view_li' : 'view_li creator_li'}`)
                this.li.setAttribute('data-user', `[${id_user},${id_area}]`);
                this.li.innerText = name;
                this.listUser.appendChild(this.li);
            })
            this.addListPage();
        };
        addListPage() {
            this.viewListUser('block');
            this.viewCreator.appendChild(this.listUser);
        };
    };

    const SEARCHUSER = new CreatorSearch();
    const SIGN = new NumberCharacters();
    const RATINGIDEA = new CalculatePoints();
    const WRITEIDEA = new Validation();
});