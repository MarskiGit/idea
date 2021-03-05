'use strict';
export default class Exception {
    #exception = createElement('div');

    #dviException({ type, exception }) {
        this.#exception.classList.add('exception');
        div.innerHTML = `<p>Błąd Aplikacji ${type}</p><p>${exception}</p><div class="exception_img"></div>`;
        return div;
    }
    displayException(data) {
        document.appendChild(this.#dviException(data));
        console.warn(data.file ? `${data.file} ${data.line}` : data.code);
    }
}
