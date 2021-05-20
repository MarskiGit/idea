'use strict';
import FormValidation from './FormValidation.esm.js';
import Request from './Request.esm.js';

export default class Registration {
    #Ajax;
    #inputList;
    #params;
    #request = {};
    constructor(formObjects, setingRequest) {
        this.FormValidation = new FormValidation(formObjects);
        this.errorMessage = formObjects.errorMessage;
        this.#params = formObjects.request;

        this.#Ajax = new Request(setingRequest);
        this.#inputList = this.FormValidation.getInputs(['INPUT']);
    }

    init() {
        this.FormValidation.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.FormValidation.form.addEventListener('submit', this.#formHandling);
    }
    #formHandling = (event) => {
        event.preventDefault();
        if (this.FormValidation.emptyFields()) {
            const { strength = 3, identical = true } = this.FormValidation.getInfoPass();
            if (strength === 3) {
                if (identical) {
                    document.body.style.cursor = 'progress';
                    this.#request = {
                        request: this.#params,
                        ...this.FormValidation.getValue(),
                    };

                    console.log(this.#request);
                    // this.#Ajax
                    //     .getJson(this.#request)
                    //     .then((data) => {
                    //         if (data.ok === true) {
                    //             this.FormValidation.clearField();
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
    $showMasage(messafe) {
        this.errorMessage.textContent = `${messafe}`;
        this.FormValidation.formError();
    }
}
