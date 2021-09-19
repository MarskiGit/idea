'use strict';
export { TimeApp, handleRequestParams };

const TimeApp = (function () {
    return {
        /////// H:M:S \\\\\\\
        currentTime() {
            const d = new Date();
            let h = d.getHours(),
                m = d.getMinutes(),
                s = d.getSeconds();
            return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
        },
        /////// YYYY.MM.DD \\\\\\\
        today() {
            const d = new Date();
            (y = d.getFullYear()), (m = d.getMonth() + 1), (da = d.getDate());
            return `${y}/${m < 10 ? `0${m}` : m}/${da < 10 ? `0${da}` : da}`;
        },
        quarterYear() {
            const d = new Date();
            const month = d.getMonth() + 1;
            return Math.ceil(month / 3);
        },
        year() {
            const d = new Date();
            return Number(d.getFullYear());
        },
    };
})();

const handleRequestParams = function (req) {
    const Request = { request: req };
    let str = '';

    return {
        set: function (key, value) {
            if (typeof key === 'string') Request[key] = value;
        },
        getPost: function () {
            return Request;
        },
        getUrl: function () {
            str = '';
            for (let key in Request) str += `${key}=${Request[key]}&`;
            let url = str.slice(0, -1);
            return url;
        },
        getParam: function (key) {
            return Request[key];
        },
        deletePatam: function (key) {
            delete Request[key];
        },
    };
};

class Storage {
    getItems(name) {
        let data = null;
        let storage = localStorage.getItem(name) || null;
        if (storage) {
            data = JSON.parse(storage);
        }
        return data;
    }
    saveItems(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }
}
export const storage = new Storage();
