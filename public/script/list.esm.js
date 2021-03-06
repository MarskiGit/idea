'use strict';
import ViewList from './list/ViewList.esm.js';
import Exception from './mod/Exception.esm.js';
import Request from './mod/Request.esm.js';

class Idea {
    #request = {
        action: 'listIdea',
    };
    #optionRequest = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    constructor() {
        this.domObjects = {
            listContainer: document.querySelector('[data-idea="idea_container"]'),
        };
        this.exception = new Exception();
        this.ajax = new Request(this.#optionRequest);
        this.list = new ViewList(this.domObjects);
    }
    init() {
        this.#request.last_tuple = this.list.lastTuple;
        this.#sendRequest();
        this.#eventListeners();
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#sendRequest.bind(this), 950));
    }
    #sendRequest() {
        if (!this.list.endTuples) {
            this.#request.last_tuple = this.list.lastTuple;
            this.ajax.dataJson(this.#request).then((data) => {
                data.exception ? this.exception.view(data) : this.list.createList(data);
            });
        }
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const IDEA = new Idea();
    IDEA.init();
});
