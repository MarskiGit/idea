'use strict';
import {
    dataFetch
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {
    class CreateAbstract {
        constructor() {
            this.form = document.querySelector('[data-create="form"]');
            this.fieldsValidation = [...this.form.elements].filter(el => el.type !== 'submit' && el.type !== 'search');
        };
    };

    class CreateIdea extends CreateAbstract {
        constructor() {
            super();
            console.log(this.fieldsValidation)
            this.CreateIdea()
        };
        CreateIdea() {
            this.form.addEventListener('submit', event => {
                event.preventDefault();
            })
        };
    };

    class RatingIdea extends CreateAbstract {
        constructor() {
            super()
            this.formSelect = [...this.form.elements].filter(el => el.type === 'select-one');
            this.viewPkt = document.querySelector('[data-create="sum_pkt"]')
            this.pointsIdea = null;
            this.sumPointsIdea = null

            this.RatingIdea();
        };
        RatingIdea() {
            this.formSelect.forEach(se => se.addEventListener('mouseup', () => {
                this.getPoints();
                this.sumPoints();
                this.viewPkt.innerText = `${this.sumPointsIdea}`;
            }));

        };
        getPoints() {
            this.pointsIdea = [...this.formSelect].map(this.filterNumber);
        };
        sumPoints() {
            this.sumPointsIdea = this.pointsIdea.filter(el => parseInt(el)).reduce((a, b) => a + b);
        };
        filterNumber(select) {
            return select.value.replace(/\D/g, '') * 1;
        };
    };
    const RATINGIDEA = new RatingIdea();
    const WRITEIDEA = new CreateIdea();
});