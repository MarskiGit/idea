'use strict';
export default class Request {
    /**
     * Klasa obsługująca żądania Ajax.
     * @param {!object} seting Ustawienia Ajax wraz ze ścieżką do pliku.
     */
    constructor(seting) {
        this.opt = seting.ajax;
        this.url = seting.url;
    }
    /**
     *
     * @param {!object} request Parametry żądania dla serwera.
     * @returns Wyślij żądanie do serwera i zwróć wynik JSON.
     */
    async getJson(request) {
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
