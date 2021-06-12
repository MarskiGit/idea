'use strict';
import { setingRequest } from './modules/seting.esm.js';
import FormValidation from './modules/FormValidation.esm.js';
import Request from './modules/Request.esm.js';
import CountCharacters from './modules/formOffer/CountCharacters.esm.js';
import Rating from './modules/formOffer/Rating.esm.js';
import LiveSearch from './modules/formOffer/LiveSearch.esm.js';
import Chose from './modules/formOffer/Chose.esm.js';

const formObjects = {
    request: 'formOffer',
    form: document.querySelector('[data-form="offer"]'),
    errorMessage: document.querySelector('[data-form="offer_message"]'),
    viewPoints: document.querySelector('[data-form="view_points"]'),
    signNumber: document.querySelectorAll('[data-form="sign_number"]'),
};
const search = {
    userSearch: {
        resultsSearchUl: document.querySelector('[data-search="ul_creator"]'),
        selectedResultsUl: document.querySelector('[data-search="chosen_ones"]'),
        request: 'creatorSearch',
    },
    areaSearch: {
        resultsSearchUl: document.querySelector('[data-search="ul_area"]'),
        selectedResultsUl: document.querySelector('[data-search="chosen_ones_area"]'),
        request: 'areaSearch',
    },
};

class FormOffer {
    #requestParam = {};
    #FormValidation;
    #Request;

    #CountCharacters;
    #Rating;

    #UserSearch;
    #AreaSearch;
    #UserChosen;
    #AreaChosen;

    #inputLiveSearch;
    #textAreas;
    #optionSelecs;
    constructor(formObjects, search, setingRequest) {
        this.#requestParam.request = formObjects.request;
        this.#requestParam.token = formObjects.form.getAttribute('data-token');

        this.#FormValidation = new FormValidation(formObjects);
        this.#Request = new Request(setingRequest);

        this.#CountCharacters = new CountCharacters(formObjects.signNumber);
        this.#Rating = new Rating(formObjects.viewPoints);

        this.#UserSearch = new LiveSearch(search.userSearch);
        this.#AreaSearch = new LiveSearch(search.areaSearch);
        this.#UserChosen = new Chose(search.userSearch);
        this.#AreaChosen = new Chose(search.areaSearch);
    }
    init() {
        this.#inputLiveSearch = this.#FormValidation.getInputs(['INPUT'], 'search');
        this.#textAreas = this.#FormValidation.getInputs(['TEXTAREA']);
        this.#optionSelecs = this.#FormValidation.getInputs(['SELECT']);

        this.#CountCharacters.init(this.#textAreas);
        this.#Rating.init(this.#optionSelecs);

        this.#UserSearch.init(this.#inputLiveSearch[0]);
        this.#AreaSearch.init(this.#inputLiveSearch[1]);
        this.#UserChosen.init(false);
        this.#AreaChosen.init(true);

        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormValidation.form.addEventListener('submit', this.#formHandling);
    }
    #formHandling = (event) => {
        event.preventDefault();
        if (this.#emptyForm()) {
            this.#requestParam.token = event.target.getAttribute('data-token');
            this.#getParamForm();
        } else {
            this.#FormValidation.showMessage('Uzupełnij wszystkie pola.');
        }
    };
    #clearForm() {
        this.#FormValidation.clearField(['INPUT', 'TEXTAREA']);

        this.#CountCharacters.clearLenghtCharacters();
        this.#Rating.setDefault();

        this.#UserSearch.closeSearchResult();
        this.#AreaSearch.closeSearchResult();
        this.#UserChosen.closeChosenList();
        this.#AreaChosen.closeChosenList();
    }
    #getParamForm() {
        const { before, after } = this.#FormValidation.getValue();
        this.#requestParam.before_value = before;
        this.#requestParam.after_value = after;
        this.#requestParam.array_users = this.#UserChosen.getChosen();
        this.#requestParam.id_area = this.#AreaChosen.getChosen()[0];
        this.#requestParam.pkt_user = this.#Rating.getPoints();
        this.#requestParam.saving = this.#Rating.getValueString();

        console.log(this.#requestParam);
        this.#sendRequest();
    }
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#Request
            .getJson(this.#requestParam)
            .then((data) => {
                const { ok, title } = this.#Request.getData(data);
                if (ok) {
                    this.#clearForm();
                    this.#FormValidation.showMessage(`${title}`);
                } else {
                    this.#FormValidation.showMessage(`${title}`);
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #emptyForm = () => !!(this.#FormValidation.emptyFields() && this.#UserChosen.checkChosen() && this.#AreaChosen.checkChosen());
}
new FormOffer(formObjects, search, setingRequest).init();
