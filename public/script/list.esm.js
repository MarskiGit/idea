'use strict';
import Idea from './listIdea/Idea.esm.js';
import Exception from './mod/Exception.esm.js';
import Request from './mod/Request.esm.js';

class List {
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
    #request = {
        action: 'listIdea',
        last_tuple: 0,
    };
    #domObjects = {
        listContainer: document.querySelector('[data-list="list_container"]'),
    };
    #fragmentList = document.createDocumentFragment();
    #tupleNumbers = [];
    #endTuples = false;
    /**
     *  Klasa renderująca i obsługująca listę pomysłów w HTML.
     */
    constructor() {
        this.exception = new Exception();
        this.ajax = new Request(this.#setingRequest);
    }
    init() {
        this.#sendRequest();
        this.#eventListeners();
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#sendRequest, 950));
    }
    #sendRequest = () => {
        if (!this.#endTuples) {
            document.body.style.cursor = 'progress';
            this.ajax
                .getJson(this.#request)
                .then((data) => this.#check(data))
                .finally((document.body.style.cursor = 'default'));
        }
    };
    #check(data) {
        const status = data[0];
        if (status.ok) {
            data.shift();
            data.length ? this.#renderList(data) : this.#emptyList();
        } else {
            this.#domObjects.listContainer.classList.remove('idea_container');
            this.exception.view(status);
        }
    }
    #renderList(data) {
        for (const idea of data) {
            this.#fragmentList.appendChild(new Idea(idea).getIdea());
            this.#tupleNumbers.push(idea.id_idea);
        }
        this.#lastTuple();
        this.#addListPage();
    }
    #lastTuple() {
        if (this.#tupleNumbers.find((number) => parseInt(number, 10) === 1)) this.#endTuples = true;
        this.#request.last_tuple = Math.min(...this.#tupleNumbers);
    }
    #addListPage() {
        this.#domObjects.listContainer.appendChild(this.#fragmentList);
    }
    #emptyList() {
        const div = document.createElement('div');
        div.classList.add('IdeaList');
        div.innerHTML = '<h4 class="empty_idea">Brak elementów do wyświetlenia.</h4>';
        this.#domObjects.listContainer.appendChild(div);
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const LIST = new List();
    LIST.init();
});
