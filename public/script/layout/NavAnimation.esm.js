'use strict';
export class NavAnimation {
    constructor({ nav, pageUp, main }) {
        this.nav = nav;
        this.pageUp = pageUp;
        this.main = main;
        this.navPposition = this.nav.getClientRects()[0];
        this.main.style.paddingTop = `${this.navPposition.bottom.toFixed()}px`;
    }
    init() {
        window.addEventListener('scroll', this.#throttled(this.#sticky.bind(this), 90));
    }
    #sticky() {
        window.pageYOffset > this.navPposition.top.toFixed() ? this.#on() : this.#off();
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
