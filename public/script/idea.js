'use strict';
import {
    eventWindowScroll
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class NavAnimation {
        constructor() {
            this.nav = document.querySelector('[data-page="nav"]');
            this.pageUp = document.querySelector('[data-page="page_up"]');
            this.main = document.querySelector('[data-page="main"]')
            eventWindowScroll(this.sticky.bind(this));
        }
        sticky() {
            if (window.pageYOffset > this.nav.offsetTop) {
                this.nav.classList.add('sticky');
                this.main.style.paddingTop = `${this.nav.offsetHeight}px`;
                this.pageUp.style.display = "block";
            } else {
                this.nav.classList.remove('sticky');
                this.main.style.paddingTop = '0px';
                this.pageUp.style.display = "none";
            }
        };
    };


    const NAV = new NavAnimation();
});