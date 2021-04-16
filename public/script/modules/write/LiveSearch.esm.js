'use strict';
import Request from '../Request.esm.js';

export default class LiveSearch {
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
    /**
     * Klasa odpowiedzialna za wyszukiwanie na żywo.
     * @param {!object} ulList Obiekt DOM w którym wyświetlane są wyniki szukania.
     * @param {!object} inputSearch Obiekt DOM input.
     * @param {!object} request Obiekt z typem żądania.
     */
    constructor(ulList, inputSearch, request) {
        this.ulList = ulList;
        this.inputSearch = inputSearch;
        this.#request = {
            action: request,
        };
        this.ajax = new Request(this.#setingRequest);
    }
    init() {
        this.inputSearch.addEventListener('input', this.#debounced(this.#validation, 500));
    }
    /**
     * Czyści i zamyka listę wyszukanych elementów.
     */
    closeList() {
        this.ulList.classList.remove('on');
        this.#removeLI();
    }
    #validation = ({ target }) => {
        this.#validationSign(target.value) ? this.#badSign(1) : this.#searchInit(target);
    };
    #badSign(bool) {
        if (bool) {
            this.inputSearch.labels[0].style.color = 'red';
            this.inputSearch.labels[0].textContent = 'Tylko znaki alfabetu i cyfry';
            this.inputSearch.classList.add('errorSearch');
        } else {
            this.inputSearch.labels[0].style.color = '';
            this.inputSearch.labels[0].textContent = 'Wyszukaj i kliknij:';
            this.inputSearch.classList.remove('errorSearch');
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
        this.ajax
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
        this.ulList.appendChild(this.#listUser);
        this.ulList.classList.add('on');
    }
    #removeLI() {
        [...this.ulList.children].forEach((li) => li.remove());
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
