'use strict';
import ValidationForm from './abstract/ValidationForm.esm.js';
import Rating from './write/Rating.esm.js';
import ChosenOnes from './write/ChosenOnes.esm.js';
import LiveSearch from './write/LiveSearch.esm.js';
import NumberCharacters from './write/NumberCharacters.esm.js';

class Write extends ValidationForm {
    #params = {
        action: 'ideaWrite',
    };
    /**
     * Fabryka odpowiedzialna za formularz IDEA.
     * Dziedziczy z ValidationForm.
     * @param {!object} formObjects Obiekt z elementami formularza.
     * @param {!object} userSearch Obiekt z elementami DOM wyszukiwania Live użytkowników.
     * @param {!object} areaSearch Obiekt z elementami DOM wyszukiwania Live obszarów.
     */
    constructor(formObjects, userSearch, areaSearch) {
        super(formObjects);
        this.UserSearch = new LiveSearch(userSearch.ulList, userSearch.inputSearch, userSearch.request);
        this.AreaSearch = new LiveSearch(areaSearch.ulList, areaSearch.inputSearch, areaSearch.request);
        this.UserOnes = new ChosenOnes(userSearch.ulList, userSearch.chosenOnes);
        this.AreaOnes = new ChosenOnes(areaSearch.ulList, areaSearch.chosenOnes);
        this.NumberLenght = new NumberCharacters(formObjects.textAreas);
        this.Rating = new Rating(formObjects.form, formObjects.viewPoints);
    }
    /**
     * Metoda inicjująca.
     */
    init() {
        super.init();
        this.UserSearch.init();
        this.AreaSearch.init();
        this.UserOnes.init();
        this.AreaOnes.init();
        this.NumberLenght.init();
        this.Rating.init();
        this.#eventListeners();
    }
    /**
     * Walidacja formularza.
     * @param {!object} event Obiekt zdarzenia submit.
     */
    formValidation = (event) => {
        event.preventDefault();

        if (this.#emptyForm()) {
            this.#getParamsForm();
            this.#clearForm();
        } else {
            this.formError();
        }
    };
    #eventListeners() {}
    /**
     * Czyści wejścia w formularzu.
     */
    #clearForm() {
        this.clearField();
        this.UserSearch.closeList();
        this.AreaSearch.closeList();
        this.UserOnes.closeSelectedList();
        this.AreaOnes.closeSelectedList();
    }
    /**
     * Pobiera dane z formularza.
     */
    #getParamsForm() {
        const { before, after } = this.getValue();
        this.#params.before = before;
        this.#params.after = after;
        this.#params.area = this.AreaOnes.takeChosenOnes();
        this.#params.user = this.UserOnes.takeChosenOnes();
        this.#params.pint = this.Rating.getPoints();
        this.#params.saving = this.Rating.getValueString();

        console.log(this.#params);
    }
    /**
     *
     * @returns Zwraca informację czy pola formularza są wypełnione.
     */
    #emptyForm = () => !!(this.emptyFields() && this.UserOnes.whetherListCompleted() && this.AreaOnes.whetherListCompleted());
}

document.addEventListener('DOMContentLoaded', function () {
    const formObjects = {
        registration: false,
        form: document.querySelector('[data-write="form"]'),
        errorMessage: document.querySelector('[data-write="form_error"]'),
        textAreas: document.querySelectorAll('textarea'),
        viewPoints: document.querySelector('[data-write="view_points"]'),
    };
    const userSearch = {
        ulList: document.querySelector('[data-write="ul_creator"]'),
        chosenOnes: document.querySelector('[data-write="chosen_ones"]'),
        inputSearch: document.querySelector('[data-write="creator_search"]'),
        request: 'creatorSearch',
    };
    const areaSearch = {
        ulList: document.querySelector('[data-write="ul_area"]'),
        chosenOnes: document.querySelector('[data-write="chosen_ones_area"]'),
        inputSearch: document.querySelector('[data-write="area_search"]'),
        request: 'areaSearch',
    };

    new Write(formObjects, userSearch, areaSearch).init();
});
