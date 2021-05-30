'use strict';
import { setingRequest } from './modules/seting.esm.js';
import FormValidation from './modules/FormValidation.esm.js';
import Rating from './modules/idea/Rating.esm.js';
import LiveSearch from './modules/idea/LiveSearch.esm.js';
import CountCharacters from './modules/idea/CountCharacters.esm.js';
import Request from './modules/Request.esm.js';

const formObjects = {
    isPassword: false,
    request: 'offerIdea',
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

class Offer {
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
        } else {
            this.FormValidation.showMessage('Uzupełnij wszystkie pola.');
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
        this.#request.before_value = before;
        this.#request.after_value = after;
        this.#request.array_users = this.UserSearch.getSelectedId();
        this.#request.id_area = this.AreaSearch.getSelectedId()[0];
        this.#request.pkt_user = this.Rating.getPoints();
        this.#request.saving = this.Rating.getValueString();

        console.log(this.#request);

        this.#Ajax
            .getJson(this.#request)
            .then((data) => {
                if (data.ok === true) {
                    this.#clearForm();
                    this.FormValidation.showMessage(`${data.title}`);
                } else {
                    this.FormValidation.showMessage(`${data.title}`);
                }
            })
            .finally((document.body.style.cursor = 'default'));
    }
    #emptyForm = () => !!(this.FormValidation.emptyFields() && this.UserSearch.whetherListCompleted() && this.AreaSearch.whetherListCompleted());
}
new Offer(formObjects, search, setingRequest).init();
