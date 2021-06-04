'use strict';
import { setingRequest } from './modules/seting.esm.js';
import FormValidation from './modules/FormValidation.esm.js';
import Rating from './modules/formOffer/Rating.esm.js';
import LiveSearch from './modules/formOffer/LiveSearch.esm.js';
import CountCharacters from './modules/formOffer/CountCharacters.esm.js';
import Request from './modules/Request.esm.js';

const formObjects = {
    request: 'formOffer',
    form: document.querySelector('[data-form="idea"]'),
    errorMessage: document.querySelector('[data-form="idea_message"]'),
    viewPoints: document.querySelector('[data-form="view_points"]'),
    signNumber: document.querySelectorAll('[data-form="sign_number"]'),
};
const search = {
    userSearch: {
        listResults: document.querySelector('[data-search="ul_creator"]'),
        selectedList: document.querySelector('[data-search="chosen_ones"]'),
        request: 'creatorSearch',
    },
    areaSearch: {
        listResults: document.querySelector('[data-search="ul_area"]'),
        selectedList: document.querySelector('[data-search="chosen_ones_area"]'),
        request: 'areaSearch',
    },
};

class FormOffer {
    #RequestParam = {};
    #FormValidation;
    #Request;
    #inputSearch;
    #UserSearch;
    #AreaSearch;
    #CountCharacters;
    #Rating;
    constructor(formObjects, search, setingRequest) {
        this.#RequestParam.request = formObjects.request;
        this.#RequestParam.token = formObjects.form.getAttribute('data-token');
        this.#FormValidation = new FormValidation(formObjects);
        this.#Request = new Request(setingRequest);

        this.#inputSearch = this.#FormValidation.getInputs(['INPUT'], 'search');

        this.#UserSearch = new LiveSearch(this.#inputSearch[0], search.userSearch);
        this.#AreaSearch = new LiveSearch(this.#inputSearch[1], search.areaSearch);

        this.#CountCharacters = new CountCharacters(this.#FormValidation.getInputs(['TEXTAREA']), formObjects.signNumber);
        this.#Rating = new Rating(this.#FormValidation.getInputs(['SELECT']), formObjects.viewPoints);
    }
    init() {
        this.#UserSearch.init();
        this.#AreaSearch.init();
        this.#CountCharacters.init();
        this.#Rating.init();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#FormValidation.form.addEventListener('submit', this.#formHandling);
    }
    #formHandling = (event) => {
        event.preventDefault();
        if (this.#emptyForm()) {
            this.#RequestParam.token = event.target.getAttribute('data-token');
            this.#getParamForm();
        } else {
            this.#FormValidation.showMessage('Uzupełnij wszystkie pola.');
        }
    };
    #clearForm() {
        this.#FormValidation.clearField(['INPUT', 'TEXTAREA']);
        this.#CountCharacters.clearLenghtCharacters();
        this.#Rating.setDefault();
        this.#UserSearch.closeList();
        this.#UserSearch.clearChosen();
        this.#AreaSearch.closeList();
        this.#AreaSearch.clearChosen();
    }
    #getParamForm() {
        const { before, after } = this.#FormValidation.getValue();
        this.#RequestParam.before_value = before;
        this.#RequestParam.after_value = after;
        this.#RequestParam.array_users = this.#UserSearch.getSelectedId();
        this.#RequestParam.id_area = this.#AreaSearch.getSelectedId()[0];
        this.#RequestParam.pkt_user = this.#Rating.getPoints();
        this.#RequestParam.saving = this.#Rating.getValueString();

        console.log(this.#RequestParam);
        //this.#sendRequest();
    }
    #sendRequest() {
        document.body.style.cursor = 'progress';
        this.#Request
            .getJson(this.#RequestParam)
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
    #emptyForm = () => !!(this.#FormValidation.emptyFields() && this.#UserSearch.whetherListCompleted() && this.#AreaSearch.whetherListCompleted());
}
new FormOffer(formObjects, search, setingRequest).init();
