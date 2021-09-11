'use strict';
export default class NavSticky {
    #list;
    #nav;
    #main;
    #navPosition;
    #flagSticky = true;
    constructor({ list, nav, main }) {
        this.#nav = nav;
        this.#list = [...list.children];
        this.#main = main;
    }
    init() {
        this.#navPosition = this.#nav.getClientRects()[0];
        this.#main.style.paddingTop = `${this.#navPosition.bottom.toFixed()}px`;
        this.#eventListeners();
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#sticky.bind(this), 10));
    }
    #sticky() {
        if (window.pageYOffset > this.#navPosition.top.toFixed()) {
            if (this.#flagSticky) this.#on();
        } else {
            if (!this.#flagSticky) this.#off();
        }
    }
    #on() {
        this.#nav.classList.add('nav_sticky');
        this.#list.forEach((li) => {
            if (li.classList.contains('active_page')) {
                li.classList.add('sticky_active_page');
            } else {
                li.classList.add('blur');
            }
        });
        this.#flagSticky = !this.#flagSticky;
    }
    #off() {
        this.#nav.classList.remove('nav_sticky');
        this.#list.forEach((li) => {
            if (li.classList.contains('active_page')) {
                li.classList.remove('sticky_active_page');
            } else {
                li.classList.remove('blur');
            }
        });
        this.#flagSticky = !this.#flagSticky;
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}
