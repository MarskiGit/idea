'use strict';
document.addEventListener('DOMContentLoaded', function () {

    class NavAnimation {
        constructor() {
            this.nav = document.querySelector('[data-page="nav"]');
            this.navPposition = this.nav.getClientRects()[0];
            this.pageUp = document.querySelector('[data-page="page_up"]');
            this.main = document.querySelector('[data-page="main"]');
            this.main.style.paddingTop = `${this.navPposition.bottom.toFixed()}px`;
            window.addEventListener('scroll', this.throttled(this.sticky.bind(this), 90));
        }
        sticky() {
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
        throttled(f, t) {
            let l = Date.now();
            return () => {
                l + t - Date.now() < 0 && (f(), l = Date.now());
            };
        };
    };

    const NAV = new NavAnimation();
});