'use strict';
import Idea from './modules/listOffers/Idea.esm.js';
import AjaxRequest from './modules/AjaxRequest.esm.js';

const domObjects = {
    request: 'listOffers',
    listContainer: document.querySelector('[data-list="offers_container"]'),
};

class ListOffers {
    #requestParam = {
        last_tuple: 0,
    };
    #listContainer;
    #AjaxRequest;
    #LastTuple;
    #fragmentList = document.createDocumentFragment();
    #tupleNumbers = [];
    #endTuples = false;
    #data;
    constructor(domObjects) {
        this.#requestParam.request = domObjects.request;
        this.#listContainer = domObjects.listContainer;
        this.#AjaxRequest = new AjaxRequest();
    }
    init() {
        this.#requestParam.token = this.#listContainer.getAttribute('data-token');
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
            this.#AjaxRequest
                .getJson(this.#requestParam)
                .then((data) => {
                    this.#data = this.#AjaxRequest.getData(data);
                    this.#checkData();
                })
                .finally((document.body.style.cursor = 'default'));
        }
    };
    #checkData() {
        if (this.#data.length) {
            this.#listContainer.classList.add('offers_container');
            this.#renderList();
        } else {
            this.#listContainer.classList.remove('offers_container');
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
        this.#requestParam.last_tuple = last;
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

new ListOffers(domObjects).init();
