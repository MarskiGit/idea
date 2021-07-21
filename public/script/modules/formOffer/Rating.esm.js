'use strict';
export default class Rating {
    #selectCollection;
    #viewPoints;
    #defaultPoint;
    #rating;
    constructor(viewPoints) {
        this.#viewPoints = viewPoints;
        this.#defaultPoint = this.#getDefaultPoint();
    }
    init(selectCollection) {
        this.#selectCollection = selectCollection;

        this.#getAllSelectedValue();

        this.#selectCollection.forEach((se) =>
            se.addEventListener('mouseup', () => {
                this.#getAllSelectedValue();
                this.#displayPoints();
            })
        );
    }
    get = () => this.#rating;
    clear() {
        this.#selectCollection.forEach((op) => (op.selectedIndex = 0));
        this.#viewPoints.innerText = this.#defaultPoint;
    }
    #getDefaultPoint = () => this.#viewPoints.textContent;
    #getAllSelectedValue() {
        this.#rating = this.#selectCollection
            .map((select) => ({
                [select.name.trim()]: String(select.value.trim()),
            }))
            .reduce((obj, item) => Object.assign(obj, item), {});
    }
    #displayPoints() {
        this.#viewPoints.innerText = `${this.#sumPoints()}`;
    }
    #sumPoints() {
        let points = 0;
        let number = null;
        for (const value in this.#rating) {
            number = this.#filterNumber(this.#rating[value]);
            if (number) points += number;
        }
        this.#rating.sum_point = points;
        return points;
    }
    #filterNumber = (value) => Number(value.replace(/\D/g, ''));
}
