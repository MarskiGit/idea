'use strict';
import Exception from './Exception.esm.js';

export default class Api {
    #setingRequest;
    #Exception;
    #status = {
        title: 'FILE NOT FOUND',
        type: 'AJAX ERROR:',
        is_ok: false,
    };
    #seting;
    #url;
    constructor(request) {
        this.requestParam = {
            request: request,
        };
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
    requestAPI = () => {
        document.body.style.cursor = 'progress';
        this.#getJson()
            .then((data) => {
                this.apiData = this.#getData(data);
                if (typeof this.apiData === 'object') this.responseAPI();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    async #getJson() {
        this.#seting.body = JSON.stringify(this.requestParam);

        const response = await fetch(this.#url, this.#seting).catch(this.#handleError);
        const jsonStr = await response;

        if (response.ok && response.status === 200) {
            return jsonStr.json();
        } else {
            this.#Exception.view(this.#status);
            return;
        }
    }
    #getData(data) {
        if ('api' in data && Boolean(data.api)) {
            return data.data;
        } else {
            this.#Exception.display(data);
            return false;
        }
    }
    #handleError() {
        console.log('coś dd zrobienia', this.#status);
    }
    #getToken = () => document.querySelector('[name=csrf-token]').content;
}
