'use strict';
export {
    dataFetch,
    windowScroll,
    ajaxException
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

const dataFetch = async (url = '', data = {}) => {
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

    return response.code && response.code == 400 ? onsole.log("AJAX CODE 400") : res.json();

};

const windowScroll = fn => {
    window.addEventListener('scroll', fn);

};

const ajaxException = data => {
    const main = document.querySelector('main');
    if (data.exception) {
        main.style.justifyContent = 'center';
        main.innerHTML = `<div class="exception"><p>${data.type} Błąd Aplikacji - Ajax</p> <p>${data.exception}</p><div class="exception_img"></div></div>`;
        console.log(data.file, data.line);
        return 0;
    } else {
        return 1
    }
}