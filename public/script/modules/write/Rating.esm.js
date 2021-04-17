'use strict';
export default class Rating {
    #viewPoints;
    #defaultPoint;
    #selectCollection;
    #allOptions;
    /**
     * Zlicza punkty w formularzu.
     * @param {!object} selectCollection Kolekcja list rozwijanych.
     * @param {!object} viewPoints Element DOM wyświetlania punktów.
     */
    constructor(selectCollection, viewPoints) {
        this.#viewPoints = viewPoints;
        this.#selectCollection = selectCollection;
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
    /**
     * @returns Zwaraca sumę punktów.
     */
    getPoints = () => parseInt(this.#viewPoints.textContent);
    /**
     * @returns Zwraca tablicę z zanaczonym wyborem string | Array.
     */
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
