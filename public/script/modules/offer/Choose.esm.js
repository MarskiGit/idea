'use strict';
export default class Choose {
    #selectedList;
    #selectedId = [];
    constructor(selectedList) {
        this.#selectedList = selectedList;
    }
    closeSelectedList() {
        this.#selectedList.classList.remove('on');
        [...this.#selectedList.children].forEach((li) => li.remove());
        this.#selectedId.length = 0;
    }
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
