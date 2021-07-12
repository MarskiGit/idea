'use strict';
export default class Rating {
    #selectCollection;
    #viewPoints;
    #defaultPoint;
    #allOptions;
    constructor(viewPoints) {
        this.#viewPoints = viewPoints;
        this.#defaultPoint = this.#getPoint();
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
    get() {
        const rating = [];
        rating.push('point', this.#getPoint());
        rating.push('saving', ...this.#getValueString());
        return rating;
    }
    clear() {
        this.#selectCollection.forEach((op) => (op.selectedIndex = 0));
        this.#viewPoints.innerText = this.#defaultPoint;
    }
    #getPoint = () => this.#viewPoints.textContent;
    #getValueString = () => this.#allOptions.filter(this.#filterString);
    #filterString(value) {
        if (value.toLowerCase() === 'tak' || value.toLowerCase() === 'nie') return value;
    }
    #getAllSelectedValue() {
        this.#allOptions = this.#selectCollection.map((select) => select.value.trim());
    }
    #displayPoints() {
        this.#viewPoints.innerText = `${this.#sumPoints()}`;
    }
    #sumPoints = () =>
        this.#allOptions
            .map(this.#filterNumber)
            .filter((el) => Number(el))
            .reduce((a, b) => a + b);
    #filterNumber = (value) => Number(value.replace(/\D/g, ''));
}
