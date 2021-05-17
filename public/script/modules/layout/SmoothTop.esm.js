'use strict';
export default class SmoothTop {
    #targetPosition = 0;
    #duration = 750;
    constructor() {}
    animation() {
        this.startPosition = window.pageYOffset;
        this.distance = this.#targetPosition - this.startPosition;
        this.start = null;

        requestAnimationFrame(this.#step);
    }
    #step = (timestamp) => {
        if (!this.start) this.start = timestamp;
        const progress = timestamp - this.start;
        this.#toUp(progress);
        if (progress < this.#duration) requestAnimationFrame(this.#step);
    };
    #toUp(progress) {
        window.scrollTo(0, this.#easeInOutCubic(progress, this.startPosition, this.distance, this.#duration));
    }
    #easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
    }
}
