'use strict';
import { handleRequestParams } from '../modules.esm.js';
import Api from '../Api.esm.js';
import RenderLi from './RenderLi.esm.js';

export default class LiveSearch {
    #requestParam;
    #Api;
    #Api_data;
    #resultsSearchUl;
    #inputSearch;
    #fragmentList = document.createDocumentFragment();
    constructor(searchObjects) {
        this.#requestParam = handleRequestParams(searchObjects.request);
        this.#Api = new Api();
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
            this.#showMessage('Tylko znaki alfabetu lub cyfry', 'red');
            this.#inputSearch.classList.add('error_search');
        } else {
            this.#showMessage('Wyszukaj i kliknij:');
            this.#inputSearch.classList.remove('error_search');
        }
    }
    #showMessage(text, color = '') {
        this.#inputSearch.labels[0].style.color = color;
        this.#inputSearch.labels[0].textContent = text;
    }
    #search(target) {
        this.#badSign(false);
        target.value.length >= 3 ? this.#whatValueSearch(target) : this.clear();
    }
    #whatValueSearch(target) {
        let valueSearch = target.getAttribute('data-search');
        if (valueSearch === 'creator_search') {
            Number(target.value) ? this.#requestParam.set('select', 'id_pass') : this.#requestParam.set('select', 'full_name');
            this.#requestParam.set('full_name', target.value);
        } else {
            this.#requestParam.set('area_name', target.value);
        }
        this.#Api_request();
    }
    #Api_request = () => {
        document.body.style.cursor = 'progress';
        this.#Api
            .getJson(this.#requestParam.getUrl())
            .then((data) => {
                this.#Api_data = data;
                this.#Api_response();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #Api_response() {
        for (const li of this.#Api_data) {
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
