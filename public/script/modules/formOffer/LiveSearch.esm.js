'use strict';
import AjaxRequest from '../AjaxRequest.esm.js';
import RenderLi from './RenderLi.esm.js';

export default class LiveSearch {
    #requestParam = {};
    #AjaxRequest;
    #resultsSearchUl;
    #inputSearch;
    #fragmentList = document.createDocumentFragment();
    #data;
    constructor(searchObjects) {
        this.#requestParam.request = searchObjects.request;
        this.#AjaxRequest = new AjaxRequest();
        this.#resultsSearchUl = searchObjects.resultsSearchUl;
    }
    init(inputSearch) {
        this.#inputSearch = inputSearch;
        this.#eventListeners();
    }
    closeSearchResult() {
        this.#resultsSearchUl.classList.remove('on');
        this.#clearResultsLI();
    }
    #eventListeners() {
        this.#inputSearch.addEventListener('input', this.#debounced(this.#validation, 500));
    }

    #validation = ({ target }) => {
        this.#validationSign(target.value) ? this.#badSign(1) : this.#searchInit(target);
    };
    #searchInit(target) {
        this.#badSign(0);
        target.value.length >= 3 ? this.#valueSought(target) : this.closeSearchResult();
    }
    #badSign(bool) {
        if (bool) {
            this.#userMessage('Tylko znaki alfabetu i cyfry', 'red');
            this.#inputSearch.classList.add('error_search');
        } else {
            this.#userMessage('Wyszukaj i kliknij:');
            this.#inputSearch.classList.remove('error_search');
        }
    }
    #userMessage(text, color = '') {
        this.#inputSearch.labels[0].style.color = color;
        this.#inputSearch.labels[0].textContent = text;
    }
    #valueSought(target) {
        if (target.dataset.search === 'creator_search') {
            Number(target.value) ? (this.#requestParam.select = 'id_pass') : (this.#requestParam.select = 'full_name');
            this.#requestParam.full_name = target.value;
        } else {
            this.#requestParam.area_name = target.value;
        }
        this.#sendRequest();
    }
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                this.#data = this.#AjaxRequest.getData(data);
                this.#renderLi();
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #renderLi() {
        for (const li of this.#data) {
            this.#fragmentList.appendChild(new RenderLi(li).getLi());
        }
        this.#addListPage();
    }
    #addListPage() {
        this.#clearResultsLI();
        this.#resultsSearchUl.appendChild(this.#fragmentList);
        this.#resultsSearchUl.classList.add('on');
    }
    #clearResultsLI() {
        [...this.#resultsSearchUl.children].forEach((li) => li.remove());
    }
    #validationSign = (char) => new RegExp(/[^A-Z-ŚŁŻŹĆa-z-ęóąśłżźćń\s0-9]/gi).test(char);
    #debounced(f, t) {
        let l;
        return (...a) => {
            const c = this;
            clearTimeout(l), (l = setTimeout(() => f.apply(c, a), t));
        };
    }
}
