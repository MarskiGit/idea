'use strict';
import AjaxRequest from './modules/AjaxRequest.esm.js';
import { quarterYear } from './modules/seting.esm.js';
import SortingTopTen from './modules/statistics/SortingTopTen.esm.js';

const homeObjects = {
    message: document.querySelector('[data-js="private"]'),
};

const topTenObjects = {
    request: 'topTen',
    users: {
        userQuarter: document.querySelector('[data-topuser="user_quarter"]'),
        usersList: document.querySelector('[data-topuser="users_list"]'),
    },
    area: {
        areaQuarter: document.querySelector('[data-toparea="area_quarter"]'),
        areaList: document.querySelector('[data-toparea="areas_list"]'),
    },
};

class Private {
    #message;
    constructor(homeObjects) {
        this.#message = homeObjects.message;
        this.#hide();
    }
    #hide() {
        this.#message.style.display = 'none';
    }
}

class TopTen {
    #AjaxRequest;
    #requestParam = {};
    #usersDOM;
    #areaDOM;
    #quarterYear;
    constructor(topTenObjects) {
        this.#usersDOM = topTenObjects.users;
        this.#areaDOM = topTenObjects.area;
        this.#AjaxRequest = new AjaxRequest(topTenObjects.request);
        this.#quarterYear = quarterYear(new Date());
    }
    init() {
        this.#requestParam.quarter = this.#quarterYear;
        this.#sendRequest();
        this.#eventListeners();
        this.#quarterYearOrnament();
    }
    #eventListeners() {}
    #quarterYearOrnament() {
        [...this.#usersDOM.userQuarter.children][this.#quarterYear - 1].classList.add('ornament_line');
        [...this.#areaDOM.areaQuarter.children][this.#quarterYear - 1].classList.add('ornament_line');
    }
    #sendRequest = () => {
        document.body.style.cursor = 'progress';
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                const { user, area } = this.#AjaxRequest.getData(data);
                const userTop = new SortingTopTen(user);
                const areaTop = new SortingTopTen(area);

                this.#addDOM(userTop.getSortedHTML(), areaTop.getSortedHTML());
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #addDOM(userTop, areaTop) {
        this.#usersDOM.usersList.appendChild(userTop);
        this.#areaDOM.areaList.appendChild(areaTop);
    }
}

new Private(homeObjects);
new TopTen(topTenObjects).init();
