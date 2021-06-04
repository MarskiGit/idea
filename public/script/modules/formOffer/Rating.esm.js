'use strict';
export default class Rating {
    #selectCollection;
    #viewPoints;
    #defaultPoint;
    #allOptions;
    constructor(selectCollection, viewPoints) {
        this.#selectCollection = selectCollection;
        this.#viewPoints = viewPoints;
        this.#defaultPoint = this.getPoints();
    }
    init() {
        this.#getAllSelectedValue();

        this.#selectCollection.forEach((se) =>
            se.addEventListener('mouseup', () => {
                this.#getAllSelectedValue();
                this.#displayPoints();
            })
        );
    }
    getPoints = () => parseInt(this.#viewPoints.textContent);
    getValueString = () => this.#allOptions.filter(this.#filterString);
    setDefault() {
        this.#selectCollection.forEach((op) => (op.selectedIndex = 0));
        this.#viewPoints.innerText = this.#defaultPoint;
    }
    #filterString = (value) => {
        if (value.toLowerCase() === 'tak' || value.toLowerCase() === 'nie') return value;
    };
    #getAllSelectedValue() {
        this.#allOptions = this.#selectCollection.map((select) => select.value);
    }
    #displayPoints() {
        this.#viewPoints.innerText = `${this.#sumPoints()}`;
    }
    #sumPoints = () =>
        this.#allOptions
            .map(this.#filterNumber)
            .filter((el) => parseInt(el))
            .reduce((a, b) => a + b);
    #filterNumber = (value) => Number(value.replace(/\D/g, ''));
}
