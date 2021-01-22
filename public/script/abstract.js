'use strict';
export {
    dataFetch,
    eventWindowScroll,
    displayException,
    catchException,
    pageLoadingStatus
};
const catchException = err => {
    return (err) ? true : false
}
/////// FETCH \\\\\\\ 
const dviException = ({
    type,
    exception
}) => {
    const div = document.createElement('div');
    div.classList.add('exception');
    div.innerHTML = `<p>Błąd Aplikacji ${type}</p><p>${exception}</p><div class="exception_img"></div>`;
    return div;
};

const displayException = data => {
    const mainContainer = document.querySelector('[data-page="main"]');
    mainContainer.appendChild(dviException(data));
    console.warn((data.file) ? `${data.file, data.line}` : data.code);
}

const dataFetch = async (url = '', data = {}) => {
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
        displayException(exception);
    };
};

const eventWindowScroll = fn => {
    window.addEventListener('scroll', fn);
};

const pageLoadingStatus = bool => {
    const statusIndicator = document.querySelector('[data-page="status_indicator"]');
    (bool) ? statusIndicator.classList.remove('load'): statusIndicator.classList.add('load');
}