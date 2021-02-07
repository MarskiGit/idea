'use strict';
import {
    eventWindowScroll
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class NavAnimation {
        constructor() {
            this.nav = document.querySelector('[data-page="nav"]');
            this.navPposition = this.nav.getClientRects()[0];
            this.pageUp = document.querySelector('[data-page="page_up"]');
            this.main = document.querySelector('[data-page="main"]');
            this.main.style.paddingTop = `${this.navPposition.bottom.toFixed()}px`;
            eventWindowScroll(this.sticky);
        }
        sticky = () => {
            (window.pageYOffset > this.navPposition.top.toFixed()) ? this.on(): this.off();
        };
        on() {
            this.nav.classList.add('sticky');
            this.pageUp.style.display = "block";
        };
        off() {
            this.nav.classList.remove('sticky');
            this.pageUp.style.display = "none";
        };
    };

    const NAV = new NavAnimation();
});