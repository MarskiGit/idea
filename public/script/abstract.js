'use strict';
export {
    eventWindowScroll,
    FetchAbstract
};


const eventWindowScroll = fn => {
    window.addEventListener('scroll', fn);
};

class FetchAbstract {
    constructor() {
        this.statusIndicator = document.querySelector('[data-page="status_indicator"]');
        this.div = document.createElement('div');
        this.mainContainer = document.querySelector('[data-page="main"]');
    };
    send() {
        this.pageLoadingStatus(1);
        this.dataFetch('ajax.php', this.request).then(data => {
            (data.exception) ? this.displayException(data): this.answer(data);
        }).finally(this.pageLoadingStatus(0));
    };
    async dataFetch(url = '', data = {}) {
        const exception = {
            type: 'Ajax',
            exception: 'Utrata połączenia. <p>Spróbuj ponownie za parę chwil.</p>'
        };
        const opt = {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        };

        const response = await fetch(url, opt)
        const res = await response;

        if (response.ok) {
            return res.json();
        } else {
            exception.code = `Error: ${response.status}`;
            this.displayException(exception);
        };
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
    displayException(data) {
        this.mainContainer.appendChild(this.dviException(data));
        console.warn((data.file) ? `${data.file} ${data.line}` : data.code);
    };
    pageLoadingStatus(bool) {
        (bool) ? this.statusIndicator.classList.remove('load'): this.statusIndicator.classList.add('load');
    };
};