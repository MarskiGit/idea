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
    signNumber: document.querySelectorAll('[data-form="sign_number"]'),
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

    #CountCharacters;
    #Rating;

    #UserSearch;
    #AreaSearch;
    #UserChosen;
    #AreaChosen;

    #inputLiveSearch;
    #textAreas;
    #optionSelecs;
    constructor(formDOM, searchDOM) {
        this.#requestParam.token = formDOM.form.getAttribute('data-token');

        this.#FormHandling = new FormHandling(formDOM);
        this.#AjaxRequest = new AjaxRequest(formDOM.request);

        this.#CountCharacters = new CountCharacters(formDOM.signNumber);
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

        this.#CountCharacters.init(this.#textAreas);
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
            this.#requestParam.token = event.target.getAttribute('data-token');
            this.#getParamForm();
        } else {
            this.#FormHandling.showMessage('Uzupełnij wszystkie pola.');
        }
    };
    #clearForm() {
        this.#FormHandling.clear(['INPUT', 'TEXTAREA']);

        this.#CountCharacters.clear();
        this.#Rating.setDefault();

        this.#UserSearch.clear();
        this.#AreaSearch.clear();
        this.#UserChosen.clear();
        this.#AreaChosen.clear();
    }
    #getParamForm() {
        const { before, after } = this.#FormHandling.getValue();
        this.#requestParam.before_value = before;
        this.#requestParam.after_value = after;
        this.#requestParam.array_users = this.#UserChosen.get();
        this.#requestParam.id_area = this.#AreaChosen.get()[0];
        this.#requestParam.pkt_user = this.#Rating.get();
        this.#requestParam.saving = this.#Rating.getValueString();

        // rating objekt lub tablica z wynikami do bazy danych "asocjacyjna "

        console.log(this.#requestParam);
        this.#sendRequest();
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
    #emptyForm = () => !!(this.#FormHandling.emptyFields() && this.#UserChosen.check() && this.#AreaChosen.check());
}
new FormOffer(formDOM, searchDOM).init();
