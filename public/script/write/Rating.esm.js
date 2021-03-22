'use strict';
export default class Rating {
    #allOptions = null;
    /**
     * Zlicza punkty w formularzu.
     * @param {!object} form Formularz.
     * @param {!object} viewPoints Element DOM wyświetlania punktów.
     */
    constructor(form, viewPoints) {
        this.form = form;
        this.viewPoints = viewPoints;
        this.formSelect = [...this.form.elements].filter((el) => el.type === 'select-one');
    }
    init() {
        this.#getAllSelectedOptions();

        this.formSelect.forEach((se) =>
            se.addEventListener('mouseup', () => {
                this.#getAllSelectedOptions();
                this.#displayPoints();
            })
        );
    }
    /**
     * @returns Zwaraca sumę punktów.
     */
    getPoints = () => parseInt(this.viewPoints.textContent);
    /**
     * @returns Zwraca tablicę z zanaczonym wyborem string.
     */
    getValueString = () => this.#allOptions.filter(this.#filterString);
    #filterString = (value) => {
        if (value.toLowerCase() === 'tak' || value.toLowerCase() === 'nie') {
            return value;
        }
    };
    #getAllSelectedOptions() {
        this.#allOptions = this.formSelect.map((select) => select.value);
    }
    #displayPoints() {
        this.viewPoints.innerText = `${this.#sumPoints()}`;
    }
    #sumPoints = () =>
        this.#allOptions
            .map(this.#filterNumber)
            .filter((el) => parseInt(el))
            .reduce((a, b) => a + b);
    #filterNumber = (value) => Number(value.replace(/\D/g, ''));
}
