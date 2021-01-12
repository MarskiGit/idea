'use strict';
import {
    dataFetch
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {
    class WriteIdeaAbstract {
        constructor() {
            this.form = document.querySelector('[data-write="form"]');
            this.viewPoints = document.querySelector('[data-write="sum_pkt"]');
            this.textAreas = [...this.form.elements].filter(el => el.type === 'textarea');

        };
        takePoints() {
            return parseInt(this.viewPoints.textContent);
        }
    };

    class ValidationIdea extends WriteIdeaAbstract {
        constructor() {
            super();
            this.start();
        };
        start() {
            this.form.addEventListener('submit', event => {
                event.preventDefault();
                console.log(this.textAreas)
            })
        };
    };

    class CalculatePointsIdea extends WriteIdeaAbstract {
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

    class NumberCharacters extends WriteIdeaAbstract {
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
    }



    const SIGN = new NumberCharacters();
    const RATINGIDEA = new CalculatePointsIdea();
    const WRITEIDEA = new ValidationIdea();
});