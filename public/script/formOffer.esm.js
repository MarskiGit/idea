'use strict';
import { handleRequestParams } from './modules/modules.esm.js';
import FormHandling from './modules/FormHandling.esm.js';
import CountCharacters from './modules/formOffer/CountCharacters.esm.js';
import Rating from './modules/formOffer/Rating.esm.js';
import LiveSearch from './modules/formOffer/LiveSearch.esm.js';
import Chose from './modules/formOffer/Chose.esm.js';

const formDOM = {
    request: 'formOffer',
    form: document.querySelector('[data-form="offer"]'),
    errorMessage: document.querySelector('[data-form="offer_message"]'),
    viewPoints: document.querySelector('[data-form="view_points"]'),
    submitButton: document.querySelector('[data-form="btn_submit"]'),
    signTopic: {
        characters: document.querySelector('[data-form="topic-characters"]'),
    },
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

export default class FormOffer {
    #requestParam = handleRequestParams(formDOM.request);
    #Api;
    #FormHandling = new FormHandling(formDOM);

    #CountSignTopic = new CountCharacters(formDOM.signTopic);
    #CountSignBefore = new CountCharacters(formDOM.signBefore);
    #CountSignAfter = new CountCharacters(formDOM.signAfter);

    #Rating = new Rating(formDOM.viewPoints);

    #UserSearch = new LiveSearch(formDOM.userSearch);
    #AreaSearch = new LiveSearch(formDOM.areaSearch);
    #UserChosen = new Chose(formDOM.userSearch);
    #AreaChosen = new Chose(formDOM.areaSearch);

    #inputTopic;
    #inputLiveSearch;
    #textAreas;
    #optionSelecs;

    init(Api) {
        this.#Api = new Api();

        this.#inputLiveSearch = this.#FormHandling.getInputs(['INPUT'], 'search');
        this.#inputTopic = this.#FormHandling.getInputs(['INPUT'], 'text');
        this.#textAreas = this.#FormHandling.getInputs(['TEXTAREA']);
        this.#optionSelecs = this.#FormHandling.getInputs(['SELECT']);

        this.#CountSignTopic.init(...this.#inputTopic);
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
        const { before, after, topic } = this.#FormHandling.getValue();
        this.#requestParam.set('before_value', before);
        this.#requestParam.set('after_value', after);
        this.#requestParam.set('topic', this.#capitalize(topic));
        this.#requestParam.set('array_users', this.#UserChosen.get());
        this.#requestParam.set('id_area', this.#AreaChosen.get().toString());
        this.#requestParam.set('rating_user', this.#Rating.get());
        //console.log(this.#requestParam.get());
        this.#requestAPI();
    }
    #requestAPI = () => {
        document.body.style.cursor = 'progress';
        this.#Api
            .postJson(this.#requestParam.getPost())
            .then((data) => {
                this.apiData = data;
                this.#responseAPI();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #responseAPI() {
        const { ok, title } = this.apiData;
        if (ok) {
            this.#clearForm();
            this.#FormHandling.showMessage(`${title}`);
        } else {
            this.#FormHandling.showMessage(`${title}`);
        }
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
    #capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
}
