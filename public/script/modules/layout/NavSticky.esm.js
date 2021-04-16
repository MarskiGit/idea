'use strict';
export default class NavSticky {
    /**
     * Klasa animacji menu.
     * @param {!object} param0  Zestaw obiektów DOM — destukturyzacja
     */
    constructor({ home, nav, pageUp, main }) {
        this.homeImg = [...home.children];
        this.nav = nav;
        this.pageUp = pageUp;
        this.main = main;
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.navPosition = this.nav.getClientRects()[0];
        this.main.style.paddingTop = `${this.navPosition.bottom.toFixed()}px`;
        this.#eventListeners();
    }
    #eventListeners() {
        window.addEventListener('scroll', this.#throttled(this.#sticky.bind(this), 10));
    }
    #sticky() {
        window.pageYOffset > this.navPosition.top.toFixed() ? this.#on() : this.#off();
    }
    #on() {
        this.nav.classList.add('nav_sticky');
        this.homeImg.forEach((img) => img.classList.add('filter'));
        this.pageUp.style.display = 'block';
    }
    #off() {
        this.nav.classList.remove('nav_sticky');
        this.homeImg.forEach((img) => img.classList.remove('filter'));
        this.pageUp.style.display = 'none';
    }
    #throttled(f, t) {
        let l = Date.now();
        return () => {
            l + t - Date.now() < 0 && (f(), (l = Date.now()));
        };
    }
}
