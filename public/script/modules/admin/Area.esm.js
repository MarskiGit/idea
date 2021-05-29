'use strict';
import { setingRequest } from './modules/seting.esm.js';
import Request from './modules/Request.esm.js';

const formObjects = {
    isPassword: false,
    request: 'editIdea',
    form: document.querySelector('[data-form="idea"]'),
    errorMessage: document.querySelector('[data-form="idea_message"]'),
    viewPoints: document.querySelector('[data-form="view_points"]'),
    signNumber: document.querySelectorAll('[data-form="sign_number"]'),
};

class Area {
    constructor() {
        this.#Ajax = new Request(setingRequest);
    }
    init() {
        this.#eventListeners();
    }
    #sendRequest = () => {
        if (!this.#endTuples) {
            document.body.style.cursor = 'progress';
            this.#Ajax
                .getJson(this.#request)
                .then((data) => this.#check(data))
                .finally((document.body.style.cursor = 'default'));
        }
    };
}

new Area.init();
