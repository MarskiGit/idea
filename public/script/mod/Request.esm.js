'use strict';
import Exception from './Exception.esm.js';
export default class Request {
    #url = 'ajax.php';
    constructor(option) {
        this.opt = option;
        this.exception = new Exception();
    }
    async dataJson(request) {
        this.opt.body = JSON.stringify(request);

        const response = await fetch(this.#url, this.opt);
        const res = await response;

        if (response.ok) return res.json();
        // this.exception.view(response.status);
    }
}
