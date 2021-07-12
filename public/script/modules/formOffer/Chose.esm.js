'use strict';
export default class Chose {
    #btnHTML = '<span class="choose_delete">Usuń</span>';
    #resultsSearchUl;
    #selectedResultsUl;
    #selectedId = [];
    #onelyChosen;
    constructor(ulElement) {
        this.#resultsSearchUl = ulElement.resultsSearchUl;
        this.#selectedResultsUl = ulElement.selectedResultsUl;
    }
    init(bool) {
        this.#onelyChosen = bool;
        this.#eventListeners();
    }
    get = () => this.#selectedId;
    check = () => (this.#selectedId.length ? true : false);
    clear() {
        this.#selectedResultsUl.classList.remove('on');
        [...this.#selectedResultsUl.children].forEach((li) => li.remove());
        this.#selectedId.length = 0;
    }
    #eventListeners() {
        this.#resultsSearchUl.addEventListener('click', this.#selectedLI);
        this.#selectedResultsUl.addEventListener('click', this.#removeSelectedLi);
    }
    #selectedLI = (event) => {
        const id = parseInt(event.target.getAttributeNode('data-id').value, 10);
        if (id && event.target.tagName === 'LI') {
            const transferred = this.#cloneSelected(id, event);
            if (transferred) {
                this.#closeResultsList();
            } else if (transferred === 0) {
                this.#closeResultsList();
                this.#resultsSearchUl.nextElementSibling.classList.add('span_error');
                this.#resultsSearchUl.nextElementSibling.innerHTML = 'Wybierz tylko jeden obszar';
                setTimeout(() => this.#resultsSearchUl.nextElementSibling.classList.remove('span_error'), 2000);
            } else {
                this.#resultsSearchUl.nextElementSibling.classList.add('span_error');
                setTimeout(() => this.#resultsSearchUl.nextElementSibling.classList.remove('span_error'), 2000);
            }
        }
    };
    #cloneSelected(id, event) {
        if (this.#onelyChosen && this.#onelyChosenCheck()) return 0;
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
    #closeResultsList() {
        this.#resultsSearchUl.value = '';
        this.#resultsSearchUl.previousElementSibling.value = '';
        this.#resultsSearchUl.classList.remove('on');
        [...this.#resultsSearchUl.children].forEach((li) => li.remove());
    }
    #transfer(cloneSelected) {
        this.#selectedResultsUl.appendChild(cloneSelected);
        if (!this.#selectedResultsUl.classList.contains('on')) this.#selectedResultsUl.classList.add('on');
    }
    #noRepeating = (id) => !this.#selectedId.includes(id);
    #removeSelectedLi = (event) => {
        let id;
        if (event.target.tagName === 'LI') {
            id = parseInt(event.target.getAttributeNode('data-id').value, 10);
            event.target.remove();
        } else if (event.target.tagName === 'SPAN') {
            const li = event.target.parentElement;
            id = parseInt(li.getAttributeNode('data-id').value, 10);
        }
        this.#removeID(id);
        if (!this.#selectedId.length) this.#selectedResultsUl.classList.remove('on');
    };
    #onelyChosenCheck = () => (this.#selectedId.length === 1 ? true : false);
    #removeID(value) {
        let i = 0;
        while (i < this.#selectedId.length) {
            this.#selectedId[i] === value ? this.#selectedId.splice(i, 1) : ++i;
        }
    }
}
