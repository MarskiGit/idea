'use strict';
export default class Choose {
    #btnHTML = '<span class="choose_delete">Usuń</span>';
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
        if (this.#noRepeating(id)) {
            this.#selectedId.push(id);
            let cloneSelected = event.target.cloneNode(true);
            cloneSelected.insertAdjacentHTML('beforeend', this.#btnHTML);
            this.#transfer(cloneSelected);
            return true;
        } else {
            return false;
        }
    }
    #transfer(cloneSelected) {
        this.#selectedList.appendChild(cloneSelected);
        if (!this.#selectedList.classList.contains('on')) this.#selectedList.classList.add('on');
    }
    #noRepeating = (id) => !this.#selectedId.includes(id);
    removeID(value) {
        let i = 0;
        while (i < this.#selectedId.length) {
            this.#selectedId[i] === value ? this.#selectedId.splice(i, 1) : ++i;
        }
    }
}
