'use strict';
export default class Choose {
    #listResults;
    #selectedList;
    #selectedId;
    /**
     * Klasa odpowiedzialna za selekcjonowanie odnalezionych elementów.
     * @param {!object} listResults Obiekt DOM w którym wyświetlane są wyniki szukania.
     * @param {!object} selectedList  Obiekt DOM w którym wyświetlane są wybrane elementy.
     */
    constructor({ listResults, selectedList }) {
        this.#listResults = listResults;
        this.#selectedList = selectedList;
        this.#selectedId = [];
    }
    init() {
        this.#listResults.addEventListener('click', (event) => this.#selected(event));
    }
    /**
     * Czyści i zamyka listę wybranych elementów.
     */
    closeSelectedList() {
        this.#selectedList.classList.remove('on');
        [...this.#selectedList.children].forEach((li) => li.remove());
        this.#selectedId.length = 0;
    }
    /**
     * @returns Zwraca kolekcje numerów ID | Array
     */
    getID = () => this.#selectedId;
    #selected(event) {
        const id = event.target.getAttributeNode('data-id').value;
        if (event.target.tagName === 'LI' && this.#noRepeating(id)) {
            this.#selectedId.push(id);
            const cloneSelected = event.target.cloneNode(true);
            this.#transfer(cloneSelected);
        } else {
            this.#listResults.nextElementSibling.classList.add('span_error');
            setTimeout(() => this.#listResults.nextElementSibling.classList.remove('span_error'), 2000);
        }
    }
    #transfer(cloneSelected) {
        this.#selectedList.appendChild(cloneSelected);
        this.#selectedList.classList.add('on');

        this.#listResults.classList.remove('on');
    }
    #noRepeating = (id) => !this.#selectedId.includes(id);
}
