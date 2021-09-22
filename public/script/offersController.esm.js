'use strict';
import { handleRequestParams } from './modules/modules.esm.js';
import Idea from './modules/offersModules/Idea.esm.js';
import FormHandling from './modules/FormHandling.esm.js';

const ideaDOM = {
    list: {
        request: 'listOffers',
        container: document.querySelector('[data-list="offers_container"]'),
        empty: document.querySelector('[data-list="empty_list"]'),
        lenght: document.querySelector('[data-page="list_lenght"]'),
        renderCount: document.querySelector('[data-page="render_count"]'),
    },
    search: {
        request: 'ideaSearch',
        container: document.querySelector('[data-list="search_container"]'),
        toggleButton: document.querySelector('[data-list="search_toggle"]'),
        form: {
            form: document.querySelector('[data-list="form_search"]'),
            errorMessage: document.querySelector('[data-list="offer_message"]'),
            button: document.querySelector('[data-list="button_submit"]'),
        },
    },
};

export default class OfferController {
    #Api;
    #Api_data;

    #requestParam = handleRequestParams(ideaDOM.list.request);
    #FormHandling = new FormHandling(ideaDOM.search.form);
    #FormTogle = new FormTogle();

    #inputSearch;
    #endTuples = false;

    init(Api) {
        this.#inputSearch = this.#FormHandling.getInputs(['INPUT'], 'search')[0];
        this.#Api = new Api();
        this.#factory();
        this.#initList();
        this.#eventListeners();
    }
    #factory() {
        this.#FormTogle.init();
    }
    #initList() {
        this.#requestParam.set('last_tuple', view.lastTupleId());
        this.#Api_request(this.#requestParam.getUrl());
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#setParam, 1000));
        this.#FormHandling.form.addEventListener('submit', this.#setParam);
        this.#inputSearch.addEventListener('search', this.#setParam);
    }
    #Api_request(request) {
        document.body.style.cursor = 'progress';
        this.#Api
            .getJson(request)
            .then((data) => {
                this.#Api_data = data;
                this.#Api_data.length === 0 ? (this.#endTuples = true) : (this.#endTuples = false);
                this.#Api_response();
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #Api_response() {
        if (this.#Api_data.length > 0) {
            view.displayList(this.#Api_data);
        } else {
            view.emptyList();
        }
    }
    #setParam = (event) => {
        event && event.preventDefault();
        if (event && event.type === 'submit') {
            this.#formValidation();
        } else if (event && event.type === 'search') {
            this.#requestParam.deletePatam('option_search');
            this.#requestParam.deletePatam('idea_search');
            view.resetTuplesNumber();
            view.clear();
            this.#get();
        } else if (!this.#endTuples) {
            this.#get();
        }
    };
    #formValidation() {
        if (this.#FormHandling.emptyFields()) {
            this.#setRequestSearch();
            view.clear();
        } else {
            this.#FormHandling.showMessage('Uzupełnij wszystkie pola.');
        }
    }
    #setRequestSearch() {
        const { option_search, idea_search } = this.#FormHandling.getValue();
        this.#requestParam.set('option_search', option_search);
        this.#requestParam.set('idea_search', idea_search);
        view.resetTuplesNumber();
        this.#get();
    }
    #get() {
        this.#requestParam.set('last_tuple', view.lastTupleId());
        this.#Api_request(this.#requestParam.getUrl());
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}

class FormTogle {
    #toggleButton = ideaDOM.search.toggleButton;
    #container = ideaDOM.search.container;
    init() {
        this.#eventListeners();
    }
    #eventListeners() {
        this.#toggleButton.addEventListener('click', this.#togleContainer);
    }
    #togleContainer = () => {
        this.#container.classList.toggle('form_open');
    };
}

class View {
    #Idea = new Idea();

    #listContainer = ideaDOM.list.container;
    #emptyList = ideaDOM.list.empty;
    #listLenght = ideaDOM.list.lenght;
    #renderCount = ideaDOM.list.renderCount;
    #tupleID = [];

    #fragmentList = document.createDocumentFragment();
    #countRender = 0;
    displayList(data) {
        this.#listContainer.classList.add('offers_container');

        console.time('Render Idea');

        for (const idea of data) {
            this.#tupleID.push(Number(idea.id_idea));
            this.#Idea.render(idea);
            this.#fragmentList.appendChild(this.#Idea.get());
        }

        console.timeEnd('Render Idea');

        this.#countRender++;
        this.#viewList();
    }
    clear() {
        while (this.#listContainer.lastElementChild) {
            this.#listContainer.removeChild(this.#listContainer.lastElementChild);
        }
        // this.#listContainer.innerHTML = '';
    }
    emptyList() {
        this.#tupleID.length > 0 ? this.#emptyList.classList.add('hide') : this.#emptyList.classList.remove('hide');
    }
    lastTupleId = () => (Number.isFinite(Math.min(...this.#tupleID)) ? Math.min(...this.#tupleID) : 0);
    resetTuplesNumber() {
        this.#tupleID.length = 0;
    }
    #viewList() {
        this.#listContainer.appendChild(this.#fragmentList);
        this.#listLenght.innerHTML = `Elementów listy: ${this.#tupleID.length}`;
        this.#renderCount.innerHTML = `Liczba Żądań: ${this.#countRender}`;
    }
}

const view = new View();
