'use strict';
export default class RenderLi {
    #li = document.createElement('li');
    #id;
    #name;
    #status;
    /**
     *  Klasa renderująca listę HTML.
     * @param {!object} data Obiekt zawierający zestaw informacji potrzebny do wy renderowania listy
     */
    constructor({ id_account, id_area, full_name, area_name, ok = true }) {
        this.#status = ok ? 'creator_li' : '';
        this.#name = full_name || area_name;
        this.#id = id_account || id_area;
        this.#init();
    }
    /**
     * @returns Zwraca wy renderowany obiekt DOM z informacjami idea | Obiekt DOM.
     */
    getLi = () => this.#li;
    #init() {
        this.#li.setAttribute('class', 'view_li ' + this.#status);
        this.#li.setAttribute('data-id', `${this.#id}`);
        this.#li.innerText = `${this.#name}`;
    }
}
