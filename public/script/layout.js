'use strict';
import {
    eventWindowScroll
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class NavAnimation {
        constructor() {
            this.nav = document.querySelector('[data-page="nav"]');
            this.arrowUp = document.querySelector('[data-page="arrow_up"]');
            eventWindowScroll(this.sticky.bind(this));
        }
        sticky() {
            if (window.pageYOffset > this.nav.offsetTop) {
                this.nav.classList.add('sticky');
                this.arrowUp.style.display = "block";
            } else {
                this.nav.classList.remove('sticky');
                this.arrowUp.style.display = "none";
            }
        };
    };


    const NAV = new NavAnimation();
});