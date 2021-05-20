'use strict';
import { setingRequest } from './modules/seting.esm.js';
import FormValidation from './modules/FormValidation.esm.js';
import Rating from './modules/write/Rating.esm.js';
import LiveSearch from './modules/write/LiveSearch.esm.js';
import CountCharacters from './modules/write/CountCharacters.esm.js';
import Request from './modules/Request.esm.js';

const formObjects = {
    isPassword: false,
    request: 'iaddIdea',
    form: document.querySelector('[data-write="form"]'),
    errorMessage: document.querySelector('[data-write="form_error"]'),
    viewPoints: document.querySelector('[data-write="view_points"]'),
    signNumber: document.querySelectorAll('[data-write="sign_number"]'),
};
const search = {
    userSearch: {
        listResults: document.querySelector('[data-write="ul_creator"]'),
        selectedList: document.querySelector('[data-write="chosen_ones"]'),
        request: 'creatorSearch',
    },
    areaSearch: {
        listResults: document.querySelector('[data-write="ul_area"]'),
        selectedList: document.querySelector('[data-write="chosen_ones_area"]'),
        request: 'areaSearch',
    },
};

class Idea {
    #Ajax;
    #request = {};
    #inputSearch;
    constructor(formObjects, search, setingRequest) {
        this.FormValidation = new FormValidation(formObjects);
        this.#request.request = formObjects.request;
        this.#Ajax = new Request(setingRequest);

        this.#inputSearch = this.FormValidation.getInputs(['INPUT'], 'search');

        this.UserSearch = new LiveSearch(this.#inputSearch[0], search.userSearch);
        this.AreaSearch = new LiveSearch(this.#inputSearch[1], search.areaSearch);

        this.CountCharacters = new CountCharacters(this.FormValidation.getInputs(['TEXTAREA']), formObjects.signNumber);
        this.Rating = new Rating(this.FormValidation.getInputs(['SELECT']), formObjects.viewPoints);
    }
    init() {
        this.FormValidation.init();
        this.UserSearch.init();
        this.AreaSearch.init();
        this.CountCharacters.init();
        this.Rating.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.FormValidation.form.addEventListener('submit', this.#formHandling);
    }
    #formHandling = (event) => {
        event.preventDefault();

        if (this.#emptyForm()) {
            this.#getrequestForm();
            this.#clearForm();
        } else {
            this.FormValidation.formError();
        }
    };
    #clearForm() {
        this.FormValidation.clearField();
        this.CountCharacters.clearLenghtCharacters();
        this.Rating.setDefault();
        this.UserSearch.closeList();
        this.UserSearch.clearChosen();
        this.AreaSearch.closeList();
        this.AreaSearch.clearChosen();
    }
    #getrequestForm() {
        const { before, after } = this.FormValidation.getValue();
        this.#request.before = before;
        this.#request.after = after;
        this.#request.area = this.UserSearch.getSelectedId();
        this.#request.user = this.AreaSearch.getSelectedId();
        this.#request.pint = this.Rating.getPoints();
        this.#request.saving = this.Rating.getValueString();

        console.log(this.#request);
    }
    #emptyForm = () => !!(this.FormValidation.emptyFields() && this.UserSearch.whetherListCompleted() && this.AreaSearch.whetherListCompleted());
}

new Idea(formObjects, search, setingRequest).init();
