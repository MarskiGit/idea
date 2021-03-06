'use strict';
export default class Exception {
    #domElement = document.createElement('div');
    #mainContainer = document.querySelector('[data-page="main"]');
    #exc = {
        type: 'Ajax',
        exception: 'Utrata połączenia. <p>Spróbuj ponownie za parę chwil.</p>',
    };
    #div({ type, exception }) {
        this.#domElement.classList.add('exception');
        this.#domElement.innerHTML = `<p>Błąd Aplikacji ${type}</p><p>${exception}</p><div class="exception_img"></div>`;
        return this.#domElement;
    }
    view(data) {
        this.#exc.code = `Error: ${data}`;
        this.#mainContainer.appendChild(this.#div(this.#exc));
        console.warn(data.file ? `${data.file} ${data.line}` : data.code);
    }
}
