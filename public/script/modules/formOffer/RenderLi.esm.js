'use strict';
export default class RenderLi {
    #li = document.createElement('li');
    #id;
    #name;
    #status;
    constructor({ id_account, id_area, full_name, area_name }) {
        this.#status = id_account * 1 || id_area * 1 ? 'creator_li' : '';
        this.#name = full_name || area_name;
        this.#id = id_account || id_area;
        this.#init();
    }
    getLi = () => this.#li;
    #init() {
        this.#li.setAttribute('class', 'choose_li ' + this.#status);
        this.#li.setAttribute('data-id', `${this.#id}`);
        this.#li.innerText = `${this.#name}`;
    }
}
