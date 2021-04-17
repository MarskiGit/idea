'use strict';
import Request from '../Request.esm.js';
import Choose from './Choose.esm.js';

export default class LiveSearch {
    #Request;
    #setingRequest = {
        ajax: {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        },
        url: 'ajax.php',
    };
    #listUser = document.createDocumentFragment();
    #request = {};
    #inputSearch;
    #listResults;
    #Choose;

    /**
     * Klasa odpowiedzialna za wyszukiwanie na żywo.
     * @param {!object} listResults Obiekt DOM w którym wyświetlane są wyniki szukania.
     * @param {!object} inputSearch Obiekt DOM input.
     * @param {!object} request Obiekt z typem żądania.
     */
    constructor(inputSearch, searchObjects) {
        this.#listResults = searchObjects.listResults;
        this.#inputSearch = inputSearch;
        this.#request = {
            action: searchObjects.request,
        };
        this.#Request = new Request(this.#setingRequest);
        this.#Choose = new Choose(searchObjects);
    }
    init() {
        this.#Choose.init();
        this.#eventListeners();
    }
    /**
     * @returns Sprawdza, czy lista jest uzupełniona. | Boolean.
     */
    whetherListCompleted = () => !!this.#Choose.selectedId.length;
    /**
     * @returns Zwraca listę wybranych id. | Array
     */
    getSelectedId = () => this.#Choose.getID();
    /**
     * Czyści i zamyka listę wyszukanych elementów.
     */
    closeList() {
        this.#listResults.classList.remove('on');
        this.#removeLI();
    }
    /**
     * Czyści listę wybranych elementów
     */
    clearChosen() {
        this.#Choose.closeSelectedList();
    }

    #eventListeners() {
        this.#inputSearch.addEventListener('input', this.#debounced(this.#validation, 500));
    }
    #validation = ({ target }) => {
        this.#validationSign(target.value) ? this.#badSign(1) : this.#searchInit(target);
    };
    #badSign(bool) {
        if (bool) {
            this.#inputSearch.labels[0].style.color = 'red';
            this.#inputSearch.labels[0].textContent = 'Tylko znaki alfabetu i cyfry';
            this.#inputSearch.classList.add('errorSearch');
        } else {
            this.#inputSearch.labels[0].style.color = '';
            this.#inputSearch.labels[0].textContent = 'Wyszukaj i kliknij:';
            this.#inputSearch.classList.remove('errorSearch');
        }
    }
    #searchInit(target) {
        this.#badSign(0);
        target.value.length >= 3 ? this.#valueSought(target) : this.closeList();
    }
    #valueSought(target) {
        if (target.dataset.write === 'creator_search') {
            Number(target.value) ? (this.#request.select = 'user_number') : (this.#request.select = 'user_name');
            this.#request.user_name = target.value;
        } else {
            this.#request.area_name = target.value;
        }
        this.#sendRequest();
    }
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#Request
            .getJson(this.#request)
            .then((data) => this.#renderLI(data))
            .finally((document.body.style.cursor = 'default'));
    }
    #renderLI(data) {
        const status = data[0];
        if (status.ok) {
            data.shift();
            for (let key in data) {
                const li = document.createElement('li');
                li.setAttribute('class', 'view_li creator_li');
                li.setAttribute('data-id', `${data[key].id_user ? data[key].id_user : data[key].id_area}`);
                li.innerText = `${data[key].user_name ? data[key].user_name : data[key].area_name}`;
                this.#listUser.appendChild(li);
            }
        } else {
            const li = document.createElement('li');
            li.setAttribute('class', 'view_li');
            li.innerText = `${data[0].user_name ? data[0].user_name : data[0].area_name}`;
            this.#listUser.appendChild(li);
        }
        this.#addListPage();
    }
    #addListPage() {
        this.#removeLI();
        this.#listResults.appendChild(this.#listUser);
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
