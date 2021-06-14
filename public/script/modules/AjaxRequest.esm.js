'use strict';
import Exception from './Exception.esm.js';

const setingRequest = {
    ajax: {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    },
    url: 'index.php',
};

export default class AjaxRequest {
    #Exception;
    #status = {
        title: 'FILE NOT FOUND',
        type: 'AJAX ERROR:',
        is_ok: false,
    };
    #getRequest;
    #seting;
    #url;
    #Token;
    constructor(request) {
        this.#getRequest = request;
        this.#Exception = new Exception();
        this.#seting = setingRequest.ajax;
        this.#url = setingRequest.url;
        this.#Token = document.body.getAttribute('data-token');
    }
    async getJson(request) {
        request.request = this.#getRequest;
        request.token = this.#Token;
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
