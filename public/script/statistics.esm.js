'use strict';
import AjaxRequest from './modules/AjaxRequest.esm.js';
import { quarterYear } from './modules/seting.esm.js';

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
        areasList: document.querySelector('[data-toparea="areas_list"]'),
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
    #ajaxData;
    #requestParam = {};
    #usersDOM;
    #areaDOM;
    #fragmentDOM = document.createDocumentFragment();
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
                const { user } = this.#AjaxRequest.getData(data);

                this.#renderHTML(user);
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #renderHTML(user) {
        const tbody = document.createElement('tbody');
        let i = 1;
        for (const td of user) {
            tbody.insertAdjacentHTML('beforeend', this.#renderTr(i, td));
            i++;
        }
        this.#addDOM(tbody);
    }
    #addDOM(tbody) {
        this.#usersDOM.usersList.appendChild(tbody);
    }
    #renderTr(i, { full_name, offers, points }) {
        let stat = i <= 3 ? this.#statusInformation(i) : '';
        return `
        <tr>
        <td class="${stat.class}">${i}</td>
        <td>${full_name}</td>
        <td>${offers}</td>
        <td>${points}</td>
        </tr>
        `;
    }
    #statusInformation(st) {
        switch (st) {
            case 1:
                return {
                    class: 'gold',
                };
            case 2:
                return {
                    class: 'silver',
                };
            case 3:
                return {
                    class: 'brown',
                };
            default:
                return {
                    class: '',
                };
        }
    }
}

new Private(homeObjects);
new TopTen(topTenObjects).init();
