'use strict';
import Exception from './Exception.esm.js';
export default class Request {
    constructor(option) {
        this.opt = option.ajax;
        this.url = option.url;
        this.exception = new Exception();
    }
    async dataJson(request) {
        this.opt.body = JSON.stringify(request);

        const response = await fetch(this.url, this.opt);
        const res = await response;

        if (response.ok) {
            return res.json();
        } else {
            this.exception.view(response);
        }
    }
}
