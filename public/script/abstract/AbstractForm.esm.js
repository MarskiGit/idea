'use strict';
import FieldValidation from '../mod/FieldValidation.esm.js';
import Request from '../mod/Request.esm.js';

export default class AbstractForm {
    /**
     * Klasa abstrakcyjna do obsługi formularzy.
     * @param {!object} formObjects
     */
    constructor(formObjects) {
        this.setingRequest = {
            ajax: {
                method: 'POST',
                mode: 'cors',
                cache: 'no-store',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            },
            url: 'ajax.php',
        };
        this.formObjects = formObjects;
        this.formParams = {};
        this.Filed = new FieldValidation(this.formObjects);
        this.Request = new Request(this.setingRequest);
    }
    init() {
        this.Filed.init();
        this.eventListeners();
    }
    formError(flag) {
        this.formObjects.errorMessage.textContent = flag ? 'Uzupełnij wszystie pola' : '';
    }
    eventListeners() {
        this.formObjects.form.addEventListener('submit', this.formValidation);
    }
    clearField() {
        [...this.formObjects.form].filter((e) => 'INPUT' === e.nodeName || 'TEXTAREA' === e.nodeName).forEach((e) => (e.value = ''));
    }
}
