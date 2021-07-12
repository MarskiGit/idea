'use strict';
import Idea from './modules/listOffers/Idea.esm.js';
import AjaxRequest from './modules/AjaxRequest.esm.js';

const listDOM = {
    request: 'listOffers',
    listContainer: document.querySelector('[data-list="offers_container"]'),
    listLenght: document.querySelector('[data-page="list_lenght"]'),
    renderCount: document.querySelector('[data-page="render_count"]'),
};

class ListOffers {
    #requestParam = {
        last_tuple: 0,
    };
    #countRender = 0;
    #listContainer;
    #AjaxRequest;
    #LastTuple;
    #fragmentList = document.createDocumentFragment();
    #tupleNumbers = [];
    #endTuples = false;
    #ajaxData;

    #listLenght;
    #renderCount;
    constructor(listDOM) {
        this.#listContainer = listDOM.listContainer;
        this.#listLenght = listDOM.listLenght;
        this.#renderCount = listDOM.renderCount;
        this.#AjaxRequest = new AjaxRequest(listDOM.request);
    }
    init() {
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
                    this.#ajaxData = this.#AjaxRequest.getData(data);
                    this.#viewList();
                })
                .finally((document.body.style.cursor = 'default'));
        }
    };
    #viewList() {
        if (this.#ajaxData.length > 0) {
            this.#listContainer.classList.add('offers_container');
            this.#displayList();
        } else {
            this.#listContainer.classList.remove('offers_container');
            this.#emptyList();
        }
    }
    #displayList() {
        console.time('Render Idea');
        console.group('For of');
        for (const idea of this.#ajaxData) {
            this.#tupleNumbers.push(Number(idea.id_idea));

            this.#fragmentList.appendChild(new Idea(idea).get());

            console.count('Idea');
        }
        console.groupEnd();
        console.timeLog('Render Idea');

        this.#countRender++;
        this.#checkTuple();
        this.#statisticsView();
        console.timeEnd('Render Idea');
    }
    #checkTuple() {
        const { end, last } = this.#LastTuple();
        this.#endTuples = end;
        this.#requestParam.last_tuple = last;
    }
    // tymczaoswa metoda jako ciekwostka
    #statisticsView() {
        this.#listContainer.appendChild(this.#fragmentList);
        this.#listLenght.innerHTML = `Elementów listy: ${this.#tupleNumbers.length}`;
        this.#renderCount.innerHTML = `Liczba Żądań: ${this.#countRender}`;
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

new ListOffers(listDOM).init();
