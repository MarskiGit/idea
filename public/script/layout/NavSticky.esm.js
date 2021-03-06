'use strict';
export default class NavSticky {
    constructor({ nav, pageUp, main }) {
        this.nav = nav;
        this.pageUp = pageUp;
        this.main = main;
    }
    init() {
        this.navPosition = this.nav.getClientRects()[0];
        this.main.style.paddingTop = `${this.navPosition.bottom.toFixed()}px`;
        this.#eventListeners();
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#sticky.bind(this), 90));
    }
    #sticky() {
        window.pageYOffset > this.navPosition.top.toFixed() ? this.#on() : this.#off();
    }
    #on() {
        this.nav.classList.add('sticky');
        this.pageUp.style.display = 'block';
    }
    #off() {
        this.nav.classList.remove('sticky');
        this.pageUp.style.display = 'none';
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}
