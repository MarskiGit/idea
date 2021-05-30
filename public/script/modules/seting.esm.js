'use strict';
export { setingRequest, localhost, time, today };

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

/////// CURRENT TIME H:M \\\\\\\
const time = () => {
    const d = new Date();
    let h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds();
    return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};
/////// TODAY'S DATE YYYY.MM.DD \\\\\\\
const today = () => {
    const d = new Date(),
        y = d.getFullYear(),
        m = d.getMonth() + 1,
        da = d.getDate();
    return `${y}/${m < 10 ? `0${m}` : m}/${da < 10 ? `0${da}` : da}`;
};
