'use strict';
import FormHandling from './modules/FormHandling.esm.js';
import AjaxRequest from './modules/AjaxRequest.esm.js';
import CountCharacters from './modules/formOffer/CountCharacters.esm.js';
import Rating from './modules/formOffer/Rating.esm.js';
import LiveSearch from './modules/formOffer/LiveSearch.esm.js';
import Chose from './modules/formOffer/Chose.esm.js';

const formDOM = {
    request: 'formOffer',
    form: document.querySelector('[data-form="offer"]'),
    errorMessage: document.querySelector('[data-form="offer_message"]'),
    viewPoints: document.querySelector('[data-form="view_points"]'),
    signBefore: {
        characters: document.querySelector('[data-form="before-characters"]'),
        words: document.querySelector('[data-form="before-words"]'),
        sentences: document.querySelector('[data-form="before-sentences"]'),
    },
    signAfter: {
        characters: document.querySelector('[data-form="after-characters"]'),
        words: document.querySelector('[data-form="after-words"]'),
        sentences: document.querySelector('[data-form="after-sentences"]'),
    },
};
const searchDOM = {
    user: {
        resultsSearchUl: document.querySelector('[data-search="ul_creator"]'),
        selectedResultsUl: document.querySelector('[data-search="chosen_ones"]'),
        request: 'creatorSearch',
    },
    area: {
        resultsSearchUl: document.querySelector('[data-search="ul_area"]'),
        selectedResultsUl: document.querySelector('[data-search="chosen_ones_area"]'),
        request: 'areaSearch',
    },
};

class FormOffer {
    #requestParam = {};
    #FormHandling;
    #AjaxRequest;

    #CountSignBefore;
    #CountSignAfter;
    #Rating;

    #UserSearch;
    #AreaSearch;
    #UserChosen;
    #AreaChosen;

    #inputLiveSearch;
    #textAreas;
    #optionSelecs;
    constructor(formDOM, searchDOM) {
        this.#FormHandling = new FormHandling(formDOM);
        this.#AjaxRequest = new AjaxRequest(formDOM.request);

        this.#CountSignBefore = new CountCharacters(formDOM.signBefore);
        this.#CountSignAfter = new CountCharacters(formDOM.signAfter);
        this.#Rating = new Rating(formDOM.viewPoints);

        this.#UserSearch = new LiveSearch(searchDOM.user);
        this.#AreaSearch = new LiveSearch(searchDOM.area);
        this.#UserChosen = new Chose(searchDOM.user);
        this.#AreaChosen = new Chose(searchDOM.area);
    }
    init() {
        this.#inputLiveSearch = this.#FormHandling.getInputs(['INPUT'], 'search');
        this.#textAreas = this.#FormHandling.getInputs(['TEXTAREA']);
        this.#optionSelecs = this.#FormHandling.getInputs(['SELECT']);

        this.#CountSignBefore.init(this.#textAreas[0]);
        this.#CountSignAfter.init(this.#textAreas[1]);
        this.#Rating.init(this.#optionSelecs);

        this.#UserSearch.init(this.#inputLiveSearch[0]);
        this.#AreaSearch.init(this.#inputLiveSearch[1]);
        this.#UserChosen.init(false);
        this.#AreaChosen.init(true);

        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormHandling.form.addEventListener('submit', this.#formValidation);
    }
    #formValidation = (event) => {
        event.preventDefault();
        if (this.#emptyForm()) {
            this.#getParamForm();
        } else {
            this.#FormHandling.showMessage('Uzupełnij wszystkie pola.');
        }
    };
    #emptyForm = () => !!(this.#FormHandling.emptyFields() && this.#UserChosen.check() && this.#AreaChosen.check());
    #getParamForm() {
        const { before, after } = this.#FormHandling.getValue();
        this.#requestParam.before_value = before;
        this.#requestParam.after_value = after;
        this.#requestParam.array_users = this.#UserChosen.get();
        this.#requestParam.id_area = this.#AreaChosen.get().toString();
        this.#requestParam.rating_user = this.#Rating.get();
        console.log(this.#requestParam);
        // this.#sendRequest();
    }
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                const { ok, title } = this.#AjaxRequest.getData(data);
                if (ok) {
                    this.#clearForm();
                    this.#FormHandling.showMessage(`${title}`);
                } else {
                    this.#FormHandling.showMessage(`${title}`);
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #clearForm() {
        this.#FormHandling.clear(['INPUT', 'TEXTAREA']);

        this.#CountSignBefore.clear();
        this.#CountSignAfter.clear();
        this.#Rating.clear();

        this.#UserSearch.clear();
        this.#AreaSearch.clear();
        this.#UserChosen.clear();
        this.#AreaChosen.clear();
    }
}
new FormOffer(formDOM, searchDOM).init();
