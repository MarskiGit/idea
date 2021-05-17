'use strict';
export { setingRequest, localhost };

const setingRequest = {
    ajax: {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    },
    url: 'index.php',
};

const localhost = 'http://h.localhost/01_MOJE/01_CURRENT/idea/';
