'use strict';
import { setingRequest } from './modules/seting.esm.js';
import Idea from './modules/list/Idea.esm.js';

import Request from './modules//Request.esm.js';

setingRequest.ajax.cache = 'default';

const domObjects = {
    listContainer: document.querySelector('[data-list="list_container"]'),
};

class List {
    #Request;
    #request = {
        request: 'listIdea',
        last_tuple: 0,
    };
    #fragmentList = document.createDocumentFragment();
    #listContainer;
    #tupleNumbers = [];
    #endTuples = false;
    #dataAjax;
    #token;
    constructor(domObjects, setingRequest) {
        this.#listContainer = domObjects.listContainer;

        this.#Request = new Request(setingRequest);
    }
    init() {
        this.#request.token = this.#listContainer.getAttribute('data-token');
        this.LastTuple = this.#findLastTuple();
        this.#sendRequest();
        this.#eventListeners();
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#sendRequest, 950));
    }
    #sendRequest = () => {
        if (!this.#endTuples) {
            document.body.style.cursor = 'progress';
            this.#Request
                .getJson(this.#request)
                .then((data) => {
                    this.#dataAjax = this.#Request.getData(data);
                    this.#go();
                })
                .finally((document.body.style.cursor = 'default'));
        }
    };
    #go() {
        if (this.#dataAjax.length) {
            this.#renderList();
        } else {
            this.#listContainer.classList.remove('idea_container');
            this.#emptyList();
        }
    }
    #renderList() {
        for (const idea of this.#dataAjax) {
            this.#fragmentList.appendChild(new Idea(idea).getIdea());
            this.#tupleNumbers.push(parseInt(idea.id_idea, 10));
        }

        const { end, last } = this.LastTuple();
        this.#endTuples = end;
        this.#request.last_tuple = last;

        this.#addListPage();
    }
    #findLastTuple() {
        const arrayTupleId = this.#tupleNumbers;

        return () => ({
            end: arrayTupleId.includes(1),
            last: Math.min(...arrayTupleId),
        });
    }
    #addListPage() {
        this.#listContainer.appendChild(this.#fragmentList);
    }
    #emptyList() {
        const div = document.createElement('div');
        div.classList.add('IdeaList');
        div.innerHTML = '<h4 class="empty_idea">Brak elementów do wyświetlenia.</h4>';
        this.#listContainer.appendChild(div);
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}

new List(domObjects, setingRequest).init();
