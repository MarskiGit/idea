'use strict';
import { localhost } from './modules/seting.esm.js';

class CountDown {
    #viewCountdown;
    #setInt;
    constructor(adminObjects) {
        this.#viewCountdown = document.querySelector('[data-time="countdown"]');
    }
    init() {
        this.#timeSession();
        this.#eventListeners();
    }
    #eventListeners() {
        document.addEventListener('mousemove', this.#throttled(this.#timeSession, 1000));
    }
    #timeSession = (duration) => {
        if (this.#setInt) clearInterval(this.#setInt);
        let countdown = 60 * 5,
            minutes,
            seconds;
        this.#setInt = setInterval(() => {
            minutes = parseInt(countdown / 60, 10);
            seconds = parseInt(countdown % 60, 10);

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            this.#viewCountdown.textContent = minutes + ':' + seconds;

            if (--countdown < 0) {
                countdown = duration;
                const url = new URL(`${localhost}`);
                const params = { action: 'logout' };
                url.search = new URLSearchParams(params).toString();
                fetch(url).then(() => location.replace(localhost));
            }
        }, 1000);
    };
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}

new CountDown().init();
