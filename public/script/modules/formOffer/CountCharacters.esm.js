'use strict';
export default class CountCharacters {
    #characters;
    #words;
    #sentences;
    #textArea;
    #maxCharacters;
    #textLenght;
    #str;
    #numCharacters;
    #numWords;
    #numSentences;

    #empty = '0';
    constructor({ characters, words = null, sentences = null }) {
        this.#characters = characters;
        this.#words = words;
        this.#sentences = sentences;
    }
    init(textAreas) {
        this.#maxCharacters = textAreas.maxLength;
        this.#textArea = textAreas;
        this.#textArea.addEventListener('keyup', (event) => this.#calculaterCharacters(event));
    }
    clear() {
        [this.#characters, this.#words, this.#sentences].forEach((sign) => (sign.innerHTML = this.#empty));
    }
    #calculaterCharacters(event) {
        this.#textLenght = event.target.textLength || event.target.value.length;
        this.#str = event.target.value;
        this.#numCharacters = this.#maxCharacters - this.#textLenght;
        this.#numWords = this.#str.replace(/[\r\n]/g, ' ').split(' ').length;
        this.#numSentences = this.#str.split('.').length;
        this.#displayCount();
    }
    #displayCount() {
        if (this.#words) this.#words.innerHTML = this.#textLenght ? this.#numWords : this.#empty;
        if (this.#sentences) this.#sentences.innerHTML = this.#textLenght ? this.#numSentences : this.#empty;
        this.#characters.innerHTML = this.#textLenght ? `${this.#numCharacters}  &#8725;  ${this.#maxCharacters}` : this.#empty;
    }
}
