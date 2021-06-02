'use strict';
import { setingRequest } from '../seting.esm.js';
import Request from '../Request.esm.js';
import Choose from './Choose.esm.js';
import RenderLi from './RenderLi.esm.js';

export default class LiveSearch {
    #Request;
    #Choose;
    #request = {};
    #inputSearch;
    #listResults;
    #fragmentList = document.createDocumentFragment();
    #dataAjax;
    constructor(inputSearch, searchObjects) {
        this.#listResults = searchObjects.listResults;
        this.#inputSearch = inputSearch;
        this.#request = {
            request: searchObjects.request,
        };
        this.#Request = new Request(setingRequest);
        this.#Choose = new Choose(searchObjects.selectedList);
    }
    init() {
        this.#eventListeners();
    }
    whetherListCompleted = () => !!this.getSelectedId().length;
    getSelectedId = () => this.#Choose.getID();
    closeList() {
        this.#listResults.classList.remove('on');
        this.#removeLI();
    }
    clearChosen() {
        this.#Choose.closeSelectedList();
    }
    #eventListeners() {
        this.#listResults.addEventListener('click', this.#selected);
        this.#inputSearch.addEventListener('input', this.#debounced(this.#validation, 500));
    }
    #selected = (event) => {
        const id = parseInt(event.target.getAttributeNode('data-id').value, 10);
        if (id) {
            const transferred = this.#Choose.selected(id, event);
            if (transferred) {
                this.closeList();
                this.#inputSearch.value = '';
            } else {
                this.#listResults.nextElementSibling.classList.add('span_error');
                setTimeout(() => this.#listResults.nextElementSibling.classList.remove('span_error'), 2000);
            }
        }
    };
    #validation = ({ target }) => {
        this.#validationSign(target.value) ? this.#badSign(1) : this.#searchInit(target);
    };
    #searchInit(target) {
        this.#badSign(0);
        target.value.length >= 3 ? this.#valueSought(target) : this.closeList();
    }
    #badSign(bool) {
        if (bool) {
            this.#userMessage('Tylko znaki alfabetu i cyfry', 'red');
            this.#inputSearch.classList.add('errorSearch');
        } else {
            this.#userMessage('Wyszukaj i kliknij:');
            this.#inputSearch.classList.remove('errorSearch');
        }
    }
    #userMessage(text, color = '') {
        this.#inputSearch.labels[0].style.color = color;
        this.#inputSearch.labels[0].textContent = text;
    }
    #valueSought(target) {
        if (target.dataset.search === 'creator_search') {
            Number(target.value) ? (this.#request.select = 'id_pass') : (this.#request.select = 'full_name');
            this.#request.full_name = target.value;
        } else {
            this.#request.area_name = target.value;
        }
        this.#sendRequest();
    }
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#Request
            .getJson(this.#request)
            .then((data) => {
                this.#dataAjax = this.#Request.getData(data);

                console.log(this.#dataAjax);
                this.#renderList();
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #renderList() {
        for (const li of this.#dataAjax) {
            console.log(li);
            this.#fragmentList.appendChild(new RenderLi(li).getLi());
        }
        this.#addListPage();
    }
    #addListPage() {
        this.#removeLI();
        this.#listResults.appendChild(this.#fragmentList);
        this.#listResults.classList.add('on');
    }
    #removeLI() {
        [...this.#listResults.children].forEach((li) => li.remove());
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
