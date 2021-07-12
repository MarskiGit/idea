'use strict';
export default class CountCharacters {
    #viewCount;
    #maxCharacters;
    #numberSign;
    #textLenght;
    #textAreas;
    #signNumber;
    constructor(signNumber) {
        this.#signNumber = signNumber;
    }
    init(textAreas) {
        this.#textAreas = textAreas;
        this.#textAreas.forEach((textArea) => textArea.addEventListener('keyup', (event) => this.#calculaterCharacters(event)));
    }
    clear() {
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
