'use strict';
export default class CountCharacters {
    #viewCount;
    #maxCharacters;
    #numberSign;
    #textLenght;
    #textAreas;
    #signNumber;
    /**
     * Klasa, zliczając liczbę wpisanych znaków w obszarze tekstowym.
     * @param {!object} textAreas Tablicą z obiektami DOM typu textarea.
     */
    constructor(textAreas, signNumber) {
        this.#textAreas = textAreas;
        this.#signNumber = signNumber;
    }
    init() {
        this.#textAreas.forEach((textArea) => textArea.addEventListener('keyup', (event) => this.#calculaterCharacters(event)));
    }
    clearLenghtCharacters() {
        this.#signNumber.forEach((sign) => (sign.innerHTML = ''));
    }
    #calculaterCharacters(event) {
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
