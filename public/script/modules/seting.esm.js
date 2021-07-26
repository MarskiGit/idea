'use strict';
export { Config, TimeApp };

const Config = Object.create(
    {},
    {
        localhost: {
            value: 'http://h.localhost/01_MOJE/01_CURRENT/idea/',
            writable: false,
            configurable: false,
        },
    }
);

const TimeApp = (function () {
    const d = new Date();
    return {
        /////// H:M:S \\\\\\\
        currentTime() {
            let h = d.getHours(),
                m = d.getMinutes(),
                s = d.getSeconds();
            return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
        },
        /////// YYYY.MM.DD \\\\\\\
        today() {
            (y = d.getFullYear()), (m = d.getMonth() + 1), (da = d.getDate());
            return `${y}/${m < 10 ? `0${m}` : m}/${da < 10 ? `0${da}` : da}`;
        },
        quarterYear() {
            const month = d.getMonth() + 1;
            return Math.ceil(month / 3);
        },
    };
})();
