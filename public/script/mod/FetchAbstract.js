'use strict';
export default class FetchAbstract {
    constructor() {
        this.statusIndicator = document.querySelector('[data-page="status_indicator"]');
        this.div = document.createElement('div');
        this.mainContainer = document.querySelector('[data-page="main"]');
        this.opt = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };
        this.exc = {
            type: 'Ajax',
            exception: 'Utrata połączenia. <p>Spróbuj ponownie za parę chwil.</p>'
        };
        this.url = 'ajax.php';
    };
    sendRequest() {
        this.dataLoadingStatus(1);
        this.dataFetch().then(data => {
            (data.exception) ? this.displayException(data): this.answerFetch(data);
        }).finally(this.dataLoadingStatus(0));
    };
    async dataFetch() {
        this.opt.body = JSON.stringify(this.request);

        const response = await fetch(this.url, this.opt);
        const res = await response;

        if (response.ok) return res.json();
        this.exc.code = `Error: ${response.status}`;
        this.displayException(this.exc);

    };
    displayException(data) {
        this.mainContainer.appendChild(this.dviException(data));
        console.warn((data.file) ? `${data.file} ${data.line}` : data.code);
    };
    dviException({
        type,
        exception
    }) {
        const div = document.createElement('div');
        div.classList.add('exception');
        div.innerHTML = `<p>Błąd Aplikacji ${type}</p><p>${exception}</p><div class="exception_img"></div>`;
        return div;
    };
    dataLoadingStatus(bool) {
        (bool) ? this.statusIndicator.classList.remove('load'): this.statusIndicator.classList.add('load');
    };

};