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
        this.points = [67, 55, 45, 45, 45, 45, 40, 39, 39, 35, 35, 33, 20, 20, 11, 10, 10, 10, 10, 9, 8, 8, 6];
        this.offers = [50, 40, 12, 10, 10, 29, 15, 23, 52, 20, 50, 21, 22, 0, 12, 0, 30, 2, 25, 11, 10, 5, 10];
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
                this.userArray = user;
                this.#winer();
                this.#renderHTML(user);
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #renderHTML(user) {
        const tbody = document.createElement('tbody');
        let i = 1;
        for (const td of user) {
            // this.offers.push(td.offers * 1);
            // this.points.push(td.points * 1);

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
    #winer() {
        let winer = [...this.points];
        let offer = [...this.offers];
        console.log(offer.length, winer.length);
        let firstIn = [];
        let lastIn = [];

        let bool = 0;
        for (const [l, td] of this.points.entries()) {
            lastIn.push(this.points.lastIndexOf(td));
            firstIn.push(this.points.indexOf(td));

            if (this.points[l + 1] === td && l > bool) {
                let fragmentOffer = [];
                offer = [...this.offers];
                fragmentOffer = offer.slice(firstIn[l], lastIn[l] + 1);

                fragmentOffer.sort((a, b) => b - a);

                offer.splice(firstIn[l], fragmentOffer.length, ...fragmentOffer);

                bool = fragmentOffer.length + l - 1;
            }

            console.log(`${l} punkty: ${td}, ofert ${offer[l]}`);
            // offer = [...this.offers];
        }
    }
}

new Private(homeObjects);
new TopTen(topTenObjects).init();
