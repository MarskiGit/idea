'use strict';
export default class Exception {
    #domElement;
    constructor() {
        this.#domElement = document.createElement('aside');
    }
    view(error) {
        const { type, title, file, line } = error;
        this.#domElement.classList.add('exception');
        this.#domElement.innerHTML = `<p>Błąd Aplikacji </p><p>${type}: ${title}</p><div class="exception_img"></div>`;
        document.body.appendChild(this.#domElement);

        if (typeof file !== 'undefined') console.error(file ? `${file} ${line}` : error.code);
    }
}
