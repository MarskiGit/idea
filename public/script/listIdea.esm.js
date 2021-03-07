'use strict';
import RenderList from './listIdea/RenderList.esm.js';
import Exception from './mod/Exception.esm.js';
import Request from './mod/Request.esm.js';

class ListIdea {
    #request = {
        action: 'listIdea',
        last_tuple: 0,
    };
    #tuple = { lastTuple: null, endTuples: false };
    #optionRequest = {
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
    constructor() {
        this.domObjects = {
            listContainer: document.querySelector('[data-idea="idea_container"]'),
        };
        this.exception = new Exception(this.domObjects.listContainer);
        this.ajax = new Request(this.#optionRequest);
    }
    init() {
        this.#sendRequest();
        this.#eventListeners();
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#sendRequest.bind(this), 950));
    }
    #sendRequest() {
        if (!this.#tuple.endTuples) {
            document.body.style.cursor = 'progress';
            this.ajax
                .dataJson(this.#request)
                .then((data) => this.#checkData(data))
                .finally((document.body.style.cursor = 'default'));
        }
    }
    #checkData(data) {
        if (typeof data !== 'undefined') {
            if (data.statusText) {
                this.exception.view(data);
            } else {
                const listIdea = new RenderList(data);
                this.#addListPage(listIdea.add());
                this.#tuple = listIdea.tuple();
                this.#request.last_tuple = this.#tuple.lastTuple;
            }
        } else {
            this.domObjects.listContainer.remove();
        }
    }
    #addListPage(list) {
        this.domObjects.listContainer.appendChild(list);
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const LIST_IDEA = new ListIdea();
    LIST_IDEA.init();
});
