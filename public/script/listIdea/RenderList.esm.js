'use strict';

import Idea from './Idea.esm.js';

export default class RenderList {
    #fragmentList = document.createDocumentFragment();
    #tupleNumber = [];
    constructor({ listContainer }) {
        this.listContainer = listContainer;
        this.endTuples = false;
        this.lastTuple = 0;
    }
    createList(data) {
        if (data.length) {
            for (const idea of data) {
                this.#tupleNumber.push(idea.id_idea);
                const renderHtml = new Idea(idea);

                this.#fragmentList.appendChild(renderHtml.create());

                if (parseInt(idea.id_idea, 10) === 1) this.endTuples = true;
            }
            this.lastTuple = Math.min(...this.#tupleNumber);
            this.#addListPage();
        } else if (this.lastTuple === 0) {
            this.#fragmentList.innerHTML = '<div class=IdeaList"><h4 class="empty_idea">Brak elementów do wyświetlenia.</h4></div>';
        }
    }
    #addListPage() {
        this.listContainer.appendChild(this.#fragmentList);
    }
}
