'use strict';
import AbstractForm from './abstract/AbstractForm.esm.js';
import CalculatePoints from './write/CalculatePoints.esm.js';
import ChosenOnes from './write/ChosenOnes.esm.js';
import LiveSearch from './write/LiveSearch.esm.js';
import NumberCharacters from './write/NumberCharacters.esm.js';

class Write extends AbstractForm {
    constructor(formObjects, userSearch, areaSearch) {
        super(formObjects);
        this.UserSearch = new LiveSearch(userSearch.view, userSearch.inputSearch, userSearch.request);
        this.AreaSearch = new LiveSearch(areaSearch.view, areaSearch.inputSearch, areaSearch.request);
        this.UserOnes = new ChosenOnes(userSearch.view, userSearch.chosenOnes);
        this.AreaOnes = new ChosenOnes(areaSearch.view, areaSearch.chosenOnes);
        this.NumberLenght = new NumberCharacters(formObjects.textAreas);
        this.Calculatepoints = new CalculatePoints(formObjects.form, formObjects.viewPoints);
    }
    init() {
        super.init();
        this.UserSearch.init();
        this.AreaSearch.init();
        this.UserOnes.init();
        this.AreaOnes.init();
        this.NumberLenght.init();
        this.Calculatepoints.init();
        this.#eventListeners();
    }
    #eventListeners() {}
    formValidation = (event) => {
        event.preventDefault();
        if (this.Filed.emptyFields()) {
            this.formError(false);
            this.formParams = this.Filed.getValue();
            this.clearField();
            console.log(this.formParams);
        } else {
            this.formError(true);
        }
    };
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
        view: document.querySelector('[data-write="view_creator"]'),
        chosenOnes: document.querySelector('[data-write="chosen_ones"]'),
        inputSearch: document.querySelector('[data-write="creator_search"]'),
        request: 'creatorSearch',
    };
    const areaSearch = {
        view: document.querySelector('[data-write="view_area"]'),
        chosenOnes: document.querySelector('[data-write="chosen_ones_area"]'),
        inputSearch: document.querySelector('[data-write="area_search"]'),
        request: 'areaSearch',
    };
    const WRITE = new Write(formObjects, userSearch, areaSearch);
    WRITE.init();
});
