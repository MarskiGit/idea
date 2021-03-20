'use strict';
export default class Request {
    constructor(option) {
        this.opt = option.ajax;
        this.url = option.url;
    }
    async dataJson(request) {
        this.opt.body = JSON.stringify(request);

        const response = await fetch(this.url, this.opt).catch(this.#handleError);
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
