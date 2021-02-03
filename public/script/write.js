'use strict';
import {
    FetchAbstract
} from './mod/FetchAbstract.js';
import {
    LiveSearch,
} from './mod/LiveSearch.js';
document.addEventListener('DOMContentLoaded', function () {
    class WriteAbstract extends FetchAbstract {
        constructor() {
            super();
            this.form = document.querySelector('[data-write="form"]');
            this.viewPoints = document.querySelector('[data-write="view_points"]');
            this.messages = document.querySelector('[data-write="messages"]');
            this.textAreas = document.querySelectorAll('textarea');

            this.idArea = [];
            this.errors = [];
        };
        takePoints = () => parseInt(this.viewPoints.textContent);
        checkError = () => (this.errors.length) ? true : false;
        filterNumber = select => parseInt(select.value.replace(/\D/g, ''));
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

    class ChosenOnes extends LiveSearch {
        constructor(search) {
            super(search);
        };
        start() {
            this.viewCreator.addEventListener('click', this.select.bind(this));
        };
        select(event) {
            const id = event.originalTarget.getAttribute('data-id');
            if (event.originalTarget.tagName === 'LI' && this.noRepeating(id)) {
                this.idUser.push(id);
                const cloneLi = event.originalTarget.cloneNode(true);
                this.transfer(cloneLi);
            } else {
                this.viewCreator.nextElementSibling.classList.add('span_error');
                setTimeout(() => this.viewCreator.nextElementSibling.classList.remove('span_error'), 2000);
            };
        };
        transfer(cloneLi) {
            this.chosenOnes.appendChild(cloneLi);
            this.chosenOnes.classList.add('on')
        };
        noRepeating = id => (this.idUser.includes(id)) ? false : true;
    };

    const userSearch = ['[data-write="view_creator"]', '[data-write="chosen_ones"]', '[data-write="creator_search"]', 'creatorSearch'];
    const SEARCHUSER = new LiveSearch(userSearch);
    const ADDCREATOR = new ChosenOnes(userSearch);

    const areaSearch = ['[data-write="view_area"]', '[data-write="chosen_ones_area"]', '[data-write="area_search"]', 'areaSearch'];
    const SEARCHAREA = new LiveSearch(areaSearch);
    const ADDAREA = new ChosenOnes(areaSearch);

    const SIGN = new NumberCharacters();
    const RATINGIDEA = new CalculatePoints();
    const WRITEIDEA = new Validation();
});