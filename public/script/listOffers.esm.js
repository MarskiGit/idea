'use strict';
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
        message: {
            bad: 'Tylko znaki alfabetu lub cyfry',
            ok: 'Wyszukaj',
        },
    },
};

class ListOffers extends Api {
    #countRender = 0;
    #listContainer;

    #fragmentList = document.createDocumentFragment();
    #tupleNumbers = [];
    #endTuples = false;

    #listLenght;
    #renderCount;
    constructor(ideaDOM) {
        super(ideaDOM.list.request);
        this.requestParam.last_tuple = 0;
        this.inputSearch = ideaDOM.search.input;
        this.#listContainer = ideaDOM.list.container;
        this.#listLenght = ideaDOM.list.lenght;
        this.#renderCount = ideaDOM.list.renderCount;
    }
    init() {
        this.#send();
        this.#eventListeners();
    }
    responseAPI() {
        if (this.apiData.length > 0) {
            this.#listContainer.classList.add('offers_container');
            this.#displayList();
        } else {
            this.#listContainer.classList.remove('offers_container');
            this.#emptyList();
        }
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#send, 950));
    }
    #send = () => {
        if (!this.#endTuples) this.requestAPI();
    };
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
        this.#endTuples = this.#tupleNumbers.includes(1);
        this.requestParam.last_tuple = Math.min(...this.#tupleNumbers);
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
