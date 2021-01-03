'use strict';
import {
    windowScroll
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class Nav {
        constructor() {
            this.nav = document.querySelector('nav');
            this.arrowUp = document.querySelector('.arrow_up');
            this.offset = this.nav.offsetTop;

            windowScroll(this.sticky.bind(this));
        }
        sticky() {
            if (window.pageYOffset > this.offset) {
                this.nav.classList.add('sticky');
                this.arrowUp.classList.remove('none');
            } else {
                this.nav.classList.remove('sticky');
                this.arrowUp.classList.add('none');
            }
        };
    };


    const NAV = new Nav();
});