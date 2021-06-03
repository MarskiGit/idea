'use strict';
import Exception from './Exception.esm.js';
export default class Request {
    #Exception;
    #status = {
        title: 'FILE NOT FOUND',
        type: 'AJAX ERROR:',
        is_ok: false,
    };
    #seting;
    #url;
    constructor(setingRequest) {
        this.#Exception = new Exception();
        this.#seting = setingRequest.ajax;
        this.#url = setingRequest.url;
    }
    async getJson(request) {
        this.#seting.body = JSON.stringify(request);

        const response = await fetch(this.#url, this.#seting).catch(this.#handleError);
        const res = await response;

        if (response.ok && response.status === 200) {
            return res.json();
        } else {
            this.#Exception.view(this.#status);
            return;
        }
    }
    #handleError() {
        console.log('coś dd zrobienia', this.#status);
    }
    getData(data) {
        const is_API = data.api;
        if (is_API) {
            return data.data;
        } else {
            this.#Exception.view(data);
            return {};
        }
    }
}
