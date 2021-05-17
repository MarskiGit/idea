'use strict';
import FormHandling from './FormHandling.esm.js';
import Request from './Request.esm.js';

export default class Registration {
    #Ajax;
    #inputList;
    #params;
    #request = {};

    /**
     * Obsługa formularza rejestracji.
     * Dziedziczy z FormHandling.
     * @param {!object} formObjects Obiekt z elementami DOM formularza.
     * @param {!object} setingRequest Obiekt z elementami ustawień dla Ajax.
     */
    constructor(formObjects, setingRequest) {
        this.FormHandling = new FormHandling(formObjects);
        this.errorMessage = formObjects.errorMessage;
        this.#params = formObjects.request;

        this.#Ajax = new Request(setingRequest);
        this.#inputList = this.FormHandling.getInputs(['INPUT']);
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.FormHandling.init();
        this.#onBlur();
        this.#eventListeners();
    }
    #eventListeners() {
        this.FormHandling.form.addEventListener('submit', this.#formValidation);
    }
    /**
     * Walidacja formularza.
     * @param {!object} event Obiekt zdarzenia submit.
     */
    #formValidation = (event) => {
        event.preventDefault();
        if (this.FormHandling.emptyFields()) {
            const { strength = 3, identical = true } = this.FormHandling.getInfoPass();
            if (strength === 3) {
                if (identical) {
                    document.body.style.cursor = 'progress';
                    this.#request = {
                        request: this.#params,
                        ...this.FormHandling.getValue(),
                    };

                    console.log(this.#request);
                    // this.#Ajax
                    //     .getJson(this.#request)
                    //     .then((data) => {
                    //         if (data.ok === true) {
                    //             this.FormHandling.clearField();
                    //             this.$showMasage('Dodano z powodzeniem');
                    //         } else {
                    //             this.$showMasage(`${data.title}: ${data.account}`);
                    //         }
                    //     })
                    //     .finally((document.body.style.cursor = 'default'));
                } else this.$showMasage('Zastosuj takie same hasła');
            } else this.$showMasage('Hasło musi być silne');
        } else this.$showMasage('Uzupełnij wszystkie pola.');
    };
    #onBlur() {
        this.#inputList.forEach((i) => i.addEventListener('blur', this.#inputOnBlur));
    }
    #inputOnBlur(event) {
        event.target.value ? this.classList.add('has-val') : this.classList.remove('has-val');
    }
    $showMasage(messafe) {
        this.errorMessage.textContent = `${messafe}`;
        this.FormHandling.formError();
    }
}
