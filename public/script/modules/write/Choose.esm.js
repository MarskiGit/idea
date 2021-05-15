'use strict';
export default class Choose {
    #selectedList;
    #selectedId = [];
    /**
     * Klasa odpowiedzialna za selekcjonowanie odnalezionych elementów.
     * @param {!object} listResults Obiekt DOM w którym wyświetlane są wyniki szukania.
     * @param {!object} selectedList  Obiekt DOM w którym wyświetlane są wybrane elementy.
     */
    constructor(selectedList) {
        this.#selectedList = selectedList;
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
    selected(id, event) {
        if (event.target.tagName === 'LI' && this.#noRepeating(id)) {
            this.#selectedId.push(id);
            const cloneSelected = event.target.cloneNode(true);
            this.#transfer(cloneSelected);
            return true;
        } else {
            return false;
        }
    }
    #transfer(cloneSelected) {
        this.#selectedList.appendChild(cloneSelected);
        this.#selectedList.classList.add('on');
    }
    #noRepeating = (id) => !this.#selectedId.includes(id);
}
