'use strict';

import Idea from './Idea.esm.js';

export default class RenderList {
    #fragmentList = document.createDocumentFragment();
    #tupleNumber = [];
    #endTuples = false;
    #lastTuple = 0;
    constructor(data) {
        this.#init(data);
    }
    add() {
        return this.#fragmentList;
    }
    tuple() {
        return {
            endTuples: this.#endTuples,
            lastTuple: this.#lastTuple,
        };
    }
    #init(data) {
        if (data.length) {
            for (const idea of data) {
                this.#tupleNumber.push(idea.id_idea);
                if (parseInt(idea.id_idea, 10) === 1) this.#endTuples = true;

                this.#fragmentList.appendChild(new Idea(idea).getIdea());
            }
            this.#lastTuple = Math.min(...this.#tupleNumber);
        } else {
            this.#fragmentList.appendChild(this.#emptyList());
        }
    }
    #emptyList() {
        const div = document.createElement('div');
        div.classList.add('IdeaList');
        div.innerHTML = '<h4 class="empty_idea">Brak elementów do wyświetlenia.</h4>';
        return div;
    }
}
