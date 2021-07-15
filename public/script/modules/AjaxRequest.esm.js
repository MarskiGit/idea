'use strict';
import Exception from './Exception.esm.js';

export default class AjaxRequest {
    #setingRequest;
    #Exception;
    #status = {
        title: 'FILE NOT FOUND',
        type: 'AJAX ERROR:',
        is_ok: false,
    };
    #getRequest;
    #seting;
    #url;
    constructor(request) {
        this.#getRequest = request;
        this.#setingRequest = {
            ajax: {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: new Headers({
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': `${this.#getToken()}`,
                    'Content-Type': 'application/json; charset=utf-8',
                }),
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            },
            url: 'api.php',
        };
        this.#seting = this.#setingRequest.ajax;
        this.#url = this.#setingRequest.url;
        this.#Exception = new Exception();
    }
    async getJson(request) {
        if (!request.hasOwnProperty('request')) request.request = this.#getRequest;
        this.#seting.body = JSON.stringify(request);

        const response = await fetch(this.#url, this.#seting).catch(this.#handleError);
        const jsonStr = await response;

        if (response.ok && response.status === 200) {
            return jsonStr.json();
        } else {
            this.#Exception.view(this.#status);
            return;
        }
    }
    getData(data) {
        if ('api' in data && Boolean(data.api)) {
            return data.data;
        } else {
            console.log(data);
            this.#Exception.display(data);
            return false;
        }
    }
    #handleError() {
        console.log('coś dd zrobienia', this.#status);
    }
    #getToken = () => document.querySelector('[name=csrf-token]').content;
}
