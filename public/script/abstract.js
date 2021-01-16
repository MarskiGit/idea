'use strict';
export {
    dataFetch,
    eventWindowScroll,
    displayException,
    pageLoadingStatus
};
/////// FETCH \\\\\\\ 
const handleError = err => {
    console.warn(err);
    let resp = new Response(
        JSON.stringify({
            code: 400,
            message: 'Utrata połączenia. Spróbuj ponownie za parę chwil.'
        })
    );
    return resp;
};

const displayException = data => {
    const mainContainer = document.querySelector('[data-page="main"]');
    mainContainer.style.justifyContent = 'center';
    mainContainer.innerHTML = `<div class="exception"><p>${data.type} Błąd Aplikacji - Ajax</p> <p>${data.exception}</p><div class="exception_img"></div></div>`;
    console.warn(data.file, data.line);
}

const dataFetch = async (url = '', data = {}) => {
    const exception = {
        type: 'Ajax',
        exception: 'Utrata połączenia. Spróbuj ponownie za parę chwil.'
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

    const response = await fetch(url, opt).catch(handleError);
    const res = await response;

    return response.code && response.code == 400 ? displayException(exception) : res.json();

};

const eventWindowScroll = fn => {
    window.addEventListener('scroll', fn);
};

const pageLoadingStatus = bool => {
    const statusIndicator = document.querySelector('[data-page="status_indicator"]');
    (bool) ? statusIndicator.classList.remove('load'): statusIndicator.classList.add('load');
}