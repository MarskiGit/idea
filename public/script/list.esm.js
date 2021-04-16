'use strict';
import Idea from './modules/listIdea/Idea.esm.js';
import Exception from './modules//Exception.esm.js';
import Request from './modules//Request.esm.js';

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
        this.Exception = new Exception();
        this.Ajax = new Request(this.#setingRequest);
    }
    /**
     * Metoda inicjująca.
     */
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
            this.Ajax.getJson(this.#request)
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
            this.Exception.view(status);
        }
    }
    #renderList(data) {
        for (const idea of data) {
            this.#fragmentList.appendChild(new Idea(idea).getIdea());
            this.#tupleNumbers.push(parseInt(idea.id_idea, 10));
        }
        this.#findLastTuple();
        this.#addListPage();
    }
    #findLastTuple() {
        if (this.#tupleNumbers.find((number) => number === 1)) this.#endTuples = true;
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
    new List().init();
});
