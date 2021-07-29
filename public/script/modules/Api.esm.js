'use strict';
import Exception from './Exception.esm.js';

export default class Api {
    #setingRequest;
    #Exception;
    #exceptionMasage = {
        title: 'FILE NOT FOUND',
        type: 'AJAX ERROR:',
        is_ok: false,
    };
    #seting;
    #url;
    constructor() {
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
    async getJson(param) {
        this.#seting.body = JSON.stringify(param);

        const response = await fetch(this.#url, this.#seting).catch(this.#handleError);

        if (response.ok && response.status === 200) {
            const jsonData = await response.json();
            return this.#getData(jsonData);
        } else {
            this.#Exception.display(this.#exceptionMasage);
            return;
        }
    }
    #getData(data) {
        if ('api' in data && Boolean(data.api) && typeof data === 'object') {
            return data.data;
        } else {
            this.#Exception.display(data);
            return false;
        }
    }
    #handleError() {
        console.error(`${this.#exceptionMasage.type} : ${this.#exceptionMasage.title}`);
    }
    #getToken = () => document.querySelector('[name=csrf-token]').content;
}
