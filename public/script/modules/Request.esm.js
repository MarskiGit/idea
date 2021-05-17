'use strict';
export default class Request {
    constructor(setingRequest) {
        this.seting = setingRequest.ajax;
        this.url = setingRequest.url;
    }
    async getJson(request) {
        this.seting.body = JSON.stringify(request);

        const response = await fetch(this.url, this.seting).catch(this.#handleError);
        const res = await response;

        if (response.ok) {
            return res.json();
        } else {
            return [{ statusText: 'FILE NOT FOUND', type: 'AJAX ERROR:', ok: false }];
        }
    }
    #handleError(error) {
        console.log('coś dd zrobienia', error);
    }
}
