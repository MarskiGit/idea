'use strict';
import {
    FetchAbstract
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {
    class WriteAbstract extends FetchAbstract {
        constructor() {
            super();
            this.form = document.querySelector('[data-write="form"]');
            this.viewPoints = document.querySelector('[data-write="view_points"]');
            this.viewCreator = document.querySelector('[data-write="view_creator"]');
            this.creatorSearch = document.querySelector('[data-write="creator_search"]');
            this.areaSearch = document.querySelector('[data-write="area_search"]');
            this.olCreators = document.querySelector('[data-write="view_creator"]');
            this.chosenOnes = document.querySelector('[data-write="chosen_ones"]');
            this.messages = document.querySelector('[data-write="messages"]');
            this.textAreas = document.querySelectorAll('textarea');
            this.idUser = [];
            this.idArea = [];
            this.errors = [];
        };
        takePoints = () => parseInt(this.viewPoints.textContent);
        checkError = () => (this.errors.length) ? true : false;
        filterNumber = select => parseInt(select.value.replace(/\D/g, ''));
        verificationSymbol = char => /[^A-Z-ŚŁŻŹĆa-z-ęóąśłżźćń\s0-9]/gi.test(char);
        getParamData = (li, index) => JSON.parse(li.getAttribute('data-user'))[index];
        debounced(f, t) {
            let l;
            return (...a) => {
                const c = this;
                clearTimeout(l), l = setTimeout(() => f.apply(c, a), t)
            };
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
                user_name: null
            };
            this.start();
        }
        start() {
            this.creatorSearch.addEventListener('input', this.debounced(this.search.bind(this), 500));
        };
        search({
            target
        }) {
            (this.verificationSymbol(target.value)) ? this.errorSymbol(1): this.checkSearch(target.value);
        };
        errorSymbol(bool) {
            if (bool) {
                this.creatorSearch.labels[0].style.color = 'red';
                this.creatorSearch.labels[0].textContent = 'Tylko znaki alfabetu i cyfry';
                this.creatorSearch.classList.add('errorSearch');
            } else {
                this.creatorSearch.labels[0].style.color = '';
                this.creatorSearch.labels[0].textContent = 'Wyszukaj i kliknij:';
                this.creatorSearch.classList.remove('errorSearch');
            };
        };
        checkSearch(inputText) {
            this.errorSymbol(0);
            (inputText.length >= 3) ? this.typeValueSought(inputText): this.viewCreator.classList.remove('on')
        };
        typeValueSought(inputText) {
            (inputText * 1) ? this.request.select = 'user_number': this.request.select = 'user_name';
            this.request.user_name = inputText;
            this.send();
        };
        answer(data) {
            data.forEach(({
                user_name,
                row,
                id_user,
                id_area
            }) => {
                let li = document.createElement('li');
                li.setAttribute('class', `${(row)? 'view_li' : 'view_li creator_li'}`)
                li.setAttribute('data-user', `[${id_user},${id_area}]`);
                li.innerText = user_name;
                this.listUser.appendChild(li);
            })
            this.addListPage();

        };
        addListPage() {
            this.viewCreator.innerText = '';
            this.viewCreator.classList.add('on')
            this.viewCreator.appendChild(this.listUser);
        };
    };

    class ChosenOnesCreator extends WriteAbstract {
        constructor() {
            super();
            this.start();
        };
        start() {
            this.olCreators.addEventListener('click', this.select.bind(this));
        };
        select(event) {
            const id = this.getParamData(event.originalTarget, 0);
            if (event.originalTarget.tagName === 'LI' && this.noRepeating(id)) {
                this.idUser.push(id);
                const cloneLi = event.originalTarget.cloneNode(true);
                this.transfer(cloneLi);
            } else {
                this.olCreators.nextElementSibling.classList.add('span_error');
                setTimeout(() => this.olCreators.nextElementSibling.classList.remove('span_error'), 2000);
            };
        };
        transfer(cloneLi) {
            this.chosenOnes.appendChild(cloneLi);
            this.chosenOnes.classList.add('on')
        };
        noRepeating = id => (this.idUser.includes(id)) ? false : true;
    };



    const ADDCREATOR = new ChosenOnesCreator();
    const SEARCHUSER = new CreatorSearch();
    const SIGN = new NumberCharacters();
    const RATINGIDEA = new CalculatePoints();
    const WRITEIDEA = new Validation();
});