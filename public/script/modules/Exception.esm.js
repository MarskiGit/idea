'use strict';
export default class Exception {
    #domElement = document.createElement('div');
    constructor() {}
    view(data) {
        document.body.appendChild(this.#div(data));
        if (typeof data.file !== 'undefined') console.error(data.file ? `${data.file} ${data.line}` : data.code);
    }
    #div({ type, statusText }) {
        this.#domElement.classList.add('exception');
        this.#domElement.innerHTML = `<p>Błąd Aplikacji </p><p>${type} ${statusText}</p><div class="exception_img"></div>`;
        return this.#domElement;
    }
}
