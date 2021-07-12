'use strict';
import AjaxRequest from '../AjaxRequest.esm.js';
import RenderLi from './RenderLi.esm.js';

export default class LiveSearch {
    #requestParam = {};
    #AjaxRequest;
    #resultsSearchUl;
    #inputSearch;
    #fragmentList = document.createDocumentFragment();
    #ajaxData;
    constructor(searchObjects) {
        this.#AjaxRequest = new AjaxRequest(searchObjects.request);
        this.#resultsSearchUl = searchObjects.resultsSearchUl;
    }
    init(inputSearch) {
        this.#inputSearch = inputSearch;
        this.#eventListeners();
    }
    clear() {
        this.#resultsSearchUl.classList.remove('on');
        this.#clearResultsLI();
    }
    #eventListeners() {
        this.#inputSearch.addEventListener('input', this.#debounced(this.#validation, 500));
    }
    #validation = ({ target }) => {
        this.#validationSign(target.value) ? this.#badSign(true) : this.#search(target);
    };
    #validationSign = (char) => new RegExp(/[^A-Z-ŚŁŻŹĆa-z-ęóąśłżźćń\s0-9]/gi).test(char);
    #badSign(flag) {
        if (flag) {
            this.#displayMessage('Tylko znaki alfabetu lub cyfry', 'red');
            this.#inputSearch.classList.add('error_search');
        } else {
            this.#displayMessage('Wyszukaj i kliknij:');
            this.#inputSearch.classList.remove('error_search');
        }
    }
    #displayMessage(text, color = '') {
        this.#inputSearch.labels[0].style.color = color;
        this.#inputSearch.labels[0].textContent = text;
    }
    #search(target) {
        this.#badSign(false);
        target.value.length >= 3 ? this.#whatValueSearch(target) : this.closeSearchResult();
    }
    #whatValueSearch(target) {
        let valueSearch = target.getAttribute('data-search');
        if (valueSearch === 'creator_search') {
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
                this.#ajaxData = this.#AjaxRequest.getData(data);
                this.#viewResult();
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #viewResult() {
        for (const li of this.#ajaxData) {
            this.#fragmentList.appendChild(new RenderLi(li).get());
        }
        this.#displayLI();
    }
    #displayLI() {
        this.#clearResultsLI();
        this.#resultsSearchUl.appendChild(this.#fragmentList);
        this.#resultsSearchUl.classList.add('on');
    }
    #clearResultsLI() {
        [...this.#resultsSearchUl.children].forEach((li) => li.remove());
    }

    #debounced(f, t) {
        let l;
        return (...a) => {
            const c = this;
            clearTimeout(l), (l = setTimeout(() => f.apply(c, a), t));
        };
    }
}
