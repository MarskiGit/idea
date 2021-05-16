'use strict';

const homeObjects = {
    message: document.querySelector('[data-js="private"]'),
};

class Private {
    #message;
    constructor(homeObjects) {
        this.#message = homeObjects.message;
        this.#hide();
    }
    #hide() {
        this.#message.style.display = 'none';
    }
}

new Private(homeObjects);
