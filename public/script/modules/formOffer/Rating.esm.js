'use strict';
export default class Rating {
    #selectCollection;
    #viewPoints;
    #defaultPoint;
    #allRating;
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
        return { point: this.#getPoint(), saving: this.#getValueString() };
    }
    clear() {
        this.#selectCollection.forEach((op) => (op.selectedIndex = 0));
        this.#viewPoints.innerText = this.#defaultPoint;
    }
    #getPoint = () => this.#viewPoints.textContent;
    // mało sprwan metoda - usprawnnić do samodzielego pobierania
    #getValueString = () => this.#allRating.filter(this.#filterBoolen).map(this.#convertBoolen).toString();
    #filterBoolen(value) {
        if (value.toLowerCase() === 'tak' || value.toLowerCase() === 'nie') return value;
    }
    #getAllSelectedValue() {
        this.#allRating = this.#selectCollection.map((select) => select.value.trim());
    }
    #convertBoolen(string) {
        if (string.toLowerCase() === 'tak') return '1';
        if (string.toLowerCase() === 'nie') return '0';
    }
    #displayPoints() {
        this.#viewPoints.innerText = `${this.#sumPoints()}`;
    }
    #sumPoints = () =>
        this.#allRating
            .map(this.#filterNumber)
            .filter((el) => Number(el))
            .reduce((a, b) => a + b);
    #filterNumber = (value) => Number(value.replace(/\D/g, ''));
}
