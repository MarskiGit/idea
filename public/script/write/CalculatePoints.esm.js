'use strict';
export default class CalculatePoints {
    #pointsIdea = null;
    #ratingIdea = null;
    constructor(form, viewPoints) {
        this.form = form;
        this.viewPoints = viewPoints;
        this.formSelect = [...this.form.elements].filter((el) => el.type === 'select-one');
    }
    init() {
        this.formSelect.forEach((se) =>
            se.addEventListener('mouseup', () => {
                this.downloadPoints();
                this.sumPoints();
                this.displayPoints();
            })
        );
    }
    downloadPoints() {
        this.#pointsIdea = [...this.formSelect].map(this.#filterNumber);
    }
    sumPoints() {
        this.#ratingIdea = this.#pointsIdea.filter((el) => parseInt(el)).reduce((a, b) => a + b);
    }
    displayPoints() {
        this.viewPoints.innerText = `${this.#ratingIdea}`;
    }
    #filterNumber = (select) => parseInt(select.value.replace(/\D/g, ''));
}
