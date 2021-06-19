'use strict';
import { localhost } from './modules/seting.esm.js';

class CountDown {
    #viewCountdown;
    #setInt;
    #url;
    #params;
    constructor() {
        this.#viewCountdown = document.querySelector('[data-time="countdown"]');
        this.#url = new URL(`${localhost}`);
        this.#params = { action: 'logout' };
        this.#url.search = new URLSearchParams(this.#params).toString();
    }
    init() {
        this.#timeSession();
        this.#eventListeners();
    }
    #eventListeners() {
        document.addEventListener('mousemove', this.#throttled(this.#timeSession, 1000));
    }
    #timeSession = () => {
        if (this.#setInt) clearInterval(this.#setInt);
        let countdown = 300,
            minutes,
            seconds;
        this.#setInt = setInterval(() => {
            minutes = parseInt(countdown / 60, 10);
            seconds = parseInt(countdown % 60, 10);

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            this.#viewCountdown.textContent = `${minutes}:${seconds}`;

            this.#pulsate(countdown);
            if (countdown < 0) this.#logOut();
            --countdown;
        }, 1000);
    };
    #pulsate(countdown) {
        let pulsate = this.#viewCountdown.classList.contains('pulsate');
        if (countdown < 30 && !pulsate) {
            this.#viewCountdown.classList.add('pulsate');
        } else if (countdown > 30 && pulsate) {
            this.#viewCountdown.classList.remove('pulsate');
        }
    }
    #logOut() {
        fetch(this.#url).then(() => location.replace(localhost));
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}

new CountDown().init();
