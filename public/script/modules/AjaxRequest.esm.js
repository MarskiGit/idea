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
    #Token;
    constructor(request) {
        this.#getRequest = request;
        this.#setingRequest = {
            ajax: {
                method: 'POST',
                mode: 'cors',
                cache: 'default',
                credentials: 'same-origin',
                headers: new Headers({
                    'X-CSRF-TOKEN': `${this.getCookie('csrftoken')}`,
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
        request.request = this.#getRequest;
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
    getCookie(name) {
        if (!document.cookie) {
            return null;
        }

        const xsrfCookies = document.cookie
            .split(';')
            .map((c) => c.trim())
            .filter((c) => c.startsWith(name + '-'));

        if (xsrfCookies.length === 0) {
            return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
    }
}
