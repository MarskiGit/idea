'use strict';
export default class NumberCharacters {
    #viewCount = null;
    #maxCharacters = null;
    #numberSign = null;
    #textLenght = null;
    /**
     * Klasa, zliczając liczbę wpisanych znaków w obszarze tekstowym.
     * @param {!object} textAreas Tablicą z obiektami DOM typu textarea.
     */
    constructor(textAreas) {
        this.textAreas = textAreas;
    }
    init() {
        this.textAreas.forEach((textArea) => textArea.addEventListener('keyup', (event) => this.#calculateNumberCharacters(event)));
    }
    #calculateNumberCharacters(event) {
        this.#viewCount = event.target.nextElementSibling;
        this.#maxCharacters = event.target.maxLength;
        this.#textLenght = event.target.textLength;
        this.#numberSign = this.#maxCharacters - event.target.textLength;
        this.#displayCount();
    }
    #displayCount() {
        this.#viewCount.innerHTML = this.#textLenght ? `${this.#numberSign}  &#8725;  ${this.#maxCharacters}` : (this.#viewCount.innerHTML = '');
    }
}
