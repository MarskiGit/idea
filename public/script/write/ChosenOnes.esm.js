'use strict';
export default class ChosenOnes {
    /**
     * Klasa odpowiedzialna za selekcjonowanie odnalezionych elementów.
     * @param {!object} view Obiekt DOM w którym wyświetlane są wyniki szukania.
     * @param {!object} chosenOnes Obiekt DOM w którym wyświetlane są wybrane elementy.
     */
    constructor(view, chosenOnes) {
        this.chosenOnes = chosenOnes;
        this.view = view;
        this.id = [];
    }
    init() {
        this.view.addEventListener('click', (event) => this.select(event));
    }
    select(event) {
        const id = event.target.getAttributeNode('data-id');
        if (event.target.tagName === 'LI' && this.noRepeating(id)) {
            this.id.push(id);
            const cloneLi = event.target.cloneNode(true);
            this.transfer(cloneLi);
        } else {
            this.view.nextElementSibling.classList.add('span_error');
            setTimeout(() => this.view.nextElementSibling.classList.remove('span_error'), 2000);
        }
    }
    transfer(cloneLi) {
        this.chosenOnes.appendChild(cloneLi);
        this.chosenOnes.classList.add('on');
    }
    noRepeating = (id) => (this.id.includes(id) ? false : true);
}
