'use strict';
export default class ChosenOnes {
    #id = [];
    /**
     * Klasa odpowiedzialna za selekcjonowanie odnalezionych elementów.
     * @param {!object} ulList Obiekt DOM w którym wyświetlane są wyniki szukania.
     * @param {!object} chosenOnes Obiekt DOM w którym wyświetlane są wybrane elementy.
     */
    constructor(ulList, chosenOnes) {
        this.chosenOnes = chosenOnes;
        this.ulList = ulList;
    }
    init() {
        this.ulList.addEventListener('click', (event) => this.#select(event));
    }
    /**
     * Czyści i zamyka listę wybranych elementów.
     */
    closeSelectedList() {
        this.chosenOnes.classList.remove('on');
        [...this.chosenOnes.children].forEach((li) => li.remove());
        this.#id.length = 0;
    }
    /**
     * @returns Sprawdź czy lista jest uzupełniona, zwraca bool.
     */
    whetherListCompleted = () => (this.#id.length ? true : false);
    /**
     * @returns Zwraca tablicę z wartościami id z listy.
     */
    takeChosenOnes = () => this.#id;
    #select(event) {
        const id = event.target.getAttributeNode('data-id').value;
        if (event.target.tagName === 'LI' && this.#noRepeating(id)) {
            this.#id.push(id);
            const cloneLi = event.target.cloneNode(true);
            this.#transfer(cloneLi);
        } else {
            this.ulList.nextElementSibling.classList.add('span_error');
            setTimeout(() => this.ulList.nextElementSibling.classList.remove('span_error'), 2000);
        }
    }
    #transfer(cloneLi) {
        this.chosenOnes.appendChild(cloneLi);
        this.chosenOnes.classList.add('on');
    }
    #noRepeating = (id) => (this.#id.includes(id) ? false : true);
}
