'use strict';
import { setingRequest } from './modules/seting.esm.js';
import Idea from './modules/list/Idea.esm.js';
import Request from './modules/Request.esm.js';

setingRequest.ajax.cache = 'default';

const domObjects = {
    request: 'listOffers',
    listContainer: document.querySelector('[data-list="offers_container"]'),
};

class ListOffers {
    #RequestParam = {
        last_tuple: 0,
    };
    #listContainer;
    #Request;
    #LastTuple;
    #fragmentList = document.createDocumentFragment();
    #tupleNumbers = [];
    #endTuples = false;
    #data;
    constructor(domObjects, setingRequest) {
        this.#RequestParam.request = domObjects.request;
        this.#listContainer = domObjects.listContainer;
        this.#Request = new Request(setingRequest);
    }
    init() {
        this.#RequestParam.token = this.#listContainer.getAttribute('data-token');
        this.#LastTuple = this.#findLastTuple();
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
                .getJson(this.#RequestParam)
                .then((data) => {
                    this.#data = this.#Request.getData(data);
                    this.#checkData();
                })
                .finally((document.body.style.cursor = 'default'));
        }
    };
    #checkData() {
        if (this.#data.length) {
            this.#renderList();
        } else {
            this.#listContainer.classList.remove('idea_container');
            this.#emptyList();
        }
    }
    #renderList() {
        for (const idea of this.#data) {
            this.#tupleNumbers.push(parseInt(idea.id_idea, 10));
            this.#fragmentList.appendChild(new Idea(idea).getIdea());
        }
        const { end, last } = this.#LastTuple();
        this.#endTuples = end;
        this.#RequestParam.last_tuple = last;

        this.#addListPage();
    }

    #addListPage() {
        this.#listContainer.appendChild(this.#fragmentList);
    }
    #findLastTuple() {
        const arrayTupleId = this.#tupleNumbers;

        return () => ({
            end: arrayTupleId.includes(1),
            last: Math.min(...arrayTupleId),
        });
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

new ListOffers(domObjects, setingRequest).init();
