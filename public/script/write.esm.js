'use strict';
import FormHandling from './modules/FormHandling.esm.js';
import Rating from './modules/write/Rating.esm.js';
import LiveSearch from './modules/write/LiveSearch.esm.js';
import CountCharacters from './modules/write/CountCharacters.esm.js';
import Request from './modules/Request.esm.js';

class Write {
    #Request;
    #request = {
        action: 'ideaWrite',
    };
    #setingRequest = {
        ajax: {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        },
        url: 'ajax.php',
    };
    #inputSearch;
    /**
     * Fabryka odpowiedzialna za formularz IDEA.
     * @param {!object} formObjects Obiekt z elementami formularza.
     * @param {!object} userSearch Obiekt z elementami DOM wyszukiwania Live użytkowników.
     * @param {!object} areaSearch Obiekt z elementami DOM wyszukiwania Live obszarów.
     */
    constructor(formObjects, userSearch, areaSearch) {
        this.FormHandling = new FormHandling(formObjects);

        this.#inputSearch = this.FormHandling.getInputs(['INPUT'], 'search');

        this.UserSearch = new LiveSearch(this.#inputSearch[0], userSearch);
        this.AreaSearch = new LiveSearch(this.#inputSearch[1], areaSearch);

        this.CountCharacters = new CountCharacters(this.FormHandling.getInputs(['TEXTAREA']), formObjects.signNumber);
        this.Rating = new Rating(this.FormHandling.getInputs(['SELECT']), formObjects.viewPoints);

        this.#Request = new Request(this.#setingRequest);
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        this.FormHandling.init();
        this.UserSearch.init();
        this.AreaSearch.init();
        this.CountCharacters.init();
        this.Rating.init();
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

        if (this.#emptyForm()) {
            this.#getrequestForm();
            this.#clearForm();
        } else {
            this.FormHandling.formError();
        }
    };
    /**
     * Czyści wejścia w formularzu.
     */
    #clearForm() {
        this.FormHandling.clearField();
        this.CountCharacters.clearLenghtCharacters();
        this.Rating.setDefault();
        this.UserSearch.closeList();
        this.UserSearch.clearChosen();
        this.AreaSearch.closeList();
        this.AreaSearch.clearChosen();
    }
    /**
     * Pobiera dane z formularza.
     */
    #getrequestForm() {
        const { before, after } = this.FormHandling.getValue();
        this.#request.before = before;
        this.#request.after = after;
        this.#request.area = this.UserSearch.getSelectedId();
        this.#request.user = this.AreaSearch.getSelectedId();
        this.#request.pint = this.Rating.getPoints();
        this.#request.saving = this.Rating.getValueString();

        console.log(this.#request);
    }
    /**
     *
     * @returns Zwraca informację czy pola formularza są wypełnione.
     */
    #emptyForm = () => !!(this.FormHandling.emptyFields() && this.UserSearch.whetherListCompleted() && this.AreaSearch.whetherListCompleted());
}

document.addEventListener('DOMContentLoaded', function () {
    const formObjects = {
        registration: false,
        form: document.querySelector('[data-write="form"]'),
        errorMessage: document.querySelector('[data-write="form_error"]'),
        viewPoints: document.querySelector('[data-write="view_points"]'),
        signNumber: document.querySelectorAll('[data-write="sign_number"]'),
    };
    const userSearch = {
        listResults: document.querySelector('[data-write="ul_creator"]'),
        selectedList: document.querySelector('[data-write="chosen_ones"]'),
        request: 'creatorSearch',
    };
    const areaSearch = {
        listResults: document.querySelector('[data-write="ul_area"]'),
        selectedList: document.querySelector('[data-write="chosen_ones_area"]'),
        request: 'areaSearch',
    };

    new Write(formObjects, userSearch, areaSearch).init();
});
