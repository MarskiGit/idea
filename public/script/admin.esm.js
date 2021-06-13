'use strict';
import { localhost } from './modules/seting.esm.js';
import FormAreaHandling from './modules/admin/FormAreaHandling.esm.js';
import FormAccountHandling from './modules/admin/FormAccountHandling.esm.js';

const adminObjects = {
    setTime: document.querySelector('[data-time]'),
    viewCountdown: document.querySelector('[data-time="countdown"]'),
    url: '?action=logout',
};

const areaObjects = {
    request: 'addArea',
    form: document.querySelector('[data-form="area"]'),
    errorMessage: document.querySelector('[data-form="area_message"]'),
};
const userObjects = {
    request: 'addUser',
    form: document.querySelector('[data-form="account"]'),
    errorMessage: document.querySelector('[data-form="account_message"]'),
};

class Admin {
    #adminObjects;
    #time;
    #test;
    constructor(adminObjects) {
        this.#adminObjects = adminObjects;
        this.#time = this.#adminObjects.setTime.getAttribute('data-time');
    }
    init() {
        this.#factory();
        this.#timeSession();
        this.#eventListeners();
    }
    #eventListeners() {
        document.addEventListener('mousemove', this.#debounced(this.#timeSession, 1000));
    }
    #factory() {
        if (areaObjects.form) {
            new FormAreaHandling(areaObjects).init();
        }
        if (userObjects.form) {
            new FormAccountHandling(userObjects).init();
        }
    }
    #timeSession(duration) {
        if (this.#test) clearInterval(this.#test);
        let countdown = 60 * 5,
            minutes,
            seconds;
        this.#test = setInterval(() => {
            minutes = parseInt(countdown / 60, 10);
            seconds = parseInt(countdown % 60, 10);

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            this.#adminObjects.viewCountdown.textContent = minutes + ':' + seconds;

            if (--countdown < 0) {
                countdown = duration;
                const url = new URL(`${localhost}`);
                const params = { action: 'logout' };
                url.search = new URLSearchParams(params).toString();
                fetch(url).then(() => location.replace(localhost));
            }
        }, 1000);
    }
    #debounced(f, t) {
        let l;
        return (...a) => {
            const c = this;
            clearTimeout(l), (l = setTimeout(() => f.apply(c, a), t));
        };
    }
}

new Admin(adminObjects).init();
