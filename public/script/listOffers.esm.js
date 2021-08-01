'use strict';
import { CreateRequest } from './modules/seting.esm.js';
import Api from './modules/Api.esm.js';
import Idea from './modules/listOffers/Idea.esm.js';

const ideaDOM = {
    list: {
        request: 'listOffers',
        container: document.querySelector('[data-list="offers_container"]'),
        lenght: document.querySelector('[data-page="list_lenght"]'),
        renderCount: document.querySelector('[data-page="render_count"]'),
    },
    search: {
        request: 'ideaSearch',
        input: document.querySelector('[data-list="search"]'),
        container: document.querySelector('[data-list="search_container"]'),
    },
};

class ListOffers {
    #requestParam;
    #Api;
    #countRender = 0;
    #listContainer;

    #fragmentList = document.createDocumentFragment();
    #tupleNumbers = [];
    #endTuples = false;

    #listLenght;
    #renderCount;
    constructor(ideaDOM) {
        this.#requestParam = CreateRequest(ideaDOM.list.request);
        this.#requestParam.add('last_tuple', 0);
        this.#Api = new Api();

        this.inputSearch = ideaDOM.search.input;
        this.#listContainer = ideaDOM.list.container;
        this.#listLenght = ideaDOM.list.lenght;
        this.#renderCount = ideaDOM.list.renderCount;
    }
    init() {
        this.#requestAPI();
        this.#eventListeners();
    }

    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#requestAPI, 1000));
    }
    #requestAPI = () => {
        if (!this.#endTuples) {
            document.body.style.cursor = 'progress';
            this.#Api
                .getJson(this.#requestParam.get())
                .then((data) => {
                    this.apiData = data;
                    if (this.apiData.length === 0) this.#endTuples = true;
                    this.#responseAPI();
                })
                .finally((document.body.style.cursor = 'default'));
        }
    };
    #responseAPI() {
        if (this.apiData.length > 0) {
            this.#listContainer.classList.add('offers_container');
            this.#displayList();
        } else if (!this.#endTuples) {
            this.#listContainer.classList.remove('offers_container');
            this.#emptyList();
        }
    }
    #displayList() {
        console.time('Render Idea');

        for (const idea of this.apiData) {
            this.#tupleNumbers.push(Number(idea.id_idea));

            this.#fragmentList.appendChild(new Idea(idea).get());
        }

        console.timeEnd('Render Idea');

        this.#countRender++;
        this.#checkTuple();
        this.#statisticsView();
    }
    #checkTuple() {
        this.#requestParam.add('last_tuple', Math.min(...this.#tupleNumbers));
    }
    // tymczaoswa metoda jako ciekwostka
    #statisticsView() {
        this.#listContainer.appendChild(this.#fragmentList);
        this.#listLenght.innerHTML = `Elementów listy: ${this.#tupleNumbers.length}`;
        this.#renderCount.innerHTML = `Liczba Żądań: ${this.#countRender}`;
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

new ListOffers(ideaDOM).init();
