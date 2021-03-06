'use strict';
export default class Exception {
    #domElement = document.createElement('div');
    constructor(element = 0) {
        this.domObject = element;
    }
    #div({ type, statusText }) {
        this.#domElement.classList.add('exception');
        this.#domElement.innerHTML = `<p>Błąd Aplikacji </p><p>${
            type === 'basic' ? 'File' : type
        } ${statusText}</p><div class="exception_img"></div>`;
        return this.#domElement;
    }
    view(data) {
        if (this.domObject !== 0) this.domObject.remove();
        document.body.appendChild(this.#div(data));
        if (typeof data.file !== 'undefined') console.error(data.file ? `${data.file} ${data.line}` : data.code);
    }
}
